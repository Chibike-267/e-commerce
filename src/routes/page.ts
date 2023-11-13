import express, {Request, Response} from 'express'
import { v4 as uuidV4 } from "uuid";
import {auth} from "../middleware/auth"
import { 
    // createProductSchema, 
    option, 
    updateProductSchema } from "../utils/utils";
// import { createProductSchema,  option,  updateProductSchema } from "../utils/utils";
import { ProductInstance } from "../model/productModel";
import { UserInstance } from '../model/userModel';

const router = express.Router();


//render register page
router.get('/register',(req:Request,  res: Response)=>{
    res.render("Register");
})

//render Admin page to view all Users
router.get('/admin', async (req: Request | any, res: Response) => {
    try {
      const limitQueryParam = req.query.limit as string | undefined;
      const limit = limitQueryParam ? parseInt(limitQueryParam, 10) : undefined;
  
      const offsetQueryParam = req.query.offset as string | undefined;
      const offset = offsetQueryParam ? parseInt(offsetQueryParam, 10) : undefined;
  
      const getAllUsers = await UserInstance.findAll({
        limit: limit,
        offset: offset,
      });

      const getAllProducts = await ProductInstance.findAll({
        limit: limit,
        offset: offset,
      });
  
      return res.render('admin', {
        userlist: getAllUsers,
        productlist: getAllProducts, // Pass the user data to the template with the new variable name
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  });


//render login page
router.get('/login',(req:Request,  res: Response)=>{
    res.render("login");
})

// get-products and render home page
router.get('/', auth, async (req: Request | any, res: Response) => {
    try {
      const { id } = req.user;
      
      // Fetch the user along with their products, or an empty object if the user has no products
      const user = await UserInstance.findOne({
        where: { id },
        include: {
          model: ProductInstance,
          as: 'products',
        },
      }) as unknown as { products: ProductInstance[] };
  
      return res.render('home', {
        productlist: user.products, // Always an array (even if empty)
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
//api create todo with ejs
router.post('/', auth,  async (req: Request | any, res: Response) => {
  
    try {
        const verified = req.user;
        const id = uuidV4();
        
        const productRecord = await ProductInstance.create({
          id,
          ...req.body,
          userId: verified.id,
        });
    
     // Redirect to the home page after creating the product
     res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


//   Delete product 
  router.get('/:id', auth,  async (req: Request | any, res: Response) => {
    try{
        const {id} = req.params
        const record = await ProductInstance.findOne({where: {id}})
       
        if(!record){
       res.render('home', {error: "Cannot find existing products"})
        }
      await record.destroy();
        return res.redirect('/');
         }catch(error){
       console.log(error)
       res.status(500).send('Internal Server Error');
         }
  })


//  // Handle the product update form submission
router.put('/:id', auth, async (req: Request | any, res: Response) => {
    try {
        // Extract the parameters from req.body
        const {
          name,
          image,
          brand,
          category,
          description,
          price,
          countInStock,
          rating,
          numReviews,
        } = req.body;
    
        // Extract the id parameter from req.params
        const { id } = req.params;
    
        // Validate with Joi
        const validateResult = updateProductSchema.validate(req.body, option);
    
        if (validateResult.error) {
          return res.status(400).json({ error: validateResult.error.details[0].message });
        }
    
        const updateProduct = await ProductInstance.findOne({
          where: { id: id },
        });
    
        if (!updateProduct) {
             return res.render('home', {error: "Can't find Products"})
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
      } catch (err) {
        console.log(err);
      }
});


export default router;