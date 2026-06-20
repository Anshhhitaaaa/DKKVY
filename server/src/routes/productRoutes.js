
// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const productController = require('../controllers/productController');

router.post('/',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  uploadMiddleware.array('photos', 5),
  auditMiddleware('Product', 'CREATE'),
  productController.createProduct
);

router.get('/',
  productController.getProducts
);

router.get('/pending',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  productController.getPendingProducts
);

router.put('/:id/approve',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Product', 'UPDATE'),
  productController.approveProduct
);

router.delete('/:id',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Product', 'DELETE'),
  productController.deleteProduct
);

module.exports = router;
