# entity_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from bson.objectid import ObjectId
from app.database import Entity
from app.serializers.entitySerializers import entityEntity, entityListEntity
from app.schemas import CreateEntitySchema, UpdateEntitySchema
from app.oauth2 import require_admin

router = APIRouter()


@router.post('/', status_code=status.HTTP_201_CREATED)
def create_entity(payload: CreateEntitySchema, user_id: str = Depends(require_admin)):
    # Lógica para crear una entidad
    result = Entity.insert_one(payload.dict())
    return {"status": "success", "data": entityEntity(Entity.find_one({"_id": result.inserted_id}))}


@router.get('/')
def get_entities():
    # Lógica para obtener todas las entidades
    entities = entityListEntity(Entity.find())
    return {"status": "success", "data": entities}


@router.get('/{entity_id}')
def get_entity(entity_id: str):
    # Lógica para obtener una entidad por ID
    entity = Entity.find_one({"_id": ObjectId(entity_id)})
    if not entity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entity not found")
    return {"status": "success", "data": entityEntity(entity)}


@router.put('/{entity_id}')
def update_entity(entity_id: str, payload: UpdateEntitySchema, user_id: str = Depends(require_admin)):
    # Lógica para actualizar una entidad
    updated_entity = Entity.find_one_and_update({"_id": ObjectId(entity_id)}, {"$set": payload.dict()})
    if not updated_entity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entity not found")
    return {"status": "success", "data": entityEntity(updated_entity)}


@router.delete('/{entity_id}')
def delete_entity(entity_id: str, user_id: str = Depends(require_admin)):
    # Lógica para eliminar una entidad
    result = Entity.delete_one({"_id": ObjectId(entity_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entity not found")
    return {"status": "success", "message": "Entity deleted successfully"}
