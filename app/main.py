from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.config import settings
from app.routers import auth, user, post, employee, entity

app = FastAPI()

origins = [
    settings.CLIENT_ORIGIN,
    "https://ifx-networks-1.onrender.com",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=['Auth'], prefix='/api/auth')
app.include_router(user.router, tags=['Users'], prefix='/api/users')
app.include_router(post.router, tags=['Posts'], prefix='/api/posts')
app.include_router(entity.router, tags=["Entities"], prefix="/api/entities")
app.include_router(employee.router, tags=["Employees"], prefix="/api/employees")


@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to IFX-NETWORK management"}
