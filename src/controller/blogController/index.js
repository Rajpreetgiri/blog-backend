const Joi = require("joi");
const {
  createBlog,
  findAll,
  findBlog,
  findAndUpdateBlog,
  deleteBlog,
  blogCount,
} = require("../../services/blogService");
const { generateUniqueSlug } = require("../../services/commonService");


const blogController = {
  async create(req, res) {
    const { title, content, category, featured, status } = req.body;

    // requested data valid or not
    const blogCreateSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      category: Joi.string().required(),
      featured: Joi.boolean().required(),
      status: Joi.string().required()
    });

    const { error } = blogCreateSchema.validate({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      featured: req.body.featured,
      status: req.body.status
    });

    if (error) {
      return res.status(422).json({ success: false, message: error.message });
    }

    try {
      const blogExist = await findBlog({ title });

      if (blogExist) {
        return res
          .status(409)
          .json({ success: false, message: "Blog already exist" });
      }

      let data = {
        title,
        content,
        slug: generateUniqueSlug(title),
        category, 
        featured, 
        status
      };

      const result = await createBlog(data);

      if (!result) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      return res.status(201).json({
        success: true,
        data: result,
        message: "Blog created successfully!",
      });

    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  async find(req, res) {
    try {
      const blogs = await findAll(req.query);

      const total = await blogCount()

      return res.status(200).json({
        success: true,
        data: blogs,
        total
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  async findOne(req, res) {
    try {
      const data = await findBlog({ slug: req.params.slug });

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  async updateOne(req, res) {
    try {
      if (!req.params.slug) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const data = await findAndUpdateBlog(req.params.slug, req.body);

      return res.status(200).json({
        success: true,
        data,
        message: "Blog Updated successfully!",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  async delete(req, res, next) {
    try {
      const data = await deleteBlog(req.params.slug);

      return res.status(200).json({
        success: true,
        data,
        message: "Blog Deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = blogController;
