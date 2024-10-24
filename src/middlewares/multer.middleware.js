import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/documents/Resume');
  },
  filename: function (req, file, cb) {
    const uniquename = uuidv4();
    cb(null, uniquename + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); 
  } else {
    cb(new Error('Only PDFs are allowed'), false);  
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export default upload;
