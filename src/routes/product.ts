import express from 'express';
import {
    // creatProduct, 
    getProducts, 
    // updateProducts,
    // deleteProduct
} from "../controller/productController";
import { auth } from '../middleware/auth';
const router = express.Router();

/* GET home page. */
// router.post('/create', auth, creatProduct);

router.get('/get-products', auth, getProducts);
// router.patch('/Update-products/:id', auth, updateProducts);
// router.delete('/delete-products/:id', auth, deleteProduct)

export default router;
