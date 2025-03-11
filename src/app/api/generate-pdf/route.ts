import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';

interface GeneratePdfOptions {
  template: 'professional' | 'modern';
  user: any;
}

function generateProfessionalTemplate(doc: jsPDF, user: any) {
  let y = 20;

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(user.name, 20, y);
  y += 10;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(user.company.name, 20, y);


  y += 15;
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);

  const leftColumn = 20;
  const rightColumn = 110;
  y += 20;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Information', leftColumn, y);
  y += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Email: ${user.email}`, leftColumn, y);
  y += 8;
  doc.text(`Phone: ${user.phone}`, leftColumn, y);
  y += 8;
  doc.text(`Website: ${user.website}`, leftColumn, y);
  y += 8;
  doc.text(`Username: ${user.username}`, leftColumn, y);


  let rightY = y - 26;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Company Profile', rightColumn, rightY);
  rightY += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Company: ${user.company.name}`, rightColumn, rightY);
  rightY += 8;
  doc.text(`Catch Phrase: ${user.company.catchPhrase}`, rightColumn, rightY);
  rightY += 8;
  doc.text(`Business Services: ${user.company.bs}`, rightColumn, rightY);

  y += 30;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Address', leftColumn, y);
  y += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${user.address.street}, ${user.address.suite}`, leftColumn, y);
  y += 8;
  doc.text(`${user.address.city}, ${user.address.zipcode}`, leftColumn, y);


  y = 280;
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, y, { align: 'center' });
}

function generateModernTemplate(doc: jsPDF, user: any) {
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, 220, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(user.name, 20, 25);

  let y = 60;

  doc.setTextColor(0, 0, 0);

  doc.setFillColor(249, 250, 251); // Gray-50
  doc.rect(20, y, 80, 60, 'F');

  doc.setFontSize(16);
  doc.text('Contact', 25, y + 10);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Email:\n${user.email}`, 25, y + 25);
  doc.text(`Phone:\n${user.phone}`, 25, y + 45);

  doc.setFillColor(249, 250, 251);
  doc.rect(110, y, 80, 60, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Company', 115, y + 10);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(user.company.name, 115, y + 25);
  doc.text(user.company.catchPhrase, 115, y + 35, { maxWidth: 70 });

  y += 80;
  doc.setFillColor(249, 250, 251);
  doc.rect(20, y, 170, 40, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Address', 25, y + 10);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${user.address.street}, ${user.address.suite}`, 25, y + 25);
  doc.text(`${user.address.city}, ${user.address.zipcode}`, 25, y + 35);
}


export async function POST(request: Request) {
  try {
    const { user, template = 'professional' }: GeneratePdfOptions = await request.json();

    const doc = new jsPDF();

    switch (template) {
      case 'modern':
        generateModernTemplate(doc, user);
        break;
      default:
        generateProfessionalTemplate(doc, user);
    }

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${user.name.replace(/\s+/g, '_')}_details.pdf`,
      },
    });
  } catch (error) {
    console.error('Error in PDF generation route:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 