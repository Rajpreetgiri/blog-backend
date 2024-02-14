const mongoose = require('mongoose');
const { generateUniqueSlug } = require('../services/commonService');

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String },
        slug: { type: String },
        status: { type: String },
        category:{ type: String },
        content: { type: String },
        featured: {type: Boolean}
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to generate a slug
BlogSchema.pre('save', function (next) {
    // Only generate a new slug if the title has been modified or the document is new
    if (this.isModified('title') || !this.slug) {
        this.slug = generateUniqueSlug(this.title ?? "");
    }
    next();
});

const BlogModel = mongoose.model('Blog', BlogSchema, 'blogs');

module.exports = BlogModel