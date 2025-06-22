from pydantic import BaseModel
from opencv_backend.enum import Step


class ProcessStep(BaseModel):
    step: Step
    params: dict

class ProcessFlow(BaseModel):
    steps: list[ProcessStep]
