from fastapi import APIRouter
from app.schemas.responses import SuccessResponse
from app.config import settings

router = APIRouter(
    prefix="/api",
    tags=["General"]
)

@router.get("/", response_model=SuccessResponse[dict])
def get_general_info():
    """
    Returns general information about the API.
    """
    return SuccessResponse(
        message="Welcome to the Sales API.",
        data={"version": settings.VERSION}
    )


@router.get("/health", response_model=SuccessResponse[dict])
def get_health():
    """
    Returns the health of the API.
    """
    return SuccessResponse(
        message="API is healthy.",
        data={"status": "ok"}
    )

