from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, List
from contextlib import asynccontextmanager
from app.util.init_db import create_tables
from app.db.models.contact import Contact
from app.db.schemas.contacts import ContactCreate, ContactRead
from app.core.database import engine, get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

db_dependency = Annotated[Session, Depends(get_db)]

#@asynccontextmanager
#async def lifespan(app: FastAPI):
#    create_tables()
#    yield

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"]
)


@app.post("/api/contacts", response_model=ContactCreate)
def create_contact(contact: ContactCreate, db: db_dependency):
    try:
        db_contact = Contact(**contact.dict())
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        return db_contact
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Contact already exists or constraint failed"
        )

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Database error: " + str(e.__cause__ or e)
        )
    

@app.get("/api/contacts", response_model=List[ContactRead])
def get_contacts(db: db_dependency):
    return db.query(Contact).all()


@app.get("/api/contacts/{contact_id}", response_model=ContactRead)
def get_contacts(contact_id: int, db: db_dependency):
    result = db.query(Contact).filter(Contact.id == contact_id).first()
    if not result:
        raise HTTPException(status_code=400, detail='Contact is not found')
    return result

@app.delete("/api/contacts/{contact_id}")
def delete_contacts(contact_id: int, db: db_dependency):
    result = db.query(Contact).filter(Contact.id == contact_id).first()
    db.delete(result)
    db.commit()
    if not result:
        raise HTTPException(status_code=400, detail='Contact is not found')
    return {"message": "Item deleted successfully"}

