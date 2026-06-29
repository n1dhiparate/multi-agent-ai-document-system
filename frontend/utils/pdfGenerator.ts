import { jsPDF } from "jspdf";

export function generatePDF(
  report: string,
  fileName: string
) {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  drawHeader(doc);
  drawMetadata(doc, fileName);
  renderReport(doc, report);
  addFooter(doc);

  const cleanName = fileName.replace(/\.pdf$/i, "");

doc.save(`${cleanName}_AI_Report.pdf`);
}

function drawHeader(doc: jsPDF) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  doc.text("AI Generated Research Report", 20, 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(110);

  doc.text(
    "Generated using the Multi-Agent AI Document System",
    20,
    31
  );

  doc.setDrawColor(220);
  doc.line(20, 38, 190, 38);

  doc.setTextColor(0);
}

function drawMetadata(
  doc: jsPDF,
  fileName: string
) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let y = 48;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text("Status", 20, y);
  doc.text("Source", 80, y);
  doc.text("Generated", 145, y);

  y += 6;

  doc.setFont("helvetica", "normal");

  doc.text("Completed", 20, y);
  const cleanName = fileName.replace(/\.pdf$/i, "");

doc.text(cleanName, 80, y);
  doc.text(today, 145, y);

  doc.setDrawColor(220);
  doc.line(20, y + 8, 190, y + 8);
}

function renderReport(doc: jsPDF, report: string) {
  const lines = report.split("\n");

  let y = 74;

  const pageWidth = 170;
  const pageHeight = 280;

  const checkPage = (space = 10) => {
    if (y + space > pageHeight) {
      doc.addPage();
      y = 22;
    }
  };

  for (let rawLine of lines) {
    let line = rawLine.trim();

    if (!line) {
      y += 4;
      continue;
    }

    // Ignore markdown separators
    if (/^[-=]{3,}$/.test(line)) continue;

    // Remove remaining markdown symbols
    line = line
      .replace(/^#+\s*/, "")
      .replace(/\*\*/g, "")
      .replace(/__/g, "")
      .replace(/`/g, "");

    // ===========================
    // H1
    // ===========================
    if (rawLine.startsWith("# ")) {
      checkPage(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);

      doc.text(line, 20, y);

      y += 6;

      doc.setDrawColor(220);
      doc.line(20, y, 190, y);

      y += 10;

      continue;
    }

    // ===========================
    // H2
    // ===========================
    if (rawLine.startsWith("## ")) {
      checkPage(18);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);

      doc.text(line, 20, y);

      y += 5;

      doc.setDrawColor(230);
      doc.line(20, y, 190, y);

      y += 9;

      continue;
    }

    // ===========================
    // H3
    // ===========================
    if (rawLine.startsWith("### ")) {
      checkPage(16);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      doc.text(line, 20, y);

      y += 8;

      continue;
    }

    // ===========================
    // H4
    // ===========================
    if (rawLine.startsWith("#### ")) {
      checkPage(14);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text(line, 20, y);

      y += 7;

      continue;
    }

    // ===========================
    // Bold paragraph title
    // ===========================
    if (/^\*\*.*\*\*$/.test(rawLine)) {
      checkPage(14);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text(line, 20, y);

      y += 7;

      continue;
    }

    // ===========================
    // Bullet
    // ===========================
    if (rawLine.trim().startsWith("* ")) {
      const bullet = "• " + line.substring(2);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const wrapped = doc.splitTextToSize(bullet, 165);

      wrapped.forEach((text: string) => {
        checkPage(7);

        doc.text(text, 24, y);

        y += 6;
      });

      y += 2;

      continue;
    }

    // ===========================
    // Numbered list
    // ===========================
    if (/^\d+\./.test(rawLine.trim())) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const wrapped = doc.splitTextToSize(line, pageWidth);

      wrapped.forEach((text: string) => {
        checkPage(7);

        doc.text(text, 20, y);

        y += 6;
      });

      y += 2;

      continue;
    }

    // ===========================
    // Paragraph
    // ===========================
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const wrapped = doc.splitTextToSize(line, pageWidth);

    wrapped.forEach((text: string) => {
      checkPage(7);

      doc.text(text, 20, y);

      y += 6;
    });

    y += 4;
  }
}

function addFooter(doc: jsPDF) {
  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setDrawColor(235);
    doc.line(20, 286, 190, 286);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
      `Page ${i} of ${totalPages}`,
      105,
      291,
      {
        align: "center",
      }
    );
  }

  doc.setTextColor(0);
}