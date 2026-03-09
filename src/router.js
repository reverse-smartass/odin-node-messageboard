import { Router } from 'express';
const userRouter = Router();
import { getAllMessages, postNewMessage, formPage } from './controller.js';

userRouter.get("/", getAllMessages);

userRouter.get("/new", formPage);

userRouter.post("/new", postNewMessage);


export default userRouter;
