import cv2

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Use DSHOW for Windows

if not cap.isOpened():
    print("Error: Cannot open webcam! Check if it's connected/in use.")
    print("Try: Close other apps (Zoom/Teams), check Windows Privacy → Camera settings.")
    exit()

print("Webcam is working! Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting...")
        break
    
    cv2.imshow('Webcam Test - Press q to quit', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()