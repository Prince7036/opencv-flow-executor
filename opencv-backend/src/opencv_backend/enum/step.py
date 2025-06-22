from enum import Enum


class Step(str, Enum):
    IMAGE = "IMAGE"
    GRAYSCALE = "GRAYSCALE"
    INVERT = "INVERT"
    THRESHOLD = "THRESHOLD"
    ROTATE = "ROTATE"
    DILATE = "DILATE"
    ERODE = "ERODE"
    RESIZE = "RESIZE"
    BLUR = "BLUR"
    FILTER = "FILTER"
    DENOISE = "DENOISE"
    SHARPEN = "SHARPEN"
