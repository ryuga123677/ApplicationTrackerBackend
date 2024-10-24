import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/documents/images'); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4();
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// Configure multer to expect a specific field name for file uploads
const uploadphoto = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if the field name matches
    if (file.fieldname === 'profilephoto') {
      cb(null, true); // Accept the file
    } else {
      cb(new multer.MulterError('Unexpected field')); 
    }
  }
});

export default uploadphoto;
