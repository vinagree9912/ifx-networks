from typing import List
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel
from .config import settings
from jinja2 import Environment, select_autoescape, PackageLoader


# Configuración del entorno Jinja2 para cargar plantillas de correo
env = Environment(
    loader=PackageLoader('app', 'templates'),
    autoescape=select_autoescape(['html', 'xml'])
)


# Esquema de correo para definir los destinatarios
class EmailSchema(BaseModel):
    email: List[EmailStr]


# Clase para el envío de correos electrónicos
class Email:
    def __init__(self, user: dict, url: str, email: List[EmailStr]):
        self.name = user.get('name', 'User')  # Usar un valor por defecto en caso de que 'name' no exista
        self.sender = 'Codevo <admin@admin.com>'
        self.email = email
        self.url = url

    async def sendMail(self, subject: str, template_name: str):
        # Configuración de conexión para FastMail
        conf = ConnectionConfig(
            MAIL_USERNAME=settings.EMAIL_USERNAME,
            MAIL_PASSWORD=settings.EMAIL_PASSWORD,
            MAIL_FROM=settings.EMAIL_FROM,
            MAIL_PORT=settings.EMAIL_PORT,
            MAIL_SERVER=settings.EMAIL_HOST,
            MAIL_STARTTLS=True,   # Configuración para Gmail, cambiar si usas otro servidor
            MAIL_SSL_TLS=False,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True
        )

        # Generar el HTML a partir de la plantilla especificada
        try:
            template = env.get_template(f'{template_name}.html')
            html_content = template.render(
                url=self.url,
                first_name=self.name,
                subject=subject
            )
        except Exception as e:
            print(f"Error al renderizar la plantilla {template_name}: {e}")
            raise ValueError("Template rendering error")

        # Definir las opciones del mensaje
        message = MessageSchema(
            subject=subject,
            recipients=self.email,
            body=html_content,
            subtype="html"
        )

        # Intentar enviar el correo electrónico y capturar errores si ocurren
        try:
            fm = FastMail(conf)
            await fm.send_message(message)
            print("Correo enviado correctamente")
        except Exception as e:
            print(f"Error al enviar el correo: {e}")
            raise ValueError("There was an error sending the email")

    async def sendVerificationCode(self):
        # Enviar el correo con el asunto y plantilla de verificación
        await self.sendMail('Your verification code (Valid for 10min)', 'verification')
