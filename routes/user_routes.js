import express from 'express';
import { login, logout, signup, updatUser, valid_user } from '../methods/user.js';
import { verifytoken } from '../auth/auth.js';




const routes = express.Router();
routes.put('/signup',signup)
routes.post('/login',login)
routes.get('/getauthuser',verifytoken,valid_user)
routes.post('/logout',verifytoken,logout)
routes.post('/updateuser/:id',verifytoken,updatUser)


export default routes;
