
 import express from 'express';
import { postAddUser } from '../controller/userController.js';
import {postLogin} from '../controller/userController.js';

const router = express.Router();

router.post('/signup', postAddUser);

router.post('/login',postLogin);

export default router;