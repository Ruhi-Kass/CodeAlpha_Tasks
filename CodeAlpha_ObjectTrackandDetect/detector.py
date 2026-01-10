# detector.py
from ultralytics import YOLO
import cv2

class ObjectDetector:
    """
    Optimized Object Detector and Tracker using YOLOv8.
    - Uses yolov8s.pt for accurate detection
    - Resizes frames for speed and stability
    - Higher confidence to avoid wrong labels
    - Uses Ultralytics' beautiful built-in drawing (purple boxes, labels, IDs)
    """
    
    def __init__(self, model_path='yolov8s.pt'):
        self.model = YOLO(model_path)
        print(f"YOLOv8 model loaded: {model_path}")

    def detect_and_track(self, frame):
        """
        Detect and track objects in a frame.
        
        Args:
            frame (np.ndarray): Input frame from OpenCV (BGR)
            
        Returns:
            annotated_frame (np.ndarray): Frame with detections and tracking IDs drawn
        """
        # Save original size
        orig_h, orig_w = frame.shape[:2]
        
        # Resize to 640x640 (YOLO performs best on this size, faster + less memory)
        resized_frame = cv2.resize(frame, (640, 640))
        
        # Run tracking with good settings
        results = self.model.track(
            source=resized_frame,
            persist=True,      # Maintain tracking IDs across frames
            conf=0.7,          # Only show confident detections (fixes "car → cell phone")
            imgsz=640,
            verbose=False
        )
        
        # Use Ultralytics' built-in plot() — draws beautiful purple boxes, labels, conf, and IDs
        annotated_small = results[0].plot()
        
        # Resize back to original frame size for proper display in GUI
        annotated_frame = cv2.resize(annotated_small, (orig_w, orig_h))
        
        return annotated_frame