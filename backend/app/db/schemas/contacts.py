from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    
class ContactRead(ContactBase):
    id: int
    created_at: datetime

class ContactCreate(ContactBase):
    pass

class Config:
        orm_mode = True