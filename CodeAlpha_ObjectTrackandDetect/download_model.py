from ultralytics import YOLO

# This line loads the nano model and downloads it if not already present
model = YOLO('yolov8l.pt')
print("Model downloaded successfully!")