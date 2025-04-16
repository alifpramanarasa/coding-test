from fastapi import APIRouter, HTTPException
from typing import List

from app.data.dummy_data import load_sales_reps_data
from app.schemas.sales import SalesRep
from app.schemas.responses import SuccessResponse, NotFoundErrorResponse

router = APIRouter(
    prefix="/api/sales",
    tags=["Sales"]
)

@router.get("/", response_model=SuccessResponse[List[SalesRep]])
def get_sales_reps():
    """
    Returns the list of sales reps from the dummy JSON file.
    """
    reps = load_sales_reps_data()
    return SuccessResponse(
        message="Successfully retrieved sales representatives",
        data=reps
    )

@router.get("/{rep_id}", response_model=SuccessResponse[SalesRep])
def get_sales_rep(rep_id: int):
    """
    Returns a specific sales rep by ID.
    """
    reps = load_sales_reps_data()
    for rep in reps:
        if rep["id"] == rep_id:
            return SuccessResponse(
                message=f"Successfully retrieved sales representative with ID {rep_id}",
                data=rep
            )
    
    raise HTTPException(
        status_code=404,
        detail=NotFoundErrorResponse(
            message=f"Sales representative with ID {rep_id} not found",
            error_code="NOT_FOUND",
            status_code=404
        ).model_dump()
    )
