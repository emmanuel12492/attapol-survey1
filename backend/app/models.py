from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    points = Column(Integer, default=0)

    surveys = relationship("Survey", back_populates="creator")
    responses = relationship("Response", back_populates="user")

class Survey(Base):
    __tablename__ = "surveys"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    points_reward = Column(Integer)
    creator_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    creator = relationship("User", back_populates="surveys")
    questions = relationship("Question", back_populates="survey")
    responses = relationship("Response", back_populates="survey")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    survey_id = Column(Integer, ForeignKey("surveys.id"))
    question_text = Column(String)
    question_type = Column(String)
    options = Column(String, nullable=True)

    survey = relationship("Survey", back_populates="questions")
    answers = relationship("Answer", back_populates="question")

class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    survey_id = Column(Integer, ForeignKey("surveys.id"))
    completed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="responses")
    survey = relationship("Survey", back_populates="responses")
    answers = relationship("Answer", back_populates="response")

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    response_id = Column(Integer, ForeignKey("responses.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))
    answer_text = Column(String)

    response = relationship("Response", back_populates="answers")
    question = relationship("Question", back_populates="answers")
