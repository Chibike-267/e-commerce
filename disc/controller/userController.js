"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
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
const Register = async (req, res) => {
    try {
        const iduuid = (0, uuid_1.v4)();
        const { email, firstName, password, confirm_password, gender, phone, address, } = req.body;
        //validate with joi of zod
        const validateResult = utils_1.registerUserSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.render("Register", {
                error: validateResult.error.details[0].message,
            });
        }
        //Generate salt for password hash
        const passwordHash = await bcryptjs_1.default.hash(password, await bcryptjs_1.default.genSalt());
        //Check if user exist
        const user = await userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        if (!user) {
            const newuser = await userModel_1.UserInstance.create({
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
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    const iduuid = (0, uuid_1.v4)();
    const { email, password } = req.body;
    //validate with joi of zod
    const validateResult = utils_1.loginUserSchema.validate(req.body, utils_1.option);
    if (validateResult.error) {
        return res.render("login", {
            error: validateResult.error.details[0].message,
        });
    }
    //Get user details before generating token
    const User = (await userModel_1.UserInstance.findOne({
        where: { email: email },
    }));
    const { id } = User;
    const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    //compare the password you are using to login with the one in the db
    const validUser = await bcryptjs_1.default.compare(password, User.password);
    if (validUser) {
        return res.redirect('/');
    }
    return res.render("login", {
        error: 'Invalid email/password'
    });
};
exports.Login = Login;
const Logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};
exports.Logout = Logout;
