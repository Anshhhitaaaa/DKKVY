
// src/controllers/productController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');

const createProduct = async (req, res) => {
  try {
    const { applicantId, productName, sector, description, cost, contactDetails } = req.body;
    const photoUrls = req.files?.map(f => f.path) || [];

    const product = await prisma.product.create({
      data: {
        applicantId,
        productName,
        sector,
        description,
        photoUrls,
        cost: parseInt(cost),
        contactDetails,
        approvalStatus: 'PENDING',
      },
    });

    res.status(201).json(apiResponse(true, 'Product submitted for approval', product));
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getProducts = async (req, res) => {
  try {
    const { sector, approvalStatus } = req.query;
    let where = {};
    if (sector) where.sector = sector;
    if (approvalStatus) where.approvalStatus = approvalStatus;

    const products = await prisma.product.findMany({
      where,
      include: { applicant: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(apiResponse(true, 'Products retrieved successfully', products));
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getPendingProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { approvalStatus: 'PENDING' },
      include: { applicant: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(apiResponse(true, 'Pending products retrieved', products));
  } catch (error) {
    console.error('Get pending products error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const approveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: {
        approvalStatus: 'APPROVED',
        approvedBy: req.user.id,
        approvedAt: new Date(),
        publishedAt: new Date(),
      },
    });
    res.json(apiResponse(true, 'Product approved and published', product));
  } catch (error) {
    console.error('Approve product error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json(apiResponse(true, 'Product deleted successfully'));
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  createProduct,
  getProducts,
  getPendingProducts,
  approveProduct,
  deleteProduct,
};
