# Usa una imagen base de Python
FROM python:3.10-slim

# Establece el directorio de trabajo en /app
WORKDIR /server

# Copia el archivo requirements.txt desde la carpeta `app` en el host al contenedor
COPY requirements.txt /app/requirements.txt

# Instala las dependencias necesarias
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copia el resto del contenido de la carpeta `app` al contenedor
COPY . /server/app

# Lista el contenido de /server después de copiar los archivos
# Expone el puerto que usa Uvicorn
EXPOSE 8000

# Comando de inicio
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

