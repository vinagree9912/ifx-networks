# employeeSerializers.py

def employeeEntity(employee) -> dict:
    return {
        "id": str(employee["_id"]),
        "name": employee["name"],
        "email": employee["email"],
        "position": employee.get("position"),
        "entity_id": str(employee["entity_id"]) if "entity_id" in employee else None,
        "created_at": employee.get("created_at"),
        "updated_at": employee.get("updated_at")
    }


def employeeListEntity(employees) -> list:
    return [employeeEntity(employee) for employee in employees]
