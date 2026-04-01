from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory=".", html=True), name="static")

@app.get("/")
async def root():
    return FileResponse("index.html", media_type="text/html")

@app.get("/{filename}")
async def serve_file(filename: str):
    file_path = os.path.join(".", filename)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse("index.html", media_type="text/html")