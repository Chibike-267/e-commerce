import express from 'express';
import {Register, Login, Logout} from '../controller/userController'
const router = express.Router();

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);

export default router;
