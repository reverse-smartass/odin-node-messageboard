import { Router } from 'express';
const userRouter = Router();
import { getAllMessages, postNewMessage, formPage, deleteMessage } from './controller.js';

userRouter.get("/", getAllMessages);

userRouter.get("/new", formPage);

userRouter.post("/new", postNewMessage);

userRouter.delete("/delete/:id", deleteMessage)


export default userRouter;
