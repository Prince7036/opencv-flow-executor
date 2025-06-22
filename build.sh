#!/bin/bash

cd workflow-ui

npm install

npm run build

cd ..

cp -r workflow-ui/dist/* opencv-backend/src/opencv_backend/static

cd opencv-backend

poetry install

poetry run fastapi run src/opencv_backend/main.py