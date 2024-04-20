import { BlogController } from "../controllers/BlogController.js";
import {Router} from "express";

export const BlogRouter = Router();
BlogRouter.get('/blogs', BlogController.getBlogs);
BlogRouter.get('/blogs/:id', BlogController.getBlogById);
BlogRouter.post('/blogs', BlogController.createBlog);
BlogRouter.put('/blogs/:id', BlogController.updateBlog);
BlogRouter.delete('/blogs/:id', BlogController.deleteBlog);


