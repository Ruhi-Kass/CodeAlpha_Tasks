import customtkinter as ctk
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import threading
import queue
import cv2
from video_source import VideoSource
from detector import ObjectDetector

ctk.set_appearance_mode("Light")
ctk.set_default_color_theme("blue")

class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Object Detection and Tracking")
        self.geometry("900x700")  # Slightly larger for better visibility
        
        self.video_source = None
        self.detector = ObjectDetector()
        self.running = False
        self.frame_queue = queue.Queue(maxsize=1)
        
        # GUI Elements
        self.label = ctk.CTkLabel(self, text="Object Detection and Tracking", font=("Arial", 24, "bold"))
        self.label.pack(pady=20)
        
        self.source_frame = ctk.CTkFrame(self)
        self.source_frame.pack(pady=10)
        
        self.webcam_btn = ctk.CTkButton(self.source_frame, text="Use Webcam", width=200, command=self.select_webcam)
        self.webcam_btn.pack(side="left", padx=20)
        
        self.file_btn = ctk.CTkButton(self.source_frame, text="Select Video File", width=200, command=self.select_file)
        self.file_btn.pack(side="left", padx=20)
        
        self.control_frame = ctk.CTkFrame(self)
        self.control_frame.pack(pady=10)
        
        self.start_btn = ctk.CTkButton(self.control_frame, text="Start Processing", width=200, command=self.start_processing)
        self.start_btn.pack(side="left", padx=10)
        
        self.stop_btn = ctk.CTkButton(self.control_frame, text="Stop Processing", width=200, command=self.stop_processing)
        self.stop_btn.pack(side="left", padx=10)
        
        self.video_label = ctk.CTkLabel(self, text="Video feed will appear here after starting...")
        self.video_label.pack(expand=True, fill="both", padx=20, pady=20)
        
        self.status_label = ctk.CTkLabel(self, text="Status: Idle - Select a source to begin", font=("Arial", 14))
        self.status_label.pack(pady=10)
    
    def select_webcam(self):
        self.release_source()
        try:
            self.video_source = VideoSource(0)
            self.status_label.configure(text="Status: Webcam selected and opened successfully!")
        except Exception as e:
            self.status_label.configure(text=f"Error: Could not open webcam - {str(e)} (Is it connected/in use?)")
    
    def select_file(self):
        file_path = filedialog.askopenfilename(
            title="Select a Video File",
            filetypes=[("Video files", "*.mp4 *.avi *.mov *.mkv"), ("All files", "*.*")]
        )
        if file_path:  # Only proceed if a file was actually selected (not canceled)
            self.release_source()
            try:
                self.video_source = VideoSource(file_path)
                self.status_label.configure(text=f"Status: Video file selected - {file_path.split('/')[-1]}")
            except Exception as e:
                self.status_label.configure(text=f"Error: Could not open video file - {str(e)}")
        else:
            self.status_label.configure(text="Status: File selection canceled")
    
    def start_processing(self):
        if not self.video_source:
            self.status_label.configure(text="Error: Please select a source first (Webcam or Video File)")
            return
        self.running = True
        self.status_label.configure(text="Status: Processing started - Live feed below")
        threading.Thread(target=self.process_video, daemon=True).start()
        self.after(30, self.update_gui)
    
    def stop_processing(self):
        self.running = False
        self.status_label.configure(text="Status: Processing stopped")
    
    def process_video(self):
        while self.running:
            frame = self.video_source.read_frame()
            if frame is None:
                self.running = False
                self.after(0, lambda: self.status_label.configure(text="Status: End of video / Webcam closed"))
                break
            annotated_frame = self.detector.detect_and_track(frame)
            if not self.frame_queue.full():
                self.frame_queue.put(annotated_frame)
        self.release_source()
    
    def update_gui(self):
        if self.running:
            try:
                frame = self.frame_queue.get_nowait()
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(frame_rgb)
                img = img.resize((800, 600), Image.LANCZOS)
                imgtk = ImageTk.PhotoImage(image=img)
                self.video_label.imgtk = imgtk
                self.video_label.configure(image=imgtk, text="")
            except queue.Empty:
                pass
            self.after(30, self.update_gui)
    
    def release_source(self):
        if self.video_source:
            self.video_source.release()
            self.video_source = None

if __name__ == "__main__":
    app = App()
    app.mainloop()