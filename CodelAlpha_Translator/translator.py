import tkinter as tk
from tkinter import ttk, messagebox
import threading
import argostranslate.translate
from download_language import install_model_prompt, LANGUAGES, is_installed, install_language


def perform_translation(text, src, tgt):
    if src == tgt:
        return text
    if src == "en" or tgt == "en":
        return argostranslate.translate.translate(text, src, tgt)
    else:
        intermediate = argostranslate.translate.translate(text, src, "en")
        return argostranslate.translate.translate(intermediate, "en", tgt)

def auto_resize_textbox(widget, min_lines=3, max_lines=12):
    lines = int(widget.index("end-1c").split(".")[0])
    widget.config(height=min(max(lines, min_lines), max_lines))


def translate_thread():
    text = input_text.get("1.0", tk.END).strip()
    if not text:
        messagebox.showwarning("Empty", "Please enter text.")
        return

    src = LANGUAGES[source_lang.get()]
    tgt = LANGUAGES[target_lang.get()]

    # Checks if required models exist
    missing_models = []
    if src != "en" and not is_installed(src, "en"):
        missing_models.append((src, "en"))
    if tgt != "en" and not is_installed("en", tgt):
        missing_models.append(("en", tgt))

    if missing_models:
        for f, t in missing_models:
            if messagebox.askyesno("Missing Model", f"Model {f} → {t} not installed. Install now?"):
                install_language(f, t)

    try:
        result = perform_translation(text, src, tgt)
        output_text.config(state="normal")
        output_text.delete("1.0", tk.END)
        output_text.insert(tk.END, result)
        auto_resize_textbox(output_text)
        output_text.config(state="disabled")
    except Exception as e:
        messagebox.showerror("Translation Error", str(e))

def translate():
    threading.Thread(target=translate_thread, daemon=True).start()

# -------------------------------------------------
#              GUI
# -------------------------------------------------
root = tk.Tk()
root.title("Offline Language Translator")
root.geometry("1000x700")
root.minsize(360, 600)
root.configure(bg="#2E7D32")

style = ttk.Style()
style.theme_use("clam")
style.configure("TButton", font=("Segoe UI", 11, "bold"), padding=10, background="#43A047", foreground="white")
style.map("TButton", background=[("active", "#388E3C")])


card = tk.Frame(root, bg="white")
card.place(relx=0.02, rely=0.02, relwidth=0.96, relheight=0.96)

ttk.Label(card, text="🌍 Offline Language Translator", font=("Segoe UI", 24, "bold")).pack(pady=10)


input_text = tk.Text(
    card,
    font=("Segoe UI", 11),
    bg="#E8F5E9",
    bd=0,
    highlightthickness=2,
    highlightbackground="#66BB6A",
    padx=12,
    pady=12,
    wrap="word",
    height=6 
)
input_text.pack(fill="x", padx=20, pady=(10, 5))  # fills horizontally, not vertically

# Language selection frame
lang_frame = ttk.Frame(card)
lang_frame.pack(pady=10, fill="x", padx=20)

source_lang = ttk.Combobox(lang_frame, values=list(LANGUAGES.keys()), state="readonly")
source_lang.set("English")
source_lang.pack(side="left", expand=True, fill="x", padx=5)

ttk.Label(lang_frame, text="→", font=("Segoe UI", 12, "bold")).pack(side="left", padx=5)

target_lang = ttk.Combobox(lang_frame, values=list(LANGUAGES.keys()), state="readonly")
target_lang.set("Spanish")
target_lang.pack(side="left", expand=True, fill="x", padx=5)


btn_frame = ttk.Frame(card)
btn_frame.pack(pady=10, fill="x", padx=20)
ttk.Button(btn_frame, text="Translate", command=translate).pack(side="left", expand=True, fill="x", padx=5)
ttk.Button(btn_frame, text="Install Languages", command=lambda: install_model_prompt(root)).pack(side="left", expand=True, fill="x", padx=5)

output_text = tk.Text(
    card,
    font=("Segoe UI", 11),
    bg="#ECF7EC",
    fg="#1B5E20",
    bd=1,
    relief="sunken",
    highlightthickness=1,
    highlightbackground="#A5D6A7",
    padx=12,
    pady=12,
    wrap="word",
    height=3, 
    state="disabled"
)
output_text.pack(fill="x", padx=20, pady=(5, 10))

root.mainloop()
