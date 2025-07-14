// Entry point for the Node.js backend
const express = require('express');
const cors = require('cors');
const { convertDocument } = require('./openoffice');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mammoth = require('mammoth');
const puppeteer = require('puppeteer');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Open Office Web API Server',
    status: 'running',
    frontend: 'http://localhost:5173',
    endpoints: {
      'POST /api/convert': 'Convert document format',
      'POST /api/save': 'Save document',
      'GET /api/list': 'List all documents',
      'GET /api/open/:filename': 'Open a document',
      'POST /api/upload': 'Upload and convert Word document',
      'POST /api/export/pdf': 'Export document as PDF'
    }
  });
});

// Route for document conversion
app.post('/api/convert', async (req, res) => {
  const { inputPath, outputFormat, outputDir } = req.body;
  try {
    // Call OpenOffice conversion utility
    const result = await convertDocument(inputPath, outputFormat, outputDir);
    res.json({ message: 'Conversion successful', result });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Route for saving documents
app.post('/api/save', async (req, res) => {
  const { content, filename } = req.body;
  try {
    const saveDir = path.join(__dirname, 'documents');
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir);
    }
    let filePath;
    if (filename) {
      filePath = path.join(saveDir, filename);
    } else {
      filePath = path.join(saveDir, `document_${Date.now()}.html`);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    res.json({ message: 'Document saved', filePath });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// List all documents
app.get('/api/list', (req, res) => {
  const saveDir = path.join(__dirname, 'documents');
  if (!fs.existsSync(saveDir)) {
    return res.json({ documents: [] });
  }
  const files = fs.readdirSync(saveDir).filter(f => f.endsWith('.html'));
  res.json({ documents: files.map(filename => ({ filename })) });
});

// Open a document
app.get('/api/open/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'documents', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  const content = fs.readFileSync(filePath, 'utf8');
  res.json({ content });
});

// Upload and convert Word document
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const result = await mammoth.convertToHtml({ path: req.file.path });
    res.json({ content: result.value });
    fs.unlinkSync(req.file.path); // Clean up uploaded file
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Export document as PDF
app.post('/api/export/pdf', async (req, res) => {
  const { content, filename } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'No content provided' });
  }

  let browser;
  try {
    // Launch Puppeteer browser with minimal dependencies
    browser = await puppeteer.launch({ 
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-audio-output'
      ]
    });
    
    const page = await browser.newPage();
    
    // Create a complete HTML document with proper styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #323130;
            font-size: 14px;
            margin: 40px;
            background: white;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #323130;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          p { margin-bottom: 1em; }
          table { border-collapse: collapse; width: 100%; margin: 1em 0; }
          table td, table th { border: 1px solid #D2D0CE; padding: 8px 12px; }
          table th { background-color: #F3F2F1; font-weight: 600; }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF with Office-like formatting
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in'
      },
      printBackground: true
    });
    
    await browser.close();
    
    // Set response headers for PDF download
    const pdfFilename = filename ? 
      filename.replace(/\.[^/.]+$/, '.pdf') : 
      `document_${Date.now()}.pdf`;
      
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${pdfFilename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer, 'binary');
    
  } catch (err) {
    if (browser) {
      await browser.close();
    }
    console.error('PDF export error:', err);
    res.status(500).json({ error: 'Failed to generate PDF: ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
