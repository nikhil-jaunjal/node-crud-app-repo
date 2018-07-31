const express = require('express');
const router = express.Router();
const checkAuth = require('../middelware/check-auth');
const ProductController = require('../controllers/ProductController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        //reject a file
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

//--find all
router.get('/', ProductController.getAllProducts);

//--find by id
router.get('/:id', ProductController.getProductById);

//--save
router.post('/', checkAuth, upload.single('productImage'), ProductController.saveProduct);


//--update
router.put('/:id', checkAuth, ProductController.updateProduct);

//--delete
router.delete('/:id', checkAuth, ProductController.deleteProduct);

module.exports = router;