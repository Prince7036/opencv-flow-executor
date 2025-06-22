# opencv-workflow-executor

A web-based UI that lets users visually build and experiment with image processing workflows. Designed for flexibility, this tool connects to a Python OpenCV backend to process images in real time based on the defined flow.

✨ Features

- Drag-and-Drop Flow Editor – Easily build processing pipelines like grayscale → threshold → blur → etc.
- Live Image Preview – Upload images and instantly view the processed output.
- Modular Design – Add, remove, or reorder processing steps dynamically.
- OpenCV Python Backend – Uses OpenCV for actual image transformations.
- Supports Multiple Image Formats – JPEG, PNG, and TIFF (Preview not supported for TIFF).

🛠️ Tech Stack

- Frontend: React + React Flow
- Backend: Python + FastAPI + OpenCV
- Image Processing: OpenCV (cv2)

🚀 Getting Started

1. Clone the Repo
```
bash
git clone https://github.com/Prince7036/opencv-workflow-executor.git
cd opencv-workflow-executor
```

2. Run the Service
```
. ./build.sh
```

## Working

1. Create a image processing flow by adding / removing nodes
<img width="1352" alt="Screenshot 2025-06-22 at 5 40 55 PM" src="https://github.com/user-attachments/assets/e5e83b78-5d5d-4c20-bb87-4dcc756daa16" />

2. Click on the execute button to upload an image for testing out the flow
<img width="1352" alt="Screenshot 2025-06-22 at 5 44 09 PM" src="https://github.com/user-attachments/assets/c147aa71-f50d-4600-89a4-88e2357c31c3" />

Note:
1. Preview is not available for TIFF images. Instead TIFF images can be downloaded.
2. Download the flow image by clicking on the save button.
3. You can add more custom nodes for other openCV operations if the nodes currently provided are not sufficient.
