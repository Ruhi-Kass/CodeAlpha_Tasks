# Object Detection and Tracking App

This is a Python-based application for real-time object detection and tracking using YOLOv8 (from Ultralytics) and OpenCV. It supports input from a webcam or video files, draws bounding boxes with class labels, confidence scores, and persistent tracking IDs, and features a modern GUI built with CustomTkinter in a purple and white theme.

The app is modularized for easy maintenance and extension, fulfilling the task requirements: setup real-time video input, use a pre-trained model (YOLO), process frames for detection, apply tracking (using YOLO's built-in ByteTrack, similar to SORT/Deep SORT), and display output with labels and IDs.

## Features
- **Real-time Processing**: Handles live webcam feed or pre-recorded video files.
- **Object Detection**: Uses pre-trained YOLOv8 model for detecting common objects (e.g., persons, cars).
- **Object Tracking**: Assigns and maintains unique IDs for tracked objects across frames.
- **Modern GUI**: CustomTkinter-based interface with a purple and white theme for a clean, user-friendly experience.
- **Modular Design**: Separate modules for video input, detection/tracking, and GUI.
- **Display**: Shows annotated video feed with bounding boxes, class labels, confidence, and tracking IDs in real-time.

## Requirements
- Python 3.10 or higher
- Dependencies (listed in `requirements.txt`):
  - opencv-contrib-python (for video handling)
  - ultralytics (for YOLOv8)
  - customtkinter (for GUI)
  - pillow (for image processing in GUI)
  - torch, torchvision, torchaudio (YOLO backend)

. Create and activate a virtual environment:
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

. (Optional) Pre-download YOLO model:
   - Run `python download_model.py` (if provided) or let it auto-download on first run.

## Usage
1. Run the application:
   ```
   python main.py
   ```

2. In the GUI:
   - Click **Use Webcam** for live camera input (ensure webcam permissions are granted).
   - Click **Select Video File** to browse and load an MP4/AVI video.
   - Click **Start Processing** to begin detection and tracking.
   - View the annotated feed in the display area (purple bounding boxes, white text labels with class, confidence, and ID).
   - Click **Stop Processing** to halt.

Example output: For a car video, expect labels like "car 0.85 ID:1" with boxes tracking movement.

## Project Structure
- `main.py`: GUI setup and main processing loop.
- `detector.py`: Handles YOLOv8 detection and tracking.
- `video_source.py`: Manages video input from webcam or files.
- `theme.json`: Custom blue/white theme for CustomTkinter.
- `README.md`: This documentation.

## Customization
- **Change YOLO Model**: In `detector.py`, update `model_path` to `'yolov8m.pt'` (medium) or `'yolov8l.pt'` (large) for better accuracy (auto-downloads).
- **Adjust Confidence**: In `detector.py`, change `conf=0.5` to higher (e.g., 0.7) for fewer but more accurate detections.
- **Resize**: Modify frame resizing in `detector.py` for performance (e.g., to (480, 480) on slower machines).

## Troubleshooting
- **Video File Won't Open**: Ensure MP4/AVI format; reinstall `opencv-contrib-python` for better codec support.
- **Webcam Issues**: Check Windows/macOS camera permissions; close other apps using the camera.
- **Slow Performance**: Use smaller model (`yolov8n.pt`); enable GPU if available (YOLO auto-detects CUDA).
- **Mislabeling**: Switch to larger model or raise `conf` threshold.
- **Errors**: Run in terminal for logs; ensure all dependencies are installed.

## Limitations
- Performance depends on hardware (CPU vs. GPU); may be slow on low-end machines.
- YOLOv8 is trained on COCO dataset (80 classes) — may mislabel in edge cases (e.g., unusual angles/lighting).
- Tracking can falter in crowded/occluded scenes.
- GUI is basic and non-resizable for simplicity.

## License
MIT License — Feel free to use, modify, and distribute. See [LICENSE](LICENSE) for details.



