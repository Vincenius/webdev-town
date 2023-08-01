const multer = require('multer');

export const config = {
  api: {
    bodyParser: false,
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './tmp'); // 'uploads' is the folder where files will be stored
  },
  filename: function (req, file, cb) {
      // Save the file with its original name
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const handler = async (req, res) => {
  await upload.single("file")(req, res, err => {
    res.status(200).json({ path: './tmp/' + req.file.filename })
  })
}

export default handler
