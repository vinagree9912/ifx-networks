# entitySerializers.py

def entityEntity(entity) -> dict:
    return {
        "id": str(entity["_id"]),
        "name": entity["name"],
        "description": entity.get("description"),
        "created_at": entity.get("created_at"),
        "updated_at": entity.get("updated_at")
    }


def entityListEntity(entities) -> list:
    return [entityEntity(entity) for entity in entities]
