// const { query } = require('express');
const productRepo = require('../repo/product');
const sendResponse = require('../helper/response');

// GET data

const create = async (req, res) => {
  try {
    const response = await productRepo.createProduct(req.body, req.file.path);
    sendResponse.success(res, 200, {
      msg: (response.text = 'Create Succes'),
      data: response.rows,
    });
  } catch (err) {
    sendResponse.error(res, 500, 'Internal Server Error');
  }
};

const edit = async (req, res) => {
  try {
    const response = await productRepo.editProduct(req.body, req.params);
    sendResponse.success(res, 200, {
      msg: (response.text = 'Product has been change'),
    });
  } catch (err) {
    sendResponse.error(res, 500, 'Internal Server Error');
  }
};
const drop = async (req, res) => {
  try {
    const result = await productRepo.deleteProduct(req.params);
    sendResponse.success(res, 200, {
      msg: 'Delete Success',
      data: result.rows,
    });
  } catch (obJerr) {
    const statusCode = obJerr.statusCode || 500;
    sendResponse.error(res, statusCode, ' Internal Server Error');
  }
};
const search = async (req, res) => {
  try {
    const response = await productRepo.searchProduct(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server Error',
    });
  }
};

const productControler = {
  create,
  search,
  edit,
  drop,
};

module.exports = productControler;