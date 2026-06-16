# Multi-Agent AI Document System

An AI-powered document intelligence backend that combines Retrieval-Augmented Generation (RAG), semantic search, vector databases, and a multi-step agent workflow to transform PDF documents into structured research reports.

The system allows users to upload PDF documents, perform semantic search, ask questions grounded in uploaded content, and generate AI-assisted reports through specialized processing stages.

---

## Overview

The Multi-Agent AI Document System is designed to extract knowledge from unstructured documents and convert it into useful research outputs.

The platform performs:

* PDF ingestion and processing
* Text extraction and chunking
* Embedding generation
* Vector storage using ChromaDB
* Semantic retrieval
* Context-aware question answering
* Structured report generation through multiple AI agents

The architecture focuses on retrieval-grounded generation to improve answer quality and reduce hallucinations.

---

# Features

## Document Processing

* PDF upload and processing
* Automated text extraction
* Document chunking
* Embedding generation
* ChromaDB vector storage

## Retrieval-Augmented Generation (RAG)

* Semantic search over uploaded documents
* Context-aware question answering
* Relevant chunk retrieval
* Grounded responses based on retrieved document content
* Reduced hallucinations through retrieval-based context injection

## Multi-Agent Workflow

The report generation pipeline is divided into specialized stages.

### Research Agent

Responsible for document understanding and information extraction.

Capabilities:

* Retrieves relevant document chunks
* Identifies important findings
* Generates research summaries
* Extracts supporting evidence

### Planner Agent

Responsible for report organization.

Capabilities:

* Creates report outlines
* Defines section hierarchy
* Organizes content structure

### Writer Agent

Responsible for report generation.

Capabilities:

* Expands report sections
* Produces structured content
* Maintains consistency across sections

### Reviewer Agent

Responsible for quality assessment.

Capabilities:

* Reviews report completeness
* Identifies inconsistencies
* Suggests improvements

### Citation Agent

Responsible for source attribution.

Capabilities:

* Adds citation markers
* Connects content to retrieved sources
* Improves report traceability

---

# Architecture

User Uploads PDF
↓
Text Extraction
↓
Chunking
↓
Embedding Generation
↓
ChromaDB
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

# Technology Stack

## Backend

* FastAPI
* Python

## AI & LLM

* LangChain
* OpenAI / Gemini / Groq
* SentenceTransformers

## Vector Database

* ChromaDB

## Concepts

* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Vector Embeddings
* Multi-Agent Workflows
* LLM Orchestration

---

# API Endpoints

## Document Management

| Endpoint          | Description                            |
| ----------------- | -------------------------------------- |
| POST /upload-pdf  | Upload and process PDF                 |
| GET /vector-count | View vector count                      |
| GET /search       | Semantic search                        |
| GET /ask          | Ask questions about uploaded documents |

## Report Workflow

| Endpoint      | Description               |
| ------------- | ------------------------- |
| GET /research | Generate research summary |
| GET /plan     | Create report outline     |
| GET /report   | Generate report           |
| GET /review   | Review report             |
| GET /generate | Execute full workflow     |

---

# Installation

```bash
git clone <repository-url>
cd multi-agent-ai-document-system
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=
GOOGLE_API_KEY=
OPENAI_API_KEY=

MODEL_PROVIDER=groq
MODEL_NAME=llama-3.3-70b-versatile
```

---

# Run

```bash
uvicorn app.main:app --reload
```

API:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

# Learning Outcomes

This project demonstrates:

* Retrieval-Augmented Generation (RAG)
* FastAPI Backend Development
* Vector Databases and Embeddings
* Semantic Search
* LLM Integration
* Multi-Agent Report Generation
* AI-Powered Document Intelligence

---

# Author

Nidhi Parate

B.Tech Information Technology
