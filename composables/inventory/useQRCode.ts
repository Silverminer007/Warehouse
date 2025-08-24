import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

export function useQRCode() {

    type QrEntry = {
        url: string;
        label: string;
    };

    /**
     * Erzeugt ein PDF mit beliebig vielen QR-Codes (6 pro Seite: 2 Spalten × 3 Zeilen)
     * @param entries Array mit { url, label }
     * @returns Uint8Array (PDF Bytes)
     */
    async function createQrPdf(entries: QrEntry[]): Promise<Uint8Array> {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pageWidth = 595; // A4 Breite
        const pageHeight = 842; // A4 Höhe
        const qrSize = 150;
        const marginX = 60;
        const marginY = 60;
        const gapX = 200;
        const gapY = 250;

        for (let i = 0; i < entries.length; i++) {
            if (i % 6 === 0) {
                // neue Seite alle 6 Einträge
                pdfDoc.addPage([pageWidth, pageHeight]);
            }
            const page = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
            const entry = entries[i];

            // QR-Code generieren
            const qrDataUrl = await QRCode.toDataURL(entry.url, { margin: 1, width: qrSize });
            const qrImage = await pdfDoc.embedPng(qrDataUrl);

            // Position berechnen
            const slot = i % 6;
            const col = slot % 2;
            const row = Math.floor(slot / 2);

            const x = marginX + col * gapX;
            const y = pageHeight - marginY - row * gapY - qrSize;

            // QR einfügen
            page.drawImage(qrImage, {
                x,
                y,
                width: qrSize,
                height: qrSize,
            });

            // Label einfügen
            page.drawText(entry.label, {
                x,
                y: y - 20,
                size: 20,
                font,
                color: rgb(0, 0, 0),
            });
        }

        return await pdfDoc.save();
    }

    return {
        createQrPdf,
    }
}