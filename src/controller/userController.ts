import { Request, Response } from "express";
import { registerUserSchema, option, loginUserSchema } from "../utils/utils";
import { UserInstance } from "../model/userModel";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET as string;

//   ANY OTHER FRAMEWORK
// export const Register = async (req: Request, res: Response) => {
//   try {
//     const iduuid = uuidv4();
//     const {
//       email,
//       firstName,
//       password,
//       confirm_password,
//       gender,
//       phone,
//       address,
//     } = req.body;

//     //validate with joi of zod
//     const validateResult = registerUserSchema.validate(req.body, option);

//     if (validateResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validateResult.error.details[0].message });
//     }

//     //Generate salt for password hash
//     const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

//     //Check if user exist
//     const user = await UserInstance.findOne({
//       where: { email: email },
//     });
//     if (!user) {
//       const newuser = await UserInstance.create({
//         id: iduuid,
//         email,
//         firstName,
//         password: passwordHash,
//         gender,
//         phone,
//         address,
//       });
//       return res.status(201).json({ msg: "Registration successful", newuser });
//     }
//     return res.status(201).json({ error: "Email already exist" });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const Login = async (req: Request, res: Response) => {
//   const iduuid = uuidv4();
//   const { email, password } = req.body;

//   //validate with joi of zod
//   const validateResult = loginUserSchema.validate(req.body, option);

//   if (validateResult.error) {
//     return res
//       .status(400)
//       .json({ Error: validateResult.error.details[0].message });
//   }

//   //Get user details before generating token
//   const User = (await UserInstance.findOne({
//     where: { email: email },
//   })) as unknown as { [key: string]: string };
//   const { id } = User;

//   const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });

//   //compare the password you are using to login with the one in the db
//   const validUser = await bcrypt.compare(password, User.password);
//   if (validUser) {
//     return res.status(201).json({
//       msg: "Login successful",
//       User,
//       token,
//     });
//   }
//   return res.status(400).json({
//     error: "Invalid email/password",
//   });
// };

/**---------------EJS------------------ */
export const Register = async (req: Request, res: Response) => {
  try {
    const iduuid = uuidv4();
    const {
      email,
      firstName,
      password,
      confirm_password,
      gender,
      phone,
      address,
    } = req.body;

    //validate with joi of zod
    const validateResult = registerUserSchema.validate(req.body, option);

    if (validateResult.error) {
      return res.render("Register", {
        error: validateResult.error.details[0].message,
      });
    }

    //Generate salt for password hash
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

    //Check if user exist
    const user = await UserInstance.findOne({
      where: { email: email },
    });
    if (!user) {
      const newuser = await UserInstance.create({
        id: iduuid,
        email,
        firstName,
        password: passwordHash,
        gender,
        phone,
        address,
      });
      return res.redirect("/login");
    }
    //     return res.status(201).json({ error: "Email already exist" });
    res.render("Register", { error: "Email already exist" });
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req: Request, res: Response) => {
  const iduuid = uuidv4();
  const { email, password } = req.body;

  //validate with joi of zod
  const validateResult = loginUserSchema.validate(req.body, option);

  if (validateResult.error) {
    return res.render("login", {
      error: validateResult.error.details[0].message,
    });
  }

  //Get user details before generating token
  const User = (await UserInstance.findOne({
    where: { email: email },
  })) as unknown as { [key: string]: string };
  const { id } = User;

  const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });

  res.cookie('token',token, {httpOnly: true, maxAge:30 * 24 * 60 * 60 * 1000 });

  //compare the password you are using to login with the one in the db
  const validUser = await bcrypt.compare(password, User.password);
  if (validUser) {
    return res.redirect('/')
  }
  return res.render("login", {
        error: 'Invalid email/password'
      });
};

export const Logout = async (req: Request, res: Response) => {
res.clearCookie("token")
 res.redirect("/login")
}