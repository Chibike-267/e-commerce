"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET home page. */
// router.post('/create', auth, creatProduct);
router.get('/get-products', auth_1.auth, productController_1.getProducts);
// router.patch('/Update-products/:id', auth, updateProducts);
// router.delete('/delete-products/:id', auth, deleteProduct)
exports.default = router;
