import cv2

# Use FULL PATH, e.g., r"C:\Users\Ruhama\Desktop\CodeAlpha Internship\CodeAlpha_ObjectTrackandDetect\car-detection.mp4"
video_path = r"full\path\to\your\car-detection.mp4"  # Replace with actual path (use r" for raw string on Windows)

cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error: Could not open '{video_path}'! Check if file exists, path is correct, or install codecs.")
    # Check error code
    error_code = int(cap.get(cv2.CAP_PROP_FOURCC))
    print(f"OpenCV error code: {error_code}")
    exit()

print("Video opened successfully! Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('Video Test', frame)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()