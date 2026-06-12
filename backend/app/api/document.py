from fastapi import APIRouter, UploadFile, File
import tempfile
import os

from app.rag.loader import extract_text_from_pdf
from app.rag.chunker import chunk_text

router = APIRouter()


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    try:
        text = extract_text_from_pdf(temp_path)

        chunks = chunk_text(text)

        return {
            "filename": file.filename,
            "total_characters": len(text),
            "total_chunks": len(chunks),
            "preview_chunk": chunks[0] if chunks else ""
        }

    finally:
        os.remove(temp_path)