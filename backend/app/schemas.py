from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    points: int

    class Config:
        from_attributes = True

class SurveyBase(BaseModel):
    title: str
    description: str
    points_reward: int

class SurveyCreate(SurveyBase):
    pass

class Survey(SurveyBase):
    id: int
    creator_id: int
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

class QuestionBase(BaseModel):
    question_text: str
    question_type: str
    options: Optional[str] = None

class QuestionCreate(QuestionBase):
    survey_id: int

class Question(QuestionBase):
    id: int
    survey_id: int

    class Config:
        from_attributes = True

class AnswerBase(BaseModel):
    question_id: int
    answer_text: str

class AnswerCreate(AnswerBase):
    pass

class Answer(AnswerBase):
    id: int
    response_id: int

    class Config:
        from_attributes = True

class ResponseBase(BaseModel):
    survey_id: int

class ResponseCreate(ResponseBase):
    pass

class Response(ResponseBase):
    id: int
    user_id: int
    completed_at: datetime

    class Config:
        from_attributes = True
