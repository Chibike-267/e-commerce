import { Request, Response } from 'express';
import { 
  // createProductSchema, 
  option, 
  updateProductSchema } from "../utils/utils";

import { ProductInstance } from "../model/productModel";

// import { v4 as uuidV4 } from "uuid";

// export const creatProduct = async (req: Request | any, res: Response) => {
//   try {
//     const verified = req.user;
//     const id = uuidV4();
//     // Validate with Joi or Zod
//     const validateResult = createProductSchema.validate(req.body, option);

//     if (validateResult.error) {
//       return res.status(400).json({ Error: validateResult.error.details[0].message });
//     }

//     const productRecord = await ProductInstance.create({
//       id,
//       ...req.body,
//       userId: verified.id,
//     });

//     return res.status(201).json({ msg: "Product created successfully", productRecord });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getProducts = async (req: Request, res: Response) => {
  try {
    // localhost:3000/product/get-roducts?limit=5
    const limitQueryParam = req.query?.limit as string | string[] | undefined;
    const limit = typeof limitQueryParam === 'string' ? parseInt(limitQueryParam, 10) : undefined;

    const offsetQueryParam = req.query?.offset as string | string[] | undefined;
    const offset = typeof offsetQueryParam === 'string' ? parseInt(offsetQueryParam, 10) : undefined;

    // const getAllProducts = await ProductInstance.findAll({
    const getAllProducts = await ProductInstance.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({
      msg: "You have successfully retrieved all products",
      count: getAllProducts.count,
      product: getAllProducts.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const updateProducts = async (req: Request, res: Response) => {
//   try {
//     // Extract the parameters from req.body
//     const {
//       name,
//       image,
//       brand,
//       category,
//       description,
//       price,
//       countInStock,
//       rating,
//       numReviews,
//     } = req.body;

//     // Extract the id parameter from req.params
//     const { id } = req.params;

//     // Validate with Joi
//     const validateResult = updateProductSchema.validate(req.body, option);

//     if (validateResult.error) {
//       return res.status(400).json({ error: validateResult.error.details[0].message });
//     }

//     const updateProduct = await ProductInstance.findOne({
//       where: { id: id },
//     });

//     if (!updateProduct) {
//       return res.status(400).json({
//         error: "Cannot find product",
//       });
//     }

//     // Update the record with the provided values
//     const updateRecord = await updateProduct.update({
//       name,
//       image,
//       brand,
//       category,
//       description,
//       price,
//       countInStock,
//       rating,
//       numReviews,
//     });

//     return res.status(200).json({
//       msg: "Product updated successfully",
//       updateRecord,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// export const deleteProduct = async(req: Request, res: Response)=>{
//   try{
//  const {id} = req.params
//  const record = await ProductInstance.findOne({where: {id}})

//  if(!record){
//   return res.status(400).json({
//     error: "Cannot find existing products"
//   })
//  }
//  const deletedRecord = await record.destroy();
//  return res.status(200).json({
//   msg: "You have successfully deleted your products",
//   deletedRecord
//  })

//   }catch(err){
// console.log(err)
//   }
// }
