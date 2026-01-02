import { TicketOrder } from "@/types/ticket";
import PDFDocument from "pdfkit";

export const generateTicketPDF = (order: TicketOrder): Promise<Buffer> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers: Uint8Array[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc
      .fontSize(18)
      .text(`Ticket for ${order.ticketTitle}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${order.customerName}`);
    doc.text(`Email: ${order.email}`);
    doc.text(`Ticket ID: ${order.ticketId}`);
    doc.moveDown().text("Show this ticket at the gate.", { align: "center" });

    if (order.qrCodePath) {
      doc.image(order.qrCodePath, {
        fit: [250, 250],
        align: "center",
        valign: "center",
      });
    }

    doc.end();
  });
};