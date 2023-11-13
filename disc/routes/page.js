"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const auth_1 = require("../middleware/auth");
const utils_1 = require("../utils/utils");
// import { createProductSchema,  option,  updateProductSchema } from "../utils/utils";
const productModel_1 = require("../model/productModel");
const userModel_1 = require("../model/userModel");
const router = express_1.default.Router();
//render register page
router.get('/register', (req, res) => {
    res.render("Register");
});
//render Admin page to view all Users
router.get('/admin', async (req, res) => {
    try {
        const limitQueryParam = req.query.limit;
        const limit = limitQueryParam ? parseInt(limitQueryParam, 10) : undefined;
        const offsetQueryParam = req.query.offset;
        const offset = offsetQueryParam ? parseInt(offsetQueryParam, 10) : undefined;
        const getAllUsers = await userModel_1.UserInstance.findAll({
            limit: limit,
            offset: offset,
        });
        const getAllProducts = await productModel_1.ProductInstance.findAll({
            limit: limit,
            offset: offset,
        });
        return res.render('admin', {
            userlist: getAllUsers,
            productlist: getAllProducts, // Pass the user data to the template with the new variable name
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});
//render login page
router.get('/login', (req, res) => {
    res.render("login");
});
// get-products and render home page
router.get('/', auth_1.auth, async (req, res) => {
    try {
        const { id } = req.user;
        // Fetch the user along with their products, or an empty object if the user has no products
        const user = await userModel_1.UserInstance.findOne({
            where: { id },
            include: {
                model: productModel_1.ProductInstance,
                as: 'products',
            },
        });
        return res.render('home', {
            productlist: user.products, // Always an array (even if empty)
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
//api create todo with ejs
router.post('/', auth_1.auth, async (req, res) => {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        const productRecord = await productModel_1.ProductInstance.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        // Redirect to the home page after creating the product
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
//   Delete product 
router.get('/:id', auth_1.auth, async (req, res) => {
    try {
        const { id } = req.params;
        const record = await productModel_1.ProductInstance.findOne({ where: { id } });
        if (!record) {
            res.render('home', { error: "Cannot find existing products" });
        }
        await record.destroy();
        return res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
//  // Handle the product update form submission
router.put('/:id', auth_1.auth, async (req, res) => {
    try {
        // Extract the parameters from req.body
        const { name, image, brand, category, description, price, countInStock, rating, numReviews, } = req.body;
        // Extract the id parameter from req.params
        const { id } = req.params;
        // Validate with Joi
        const validateResult = utils_1.updateProductSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({ error: validateResult.error.details[0].message });
        }
        const updateProduct = await productModel_1.ProductInstance.findOne({
            where: { id: id },
        });
        if (!updateProduct) {
            return res.render('home', { error: "Can't find Products" });
        }
        // Update the record with the provided values
        await updateProduct.update({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews,
        });
        return res.redirect("/");
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = router;
