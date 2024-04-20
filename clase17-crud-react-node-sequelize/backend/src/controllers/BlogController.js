import BlogModel from "../models/BlogModel.js";

export class BlogController {
  static  async getBlogs (req, res){
    try {
      const blogs = await BlogModel.findAll();
      res.json(blogs);
    } catch (error) {
      res.json({message: error});
    }
  }
  
  static async getBlogById(req, res){
    const { id } = req.params
    try {
      const blog = await BlogModel.findByPk(id);
      res.json(blog);
    } catch (error) {
      console.log(error)
    }
  }

  static async createBlog(req, res) {
    const { title, content } = req.body;
    try {
      const blog = await BlogModel.create({
        title,
        content
      });
      res.json(blog);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateBlog(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const blog = await BlogModel.update({
        title,
        content
      }, {
        where: {
          id
        }
      });
      res.json(blog);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      const blog = await BlogModel.destroy({
        where: {
          id
        }
      });
      res.json(blog);
    } catch (error) {
      console.log(error);
    }
  }
}

