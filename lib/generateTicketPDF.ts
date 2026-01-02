import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

type GenerateTicketPDFProps = {
  order: {
    eventName: string;
    customerFirstName: string;
    _id: string;
  };
  ticketEntries: {
    ticketId: string;
    quantity: number;
    name: string;
  }[];
  ticketKeys: {
    verificationKey: string;
    ticketName: string;
  }[];
  customerEmail: string;
};

export async function generateTicketPDF({
  order,
  ticketKeys,
  customerEmail,
}: GenerateTicketPDFProps): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (let i = 0; i < ticketKeys.length; i++) {
    const { verificationKey, ticketName } = ticketKeys[i];

    const qrDataURL = await QRCode.toDataURL(verificationKey);
    const qrImageBytes = qrDataURL.split(",")[1];
    const qrImageBuffer = Buffer.from(qrImageBytes, "base64");
    const qrImage = await pdfDoc.embedPng(qrImageBuffer);
    const qrDims = qrImage.scale(0.8);

    const page = pdfDoc.addPage([400, 600]);

    // Header: Event Title
    page.drawText(order.eventName, {
      x: 50,
      y: 560,
      size: 20,
      font: boldFont,
      color: rgb(0.15, 0.15, 0.2),
    });

    page.drawText("Ticket Pass", {
      x: 50,
      y: 535,
      size: 14,
      font,
      color: rgb(0.45, 0.45, 0.5),
    });

    // Divider
    page.drawLine({
      start: { x: 50, y: 525 },
      end: { x: 350, y: 525 },
      thickness: 1,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Ticket Details
    const detailsY = 500;
    const spacing = 20;

    page.drawText(`Ticket: ${ticketName}`, {
      x: 50,
      y: detailsY,
      size: 13,
      font,
    });

    page.drawText(`Email: ${customerEmail}`, {
      x: 50,
      y: detailsY - spacing,
      size: 12,
      font,
    });

    page.drawText(`Order ID: ${order._id}`, {
      x: 50,
      y: detailsY - spacing * 2,
      size: 11,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });

    // QR Code in center
    const qrX = (400 - qrDims.width) / 2;
    page.drawImage(qrImage, {
      x: qrX,
      y: 270,
      width: qrDims.width,
      height: qrDims.height,
    });

    page.drawText("Scan at event entry point", {
      x: qrX,
      y: 250,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Footer: Branding
    page.drawText("Powered by TicketNests", {
      x: qrX,
      y: 40,
      size: 12,
      font: boldFont,
      color: rgb(0.1, 0.6, 0.3),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
