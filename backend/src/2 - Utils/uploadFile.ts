import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

// Set up the destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/1 - Assets/images/'); // Set the destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file using UUID to ensure uniqueness
    const extension = path.extname(file.originalname);
    cb(null, uuid() + extension);
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });

// Controller function to handle file upload
export const uploadFile = (req, res) => {
  // req.file contains information about the uploaded file
  // You can access the file details with req.file.filename, req.file.path, etc.
  if (req.file) {
    console.log('File uploaded:', req.file.filename);
    return res.status(200).json({ message: 'File uploaded successfully.' });
  } else {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
};

