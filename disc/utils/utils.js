"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = exports.loginUserSchema = exports.option = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    firstName: joi_1.default.string().required(),
    password: joi_1.default.string().trim().regex(/^[a-zA-Z0-9]{3,18}$/).required(),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required()
        .label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
    gender: joi_1.default.string().required(),
    phone: joi_1.default.number().required(),
    address: joi_1.default.string().required()
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().trim().regex(/^[a-zA-Z0-9]{3,18}$/).required(),
});
exports.createProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    brand: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    countInStock: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
    numReviews: joi_1.default.number().required(),
});
exports.updateProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    brand: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    countInStock: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
    numReviews: joi_1.default.number().required(),
});
