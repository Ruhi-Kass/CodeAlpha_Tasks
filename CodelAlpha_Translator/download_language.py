import argostranslate.package
import argostranslate.translate
import tkinter as tk
from tkinter import ttk, messagebox
import threading

# Supported languages
LANGUAGES = {
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Portuguese": "pt",
    "Italian": "it",
    "Russian": "ru",
}


def is_installed(from_code, to_code):
    try:
        argostranslate.translate.translate("test", from_code, to_code)
        return True
    except Exception:
        return False


def install_language(from_code, to_code, progress=None):
    try:
        if progress:
            progress.start(10)

        argostranslate.package.update_package_index()
        packages = argostranslate.package.get_available_packages()

        pkg = next(
            (p for p in packages if p.from_code == from_code and p.to_code == to_code),
            None
        )

        if not pkg:
            messagebox.showinfo(
                "Unavailable",
                f"No model available for {from_code} → {to_code}"
            )
            return False

        argostranslate.package.install_from_path(pkg.download())
        return True

    except Exception as e:
        messagebox.showerror("Install Error", str(e))
        return False

    finally:
        if progress:
            progress.stop()


def install_all_pairs(progress=None):
    codes = list(LANGUAGES.values())
    for i in range(len(codes)):
        for j in range(len(codes)):
            if i == j:
                continue
            src = codes[i]
            tgt = codes[j]
            if not is_installed(src, tgt):
                install_language(src, tgt, progress)
    messagebox.showinfo("Done", "All pairwise language models installed.")


def install_model_prompt(parent):
    win = tk.Toplevel(parent)
    win.title("Install Language Models")
    win.geometry("90%x90%")
    win.configure(bg="#E8F5E9")
    win.transient(parent)
    win.grab_set()

    ttk.Label(win, text="📦 Install Language Model", font=("Segoe UI", 16, "bold")).pack(pady=10)

    frame = ttk.Frame(win)
    frame.pack(pady=10, fill="x", padx=20)

    ttk.Label(frame, text="From").grid(row=0, column=0, padx=5, pady=5, sticky="w")
    ttk.Label(frame, text="To").grid(row=1, column=0, padx=5, pady=5, sticky="w")

    from_box = ttk.Combobox(frame, values=list(LANGUAGES.keys()), state="readonly")
    from_box.set("English")
    from_box.grid(row=0, column=1, pady=5, sticky="ew")

    to_box = ttk.Combobox(frame, values=list(LANGUAGES.keys()), state="readonly")
    to_box.set("Spanish")
    to_box.grid(row=1, column=1, pady=5, sticky="ew")

    frame.columnconfigure(1, weight=1)

    progress = ttk.Progressbar(win, mode="indeterminate")
    progress.pack(fill="x", padx=20, pady=10)


    def install_selected():
        src = LANGUAGES[from_box.get()]
        tgt = LANGUAGES[to_box.get()]
        if is_installed(src, tgt):
            messagebox.showinfo("Installed", "Model already installed.")
            return
        install_language(src, tgt, progress)
        messagebox.showinfo("Installed", f"Model {from_box.get()} → {to_box.get()} installed.")

    def install_all():
        threading.Thread(target=lambda: install_all_pairs(progress), daemon=True).start()

    btns = ttk.Frame(win)
    btns.pack(pady=10, fill="x", padx=20)
    ttk.Button(btns, text="Install Selected", command=install_selected).pack(side="left", expand=True, fill="x", padx=5)
    ttk.Button(btns, text="Install All Pairs", command=install_all).pack(side="left", expand=True, fill="x", padx=5)
