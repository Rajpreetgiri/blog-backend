const BlogModel = require("../model/BlogSchema");

async function createBlog(input) {
  try {
    return await BlogModel.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

async function findBlog(query) {
  return await BlogModel.findOne(query).lean();
}

async function findAll(query) {
  const { sort = "desc" ,column = "createdAt", page = 1, limit = 10, q = "" } = query;
  const skip = (page - 1) * limit;
  const titleRegex = new RegExp(q, 'i');
  return await BlogModel.find({ title: titleRegex }).sort({[column]: sort}).skip(skip).limit(limit);
}

async function blogCount() {
  return await BlogModel.find().countDocuments();
}

async function findAndUpdateBlog(slug, updatedData) {
  try {
    return await BlogModel.findOneAndUpdate({ $and: [{ slug }] }, { $set: updatedData }, { new: true });
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteBlog(slug) {
  try {
    return await BlogModel.deleteOne({ $and: [{ slug }] });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createBlog,
  findAll,
  findBlog,
  findAndUpdateBlog,
  deleteBlog,
  blogCount
};
