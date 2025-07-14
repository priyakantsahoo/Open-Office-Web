# Open Office Web

A modern, web-based word processor inspired by Microsoft Office, built with React and Node.js. Create, edit, and export documents with a professional interface and rich text editing capabilities.

## ✨ Features

### **Document Editing**
- 📝 **Rich Text Editor** - Full-featured TinyMCE editor with Office-style formatting
- 📄 **Document-Centric Layout** - 8.5" width portrait mode with proper margins
- 🎨 **Professional UI** - Clean, Office-inspired interface with toolbar and menus
- 💾 **Auto-save** - Automatic document saving every 30 seconds

### **File Operations**
- 📤 **Document Upload** - Import Word documents (.docx) via drag & drop or file picker
- 📁 **Document Management** - Save, open, and manage HTML documents
- 📋 **PDF Export** - Generate high-quality PDFs with proper formatting
- 🔄 **Format Conversion** - Convert between different document formats

### **Developer Experience**
- ⚛️ **React 19** - Modern React with latest features
- 🚀 **Vite** - Fast development server and build tool
- 🎯 **TypeScript Ready** - Full TypeScript support
- 🎭 **Component Architecture** - Modular, reusable components

## 🏗️ Architecture

```
open-office-web/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── MenuBar.jsx     # Top toolbar with file operations
│   │   ├── EditorPanel.jsx # TinyMCE editor wrapper
│   │   ├── SaveModal.jsx   # Document save dialog
│   │   ├── OpenModal.jsx   # Document open dialog
│   │   └── CommitModal.jsx # Version control dialog
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and design system
├── server/                # Backend Node.js API
│   ├── index.js           # Express server with PDF export
│   ├── openoffice.js      # OpenOffice CLI integration
│   ├── documents/         # Saved HTML documents
│   └── uploads/           # Temporary file uploads
├── public/                # Static assets
└── package.json           # Project dependencies and scripts
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd open-office-web
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Install system dependencies (for PDF export)**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update && sudo apt-get install -y libasound2-dev
   
   # macOS (with Homebrew)
   brew install portaudio
   
   # Windows - No additional dependencies needed
   ```

### **Development**

1. **Start both frontend and backend**
   ```bash
   npm start
   ```
   This runs both the React dev server (port 5173) and Node.js backend (port 5000) concurrently.

2. **Or start them separately**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run server
   ```

3. **Open the application**
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

## 📋 API Endpoints

The backend server provides the following REST API endpoints:

### **Document Operations**
- `POST /api/upload` - Upload and convert Word documents to HTML
- `POST /api/save` - Save document content as HTML file
- `GET /api/list` - List all saved documents
- `GET /api/open/:filename` - Open and retrieve document content

### **Export Operations**
- `POST /api/export/pdf` - Export document content as PDF file

### **Utility**
- `GET /` - API server status and endpoint documentation
- `POST /api/convert` - Generic document format conversion (future)

## 🎯 Usage

### **Creating Documents**
1. Open the application in your browser
2. Start typing in the editor area
3. Use the toolbar for formatting (bold, italic, lists, etc.)
4. Save your document using Ctrl+S or the Save button

### **Importing Documents**
1. Click the Upload button (📤) in the toolbar
2. Select a Word document (.docx file)
3. The document content will be converted and loaded into the editor

### **Exporting to PDF**
1. Create or open a document
2. Click the PDF Export button (📄) in the toolbar
3. The PDF will automatically download to your computer

### **Managing Documents**
1. Use the File menu (☰) for additional options
2. Open existing documents from the document list
3. Save documents with custom filenames

## 🛠️ Development

### **Project Structure**

- **Frontend**: React application using Vite for development and building
- **Backend**: Express.js server with file handling and PDF generation
- **Styling**: Vanilla CSS with Office-inspired design system
- **Editor**: TinyMCE integration with custom configuration

### **Key Technologies**

**Frontend:**
- React 19.1.0 - Component-based UI library
- Vite 6.3.5 - Fast build tool and dev server
- TinyMCE 7.9.1 - Rich text editor
- Axios 1.9.0 - HTTP client for API calls

**Backend:**
- Express 4.18.2 - Web framework
- Puppeteer 24.12.1 - PDF generation
- Mammoth 1.9.1 - Word document conversion
- Multer 2.0.1 - File upload handling

### **Scripts**

```bash
# Development
npm start          # Start both frontend and backend
npm run dev        # Start frontend only (Vite dev server)
npm run server     # Start backend only (Node.js)

# Building
npm run build      # Build for production
npm run preview    # Preview production build

# Code Quality
npm run lint       # Run ESLint
```

### **Environment Variables**

No environment variables are required for basic functionality. The application uses these default ports:
- Frontend: `5173` (Vite dev server)
- Backend: `5000` (Express server)

## 🔧 Configuration

### **TinyMCE Configuration**
The editor is configured with:
- GPL license key for open source usage
- Professional toolbar with formatting options
- Auto-save functionality (30-second intervals)
- Custom content styling for document appearance

### **PDF Export Settings**
- A4 paper size with 0.75" margins
- Professional typography using Segoe UI font family
- High-quality rendering with background graphics

## 🐛 Troubleshooting

### **Common Issues**

**1. Server won't start (port 5000 in use)**
```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9
npm start
```

**2. PDF export fails**
- Ensure system dependencies are installed (libasound2-dev on Linux)
- Check server logs for Puppeteer errors
- Verify that Chrome/Chromium can be launched headlessly

**3. File upload errors**
- Check that the `server/uploads/` directory exists and is writable
- Verify file format is supported (.docx)
- Ensure file size is reasonable (< 10MB)

**4. Editor not loading**
- Verify TinyMCE assets are accessible
- Check browser console for JavaScript errors
- Ensure network connectivity for CDN resources

### **Development Issues**

**Hot reload not working:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**Build errors:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- **TinyMCE** - Rich text editing capabilities
- **Puppeteer** - PDF generation functionality
- **React** - Component-based UI framework
- **Vite** - Fast development experience

---

*Built with ❤️ for modern document editing*