const API_BASE_URL = "http://127.0.0.1:8000";

export async function uploadPDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload PDF");
  }

  return response.json();
}

export async function generateReport(topic: string) {
  const response = await fetch(
    `${API_BASE_URL}/generate?topic=${encodeURIComponent(topic)}`
  );

  if (!response.ok) {
    throw new Error("Failed to generate report");
  }

  return response.json();
}

export async function askQuestion(question: string) {
  const response = await fetch(
    `${API_BASE_URL}/ask?question=${encodeURIComponent(question)}`
  );

  if (!response.ok) {
    throw new Error("Failed to get answer");
  }

  return response.json();
}

export async function searchDocuments(query: string) {
  const response = await fetch(
    `${API_BASE_URL}/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  return response.json();
}