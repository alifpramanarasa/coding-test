from pydantic import BaseModel

class Metric(BaseModel):
    title: str
    value: str
    change: float
    description: str 