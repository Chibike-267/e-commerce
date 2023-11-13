import Joi from 'joi';

export const registerUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    firstName: Joi.string().required(),
    password: Joi.string().trim().regex(/^[a-zA-Z0-9]{3,18}$/).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required()
    .label('Confirm password').messages({'any.only': '{{#label}} does not match'}),
    gender: Joi.string().required(),
    phone:  Joi.number().required(),
    address:  Joi.string().required()
})

export const option = {
abortEarly: false,
errors: {
    wrap: {
        label: ''
    }
}
}

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().trim().regex(/^[a-zA-Z0-9]{3,18}$/).required(),
})

export const createProductSchema = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    description:  Joi.string().required(),
    price:  Joi.number().required(),
    countInStock:  Joi.number().required(),
    rating:  Joi.number().required(),
    numReviews:  Joi.number().required(),
})

export const updateProductSchema = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    description:  Joi.string().required(),
    price:  Joi.number().required(),
    countInStock:  Joi.number().required(),
    rating:  Joi.number().required(),
    numReviews:  Joi.number().required(),
})