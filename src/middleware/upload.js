const multer = require('multer')
const createError = require('http-errors')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})

const fileFiltered = (req, file, cb) => {
  const fileSize = parseInt(req.headers['content-length'])
  try {
    if (fileSize > 2 * 1024 * 1024) throw ('File Picture more than 2MB')
    if ((!file.originalname.match(/\.(jpg|jpeg|png)$/))) throw ('File Picture format must PNG, JPG , or JPEG')
    cb(null, true)
  } catch (error) {
    cb(new createError(400, error))
  }
}

const upload = multer({
  storage,
  limits: {
    fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
  },
  fileFilter: fileFiltered
})

module.exports = upload
