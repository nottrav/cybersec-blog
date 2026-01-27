import fs from 'fs';
import path from 'path';

export async function GET() {
  const pdfPath = path.join(process.cwd(), 'public', 'capstone-reflection.pdf');
  
  try {
    const pdfBuffer = fs.readFileSync(pdfPath);
    
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="capstone-reflection.pdf"'
      }
    });
  } catch (error) {
    return new Response('PDF not found', { status: 404 });
  }
}
