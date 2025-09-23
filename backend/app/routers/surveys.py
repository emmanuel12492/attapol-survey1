from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import schemas, models
from ..services import survey_service
from ..auth import get_current_user

router = APIRouter(prefix="/surveys", tags=["surveys"])

@router.get("/", response_model=List[schemas.Survey])
def get_surveys(db: Session = Depends(get_db)):
    return survey_service.get_all_surveys(db)

@router.get("/{survey_id}", response_model=schemas.Survey)
def get_survey(survey_id: int, db: Session = Depends(get_db)):
    survey = survey_service.get_survey_by_id(db, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    return survey

@router.post("/", response_model=schemas.Survey)
def create_survey(
    survey: schemas.SurveyCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return survey_service.create_survey(db, survey, current_user.id)

@router.post("/{survey_id}/submit")
def submit_survey(
    survey_id: int,
    response: schemas.ResponseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return survey_service.submit_survey(db, survey_id, response, current_user)
