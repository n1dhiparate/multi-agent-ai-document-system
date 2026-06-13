# Multi-Agent AI Document System

An AI-powered document analysis and report generation platform that combines Retrieval-Augmented Generation (RAG) with a multi-agent workflow to transform uploaded documents into structured research outputs.

## Overview

The Multi-Agent AI Document System allows users to upload PDF documents, perform semantic search across document content, ask questions grounded in uploaded materials, and generate comprehensive AI-assisted reports.

The system uses a Retrieval-Augmented Generation (RAG) pipeline backed by ChromaDB vector storage and multiple specialized AI agents that collaborate to research, plan, write, review, and cite generated content.

---

## Features

### Document Processing

* PDF upload and ingestion
* Automatic text extraction
* Intelligent text chunking
* Vector embedding generation
* ChromaDB vector storage

### Retrieval-Augmented Generation (RAG)

* Semantic document search
* Context-aware question answering
* Retrieval of relevant document chunks
* Grounded responses based on uploaded documents

### Multi-Agent Workflow

The system uses specialized AI agents:

#### Research Agent

* Retrieves relevant document context
* Generates research summaries
* Extracts key findings and concepts

#### Planner Agent

* Converts research into structured outlines
* Organizes report sections

#### Writer Agent

* Produces comprehensive reports
* Follows generated outlines
* Maintains professional formatting

#### Reviewer Agent

* Evaluates report quality
* Identifies issues and improvements
* Provides overall quality assessment

#### Citation Agent

* Adds citation markers
* Generates reference sections

---

## Architecture

User Uploads PDF
↓
Text Extraction
↓
Chunking
↓
Embeddings
↓
ChromaDB Vector Store
↓
Semantic Retrieval
↓
Research Agent
↓
Planner Agent
↓
Writer Agent
↓
Reviewer Agent
↓
Citation Agent
↓
Final Report

---

## Technology Stack

### Backend

* FastAPI
* Python
* LangChain
* ChromaDB
* SentenceTransformers

### AI Models

* Groq
* Google Gemini
* OpenAI

### Frontend

* Next.js (In Progress)

---

## API Endpoints

### Document Endpoints

| Endpoint          | Description                            |
| ----------------- | -------------------------------------- |
| POST /upload-pdf  | Upload PDF document                    |
| GET /vector-count | View stored vectors                    |
| GET /search       | Semantic search                        |
| GET /ask          | Ask questions about uploaded documents |

### Agent Endpoints

| Endpoint      | Description                   |
| ------------- | ----------------------------- |
| GET /research | Research generation           |
| GET /plan     | Outline generation            |
| GET /report   | Report creation               |
| GET /review   | Report review                 |
| GET /generate | Complete multi-agent workflow |

---

## Installation

### Clone Repository

git clone <repository-url>

### Backend Setup

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

### Environment Variables

Create a .env file:

GROQ_API_KEY=

GOOGLE_API_KEY=

OPENAI_API_KEY=

MODEL_PROVIDER=groq

MODEL_NAME=llama-3.3-70b-versatile

### Run Backend

uvicorn app.main:app --reload

---

## Future Improvements

* Interactive Next.js frontend
* Streaming report generation
* Multi-document support
* Advanced citation generation
* User authentication
* Report export (PDF/DOCX)
* Cloud deployment

---

## Author

Nidhi Parate

B.Tech Information Technology Student

Built as a portfolio project demonstrating:

* Retrieval-Augmented Generation (RAG)
* Multi-Agent AI Systems
* FastAPI Development
* Vector Databases
* LLM Integration
* Full-Stack AI Application Design
