from sqlalchemy.orm import Session
from .. import models, schemas
from ..auth import verify_password, get_password_hash
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

SECRET_KEY = "ghkiengnefgeikvngvuej"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    access_token = create_access_token(db_user)
    return {"access_token": access_token, "token_type": "bearer", "user": db_user}

def authenticate_user(db: Session, username_or_email: str, password: str):
    # Try to find user by email
    user = db.query(models.User).filter(models.User.email == username_or_email).first()
    if not user:
        # If not found by email, try username
        user = db.query(models.User).filter(models.User.username == username_or_email).first()
    
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_access_token(user: models.User, expires_delta: Optional[timedelta] = None):
    to_encode = {
        "sub": user.email,
        "user_id": user.id,
    }
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
