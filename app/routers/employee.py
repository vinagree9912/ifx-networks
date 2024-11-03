# employee_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from bson.objectid import ObjectId
from app.database import Employee
from app.serializers.employeeSerializers import employeeEntity, employeeListEntity
from app.schemas import CreateEmployeeSchema, UpdateEmployeeSchema
from app.oauth2 import require_admin

router = APIRouter()


@router.post('/', status_code=status.HTTP_201_CREATED)
def create_employee(payload: CreateEmployeeSchema, user_id: str = Depends(require_admin)):
    # Lógica para crear un empleado
    result = Employee.insert_one(payload.dict())
    return {"status": "success", "data": employeeEntity(Employee.find_one({"_id": result.inserted_id}))}


@router.get('/')
def get_employees():
    # Lógica para obtener todos los empleados
    employees = employeeListEntity(Employee.find())
    return {"status": "success", "data": employees}


@router.get('/{employee_id}')
def get_employee(employee_id: str):
    # Lógica para obtener un empleado por ID
    employee = Employee.find_one({"_id": ObjectId(employee_id)})
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return {"status": "success", "data": employeeEntity(employee)}


@router.put('/{employee_id}')
def update_employee(employee_id: str, payload: UpdateEmployeeSchema, user_id: str = Depends(require_admin)):
    # Lógica para actualizar un empleado
    updated_employee = Employee.find_one_and_update({"_id": ObjectId(employee_id)}, {"$set": payload.dict()})
    if not updated_employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return {"status": "success", "data": employeeEntity(updated_employee)}


@router.delete('/{employee_id}')
def delete_employee(employee_id: str, user_id: str = Depends(require_admin)):
    # Lógica para eliminar un empleado
    result = Employee.delete_one({"_id": ObjectId(employee_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return {"status": "success", "message": "Employee deleted successfully"}
