
import cv2

class VideoSource:
    """
    Handles video input from webcam or file.
    """
    
    def __init__(self, source=0):
        """
        Initializes the video source.
        
        Args:
            source (int or str): 0 for webcam, or path to video file.
        """
        self.is_webcam = isinstance(source, int)
        
        if self.is_webcam:
            # Use CAP_DSHOW for webcam on Windows
            self.cap = cv2.VideoCapture(source, cv2.CAP_DSHOW)
        else:
            # Use default backend for video files
            self.cap = cv2.VideoCapture(source)
        
        if not self.cap.isOpened():
            raise ValueError(f"Could not open video source: {source}. Check if file exists/codecs for videos or permissions for webcam.")
    
    def read_frame(self):
        """
        Reads a frame from the video source.
        
        Returns:
            frame (np.ndarray): The video frame, or None if end of video.
        """
        ret, frame = self.cap.read()
        if not ret:
            return None
        return frame
    
    def release(self):
        """Releases the video capture."""
        self.cap.release()
    
    def get_fps(self):
        """Returns the FPS of the video."""
        return self.cap.get(cv2.CAP_PROP_FPS)
    
    def get_size(self):
        """Returns (width, height) of the video."""

        return (int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
