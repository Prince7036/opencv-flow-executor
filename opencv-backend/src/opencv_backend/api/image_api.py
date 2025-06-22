from fastapi import APIRouter, UploadFile, File, Form, Response
from opencv_backend.service import process_image
from opencv_backend.model import Workflow
from opencv_backend.utils import convert_to_ocr_flow


router = APIRouter()

@router.post("/image/process")
async def process_image_api(image: UploadFile = File(...), workflow: str = Form(...)):
    image_data = image.file.read()
    image_type = image.filename.split(".")[-1]
    workflow_model = Workflow.model_validate_json(workflow)
    ocr_flow = convert_to_ocr_flow(workflow_model)
    return Response(
        content=process_image(image_data, image_type, ocr_flow),
        media_type=image.content_type
    )
