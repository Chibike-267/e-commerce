import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInstance } from "../model/userModel";

const jwtsecret = process.env.JWT_SECRET;

/**----------API MIDDLEWARE--------------- */
// export async function auth(req:Request | any , res:Response, next: NextFunction){
// const authorization = req.headers.authorization

// if(!authorization){
//     res.status(401).json({error: "kindly sign in as a user"})
// }
// const token = authorization.slice(7, authorization.length);

// let verified = jwt.verify(token, jwtsecret);

// if(!verified){
//     res.status(401).json({error: "Invalid token, you cant access this route"})
// }

// const {id} = verified as {[key:string] :string}

// //check if user exist
// const user = await UserInstance.findOne({where:{id}});

// if(!user){
//     res.status(401).json({error: "Kindly signup as a user "})
// }

//   req.user = verified
//   next()
// }

/**----------EJS MIDDLEWARE--------------- */

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    // const authorization = req.headers.authorization

    //req.cookies.jwt
    const authorization = req.cookies.token;

    if (!authorization) {
      return res.redirect("/login");
    }
    // const token = authorization.slice(7, authorization.length);

    let verified = jwt.verify(authorization, jwtsecret);

    if (!verified) {
      return res.redirect("/login");
    }

    const { id } = verified as { [key: string]: string };

    //check if user exist
    const user = await UserInstance.findOne({ where: { id } });

    if (!user) {
      return res.redirect("/login");
    }
    req.user = verified;
    next();
    // }
  } catch (err) {
    console.log(err);
  }
}
