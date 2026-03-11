import { Router } from 'express';
const userRouter = Router();
import { getAllItemsAndCategories, postNewMessage, formPage, deleteItem } from './controller.js';

userRouter.get("/", getAllItemsAndCategories);

userRouter.get("/new", formPage);

userRouter.post("/new", postNewMessage);

userRouter.delete("/delete/:id", deleteItem)

export default userRouter;
