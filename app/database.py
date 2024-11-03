from pymongo import MongoClient
import pymongo
from datetime import datetime
from app.config import settings

# Conexión a MongoDB
client = MongoClient(settings.DATABASE_URL)
print('Connected to MongoDB...')

# Base de datos
db = client[settings.MONGO_INITDB_DATABASE]

# Modelo de Usuario
User = db.users
User.create_index([("email", pymongo.ASCENDING)], unique=True)

# Modelo de Publicación
Post = db.posts
Post.create_index([("title", pymongo.ASCENDING)], unique=True)

# Modelo de Entidad
Entity = db.entities
Entity.create_index([("name", pymongo.ASCENDING)], unique=True)

# Modelo de Empleado
Employee = db.employees
Employee.create_index([("email", pymongo.ASCENDING)], unique=True)
Employee.create_index([("entity_id", pymongo.ASCENDING)])  # Índice para búsquedas por entidad
