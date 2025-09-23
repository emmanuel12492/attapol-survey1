from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status

def get_all_surveys(db: Session):
    return db.query(models.Survey).filter(models.Survey.is_active == True).all()

def get_survey_by_id(db: Session, survey_id: int):
    return db.query(models.Survey).filter(models.Survey.id == survey_id).first()

def create_survey(db: Session, survey: schemas.SurveyCreate, creator_id: int):
    db_survey = models.Survey(
        **survey.dict(),
        creator_id=creator_id,
    )
    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)
    return db_survey

def submit_survey(db: Session, survey_id: int, response: schemas.ResponseCreate, user: models.User):
    # Check if user has already submitted this survey
    existing_response = db.query(models.Response).filter(
        models.Response.survey_id == survey_id,
        models.Response.user_id == user.id
    ).first()
    
    if existing_response:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already submitted this survey"
        )
    
    survey = get_survey_by_id(db, survey_id)
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Survey not found"
        )
    
    # Create response
    db_response = models.Response(
        user_id=user.id,
        survey_id=survey_id,
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    
    # Add points to user
    user.points += survey.points_reward
    db.commit()
    
    return {"message": "Survey submitted successfully", "points_earned": survey.points_reward}
