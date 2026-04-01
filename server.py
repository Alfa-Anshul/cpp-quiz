from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from pathlib import Path
import os

app = FastAPI(title="C++ Quiz")

BASE_DIR = Path(__file__).parent.absolute()

@app.get("/")
async def serve_index():
    index_file = BASE_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file), media_type="text/html")
    return HTMLResponse("<h1>C++ Quiz</h1><p>Files not loaded</p>", status_code=404)

@app.get("/styles.css")
async def serve_styles():
    css_file = BASE_DIR / "styles.css"
    if css_file.exists():
        return FileResponse(str(css_file), media_type="text/css")
    return HTMLResponse("/* CSS not found */", status_code=404)

@app.get("/app.js")
async def serve_app():
    js_file = BASE_DIR / "app.js"
    if js_file.exists():
        return FileResponse(str(js_file), media_type="application/javascript")
    return HTMLResponse("// JS not found", status_code=404)

@app.get("/{path:path}")
async def serve_static(path: str):
    file_path = BASE_DIR / path
    if file_path.is_file():
        return FileResponse(str(file_path))
    return FileResponse(str(BASE_DIR / "index.html"), media_type="text/html")
