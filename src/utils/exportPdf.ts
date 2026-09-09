import { jsPDF } from "jspdf";
import { VerifiedClaim } from "../types";
import { computeSourceReliability } from "./sourceReliability";

export function generateClaimPdf(claim: VerifiedClaim): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  const dist = computeSourceReliability(claim);

  // Helper for adding new page if needed
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      doc.addPage();
      yPos = margin;
      drawHeaderSmall();
    }
  };

  const drawHeaderSmall = () => {
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("FactLive Evidentiary Verification Report", margin, yPos);
    doc.text(`ID: ${claim.id}`, pageWidth - margin, yPos, { align: "right" });
    yPos += 3;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
  };

  // 1. Top Header Banner
  doc.setFillColor(11, 15, 25); // #0b0f19 dark navy
  doc.roundedRect(margin, yPos, contentWidth, 18, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("FACTLIVE VERIFICATION REPORT", margin + 5, yPos + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text("OPEN EVIDENTIARY AUDIT", margin + 5, yPos + 13);

  const dateStr = new Date(claim.timestamp).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  doc.setTextColor(148, 163, 184);
  doc.text(`AUDIT ID: ${claim.id}`, pageWidth - margin - 5, yPos + 7, { align: "right" });
  doc.text(`DATE: ${dateStr}`, pageWidth - margin - 5, yPos + 13, { align: "right" });

  yPos += 23;

  // 2. Claim Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);

  const claimLines = doc.splitTextToSize(`"${claim.claim}"`, contentWidth - 8);
  const claimBoxHeight = 12 + claimLines.length * 5;
  doc.roundedRect(margin, yPos, contentWidth, claimBoxHeight, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`EXAMINED CLAIM (${claim.category.toUpperCase()}):`, margin + 4, yPos + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(claimLines, margin + 4, yPos + 12);

  yPos += claimBoxHeight + 5;

  // 3. Verdict & Truth Score Metric Bar
  const metricBoxHeight = 22;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, yPos, contentWidth, metricBoxHeight, 2, 2, "F");

  // Verdict Pill
  let verdictBg = [16, 185, 129]; // emerald
  let verdictText = claim.verdict.replace(/_/g, " ");
  if (claim.verdict === "FALSE" || claim.verdict === "MOSTLY_FALSE") {
    verdictBg = [244, 63, 94]; // rose
  } else if (claim.verdict === "MISLEADING" || claim.verdict === "HALF_TRUE") {
    verdictBg = [245, 158, 11]; // amber
  }

  doc.setFillColor(verdictBg[0], verdictBg[1], verdictBg[2]);
  doc.roundedRect(margin + 4, yPos + 4, 48, 14, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(verdictText, margin + 28, yPos + 12.5, { align: "center" });

  // Truth Score
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`${claim.truthScore}/100`, margin + 58, yPos + 11);
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("TRUTH SCORE", margin + 58, yPos + 16);

  // Confidence
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`${claim.confidenceScore}%`, margin + 98, yPos + 11);
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("CONFIDENCE", margin + 98, yPos + 16);

  // Sensationalism
  doc.setFontSize(11);
  doc.setTextColor(
    claim.sensationalismRisk === "Extreme" || claim.sensationalismRisk === "High"
      ? 225
      : 15,
    claim.sensationalismRisk === "Extreme" || claim.sensationalismRisk === "High" ? 29 : 23,
    claim.sensationalismRisk === "Extreme" || claim.sensationalismRisk === "High" ? 72 : 42
  );
  doc.text(claim.sensationalismRisk, margin + 138, yPos + 11);
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("SENSATIONALISM RISK", margin + 138, yPos + 16);

  yPos += metricBoxHeight + 6;

  // 4. Source Reliability Distribution Chart (Vector Visualization)
  checkPageBreak(38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("SOURCE RELIABILITY DISTRIBUTION CHART", margin, yPos);

  // Right index label
  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129);
  doc.text(`Credibility Index: ${dist.reliabilityScore}% (${dist.verdictLabel})`, pageWidth - margin, yPos, {
    align: "right",
  });
  yPos += 3;

  // Chart Container
  const chartBoxHeight = 25;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, chartBoxHeight, 2, 2, "FD");

  // Stacked horizontal bar
  const barY = yPos + 5;
  const barHeight = 6;
  const barWidth = contentWidth - 10;
  const barX = margin + 5;

  const wReliable = (dist.reliablePct / 100) * barWidth;
  const wContext = (dist.contextualPct / 100) * barWidth;
  const wUnreliable = barWidth - wReliable - wContext;

  // Track background
  doc.setFillColor(226, 232, 240);
  doc.rect(barX, barY, barWidth, barHeight, "F");

  // Reliable segment (Emerald)
  if (wReliable > 0) {
    doc.setFillColor(16, 185, 129);
    doc.rect(barX, barY, wReliable, barHeight, "F");
  }
  // Context segment (Amber)
  if (wContext > 0) {
    doc.setFillColor(245, 158, 11);
    doc.rect(barX + wReliable, barY, wContext, barHeight, "F");
  }
  // Unreliable segment (Rose)
  if (wUnreliable > 0) {
    doc.setFillColor(244, 63, 94);
    doc.rect(barX + wReliable + wContext, barY, wUnreliable, barHeight, "F");
  }

  // Legend and stats below chart bar
  const legY = yPos + 16;
  doc.setFontSize(8);

  // Emerald Legend
  doc.setFillColor(16, 185, 129);
  doc.circle(barX + 2, legY - 1, 1.5, "F");
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(`${dist.reliablePct}% Reliable`, barX + 6, legY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`(${dist.reliableCount} peer-reviewed/wire)`, barX + 32, legY);

  // Amber Legend
  doc.setFillColor(245, 158, 11);
  doc.circle(barX + 68, legY - 1, 1.5, "F");
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(`${dist.contextualPct}% Context`, barX + 72, legY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`(${dist.contextualCount} neutral)`, barX + 96, legY);

  // Rose Legend
  doc.setFillColor(244, 63, 94);
  doc.circle(barX + 128, legY - 1, 1.5, "F");
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(`${dist.unreliablePct}% Unreliable`, barX + 132, legY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`(${dist.unreliableCount} rumors/blogs)`, barX + 160, legY);

  yPos += chartBoxHeight + 6;

  // 5. Executive Summary
  checkPageBreak(25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("BOTTOM-LINE ASSESSMENT", margin, yPos);
  yPos += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(claim.executiveSummary, contentWidth);
  doc.text(summaryLines, margin, yPos);
  yPos += summaryLines.length * 4.5 + 4;

  // 6. Evidence & Cross-Examination
  if (claim.keyEvidence && claim.keyEvidence.length > 0) {
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text("KEY EVIDENCE & CROSS-EXAMINATION", margin, yPos);
    yPos += 5;

    claim.keyEvidence.forEach((item) => {
      const typeStr = item.type.toUpperCase();
      const statementLines = doc.splitTextToSize(item.statement, contentWidth - 28);
      const rowHeight = statementLines.length * 4.2 + 3;

      checkPageBreak(rowHeight);

      // Type Badge
      if (item.type === "support") {
        doc.setFillColor(209, 250, 229);
        doc.setTextColor(6, 95, 70);
      } else if (item.type === "refute") {
        doc.setFillColor(254, 226, 226);
        doc.setTextColor(159, 18, 57);
      } else {
        doc.setFillColor(241, 245, 249);
        doc.setTextColor(51, 65, 85);
      }

      doc.roundedRect(margin, yPos, 22, 5, 1, 1, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(typeStr, margin + 11, yPos + 3.8, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(statementLines, margin + 25, yPos + 3.5);

      yPos += rowHeight;
    });

    yPos += 3;
  }

  // 7. Missing / Omitted Context
  if (claim.omittedContext) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(180, 83, 9); // amber-700
    doc.text("CRUCIAL OMITTED CONTEXT IN VIRAL POSTS", margin, yPos);
    yPos += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const contextLines = doc.splitTextToSize(claim.omittedContext, contentWidth);
    doc.text(contextLines, margin, yPos);
    yPos += contextLines.length * 4.5 + 4;
  }

  // 8. Grounding Sources & Citations
  if (claim.groundingSources && claim.groundingSources.length > 0) {
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text("PRIMARY CITATIONS & VERIFICATION RECORDS", margin, yPos);
    yPos += 5;

    claim.groundingSources.forEach((src, idx) => {
      const srcText = `${idx + 1}. ${src.title} — ${src.source}${src.url ? ` (${src.url})` : ""}`;
      const srcLines = doc.splitTextToSize(srcText, contentWidth);
      checkPageBreak(srcLines.length * 4 + 2);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(srcLines, margin, yPos);
      yPos += srcLines.length * 4 + 1;
    });

    yPos += 4;
  }

  // 9. Document Footer
  checkPageBreak(15);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Generated via FactLive (www.factlive.in) — Open, non-partisan evidentiary verification powered by Google Gemini.",
    margin,
    pageHeight - 8
  );
  doc.text(`www.factlive.in`, pageWidth - margin, pageHeight - 8, { align: "right" });

  // Trigger browser download
  const safeFilename = `FactLive-Audit-${claim.id.replace(/[^a-zA-Z0-9_-]/g, "")}.pdf`;
  doc.save(safeFilename);
}
