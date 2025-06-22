import cv2
import numpy
import tempfile

from opencv_backend.model import ProcessFlow, ProcessStep
from opencv_backend.enum import Step


def process_image(
    image: bytes,
    image_type: str,
    ocr_flow: ProcessFlow
) -> bytes:
    """
    Applies a series of image processing steps to the given image, returning the result as raw image bytes.

    Args:
        image: The image to process, as raw bytes.
        image_type: The type of the image, e.g. "jpg", "png", etc.
        ocr_flow: The ProcessFlow describing the steps to apply to the image.

    Returns:
        The processed image, as raw bytes.
    """
    with tempfile.TemporaryDirectory() as temp_dir:
        image_file = tempfile.NamedTemporaryFile(
            suffix=f".{image_type}",
            dir=temp_dir,
            delete=False
        )
        image_file.write(image)
        image_file.flush()

        cv_image = cv2.imread(image_file.name)

        for step in ocr_flow.steps:
            cv_image = _perform_steps(cv_image, step)

        processed_image = tempfile.NamedTemporaryFile(
            suffix=f".{image_type}",
            dir=temp_dir,
            delete=False
        )
        cv2.imwrite(processed_image.name, cv_image)

        return processed_image.read()


def _perform_steps(cv_image: cv2.Mat, step_details: ProcessStep):
    """
    Applies a single step of image processing to the given OpenCV image.

    Args:
        cv_image: The OpenCV image to process.
        step_details: The ProcessStep describing the step to apply.

    Returns:
        The processed OpenCV image.
    """
    match step_details.step:
        case Step.IMAGE:
            return cv_image
        case Step.GRAYSCALE:
            return cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        case Step.INVERT:
            return cv2.bitwise_not(cv_image)
        case Step.THRESHOLD:
            return cv2.threshold(
                cv_image,
                0,
                255,
                cv2.THRESH_BINARY + cv2.THRESH_OTSU
            )[1]
        case Step.ROTATE:
            return cv2.rotate(cv_image, cv2.ROTATE_90_CLOCKWISE)
        case Step.DILATE:
            return cv2.dilate(
                cv_image,
                cv2.getStructuringElement(cv2.MORPH_RECT, (step_details.params["kx"], step_details.params["ky"])),
                iterations=1
            )
        case Step.ERODE:
            return cv2.erode(
                cv_image,
                cv2.getStructuringElement(cv2.MORPH_RECT, (step_details.params["kx"], step_details.params["ky"])),
                iterations=1
            )
        case Step.RESIZE:
            return cv2.resize(
                cv_image,
                None,
                fx=step_details.params["fx"],
                fy=step_details.params["fx"],
                interpolation=cv2.INTER_CUBIC
            )
        case Step.BLUR:
            return cv2.medianBlur(cv_image, step_details.params["ksize"])
        case Step.FILTER:
            return cv2.bilateralFilter(
                cv_image,
                step_details.params["d"],
                step_details.params["sigmaColor"],
                step_details.params["sigmaSpace"]
            )
        case Step.DENOISE:
            return cv2.fastNlMeansDenoising(
                cv_image,
                None,
                step_details.params["h"],
                step_details.params["templateWindowSize"],
                step_details.params["searchWindowSize"]
            )
        case Step.SHARPEN:
            return cv2.filter2D(
                cv_image,
                -1,
                numpy.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
            )
        case _:
            return cv_image
