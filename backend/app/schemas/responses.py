from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel, Field

T = TypeVar('T')

class SuccessResponse(BaseModel, Generic[T]):
    """Standard success response format"""
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(..., description="A descriptive message about the operation")
    data: Optional[T] = Field(None, description="The response data if any")
    status_code: int = Field(default=200, description="HTTP status code")

class ErrorResponse(BaseModel):
    """Standard error response format"""
    success: bool = Field(default=False, description="Indicates if the request was successful")
    message: str = Field(..., description="Error message describing what went wrong")
    error_code: str = Field(..., description="A unique error code for the type of error")
    details: Optional[Any] = Field(None, description="Additional error details if available")
    status_code: int = Field(..., description="HTTP status code")

class ValidationErrorResponse(ErrorResponse):
    """Response format for validation errors"""
    details: dict[str, list[str]] = Field(..., description="Validation error details")
    error_code: str = Field(default="VALIDATION_ERROR", description="Error code for validation errors")
    status_code: int = Field(default=422, description="HTTP status code for validation errors")

class NotFoundErrorResponse(ErrorResponse):
    """Response format for not found errors"""
    error_code: str = Field(default="NOT_FOUND", description="Error code for not found errors")
    status_code: int = Field(default=404, description="HTTP status code for not found errors")

class InternalServerErrorResponse(ErrorResponse):
    """Response format for internal server errors"""
    error_code: str = Field(default="INTERNAL_SERVER_ERROR", description="Error code for internal server errors")
    status_code: int = Field(default=500, description="HTTP status code for internal server errors") 