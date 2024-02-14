const slugify = require('slugify');


// Function to generate a unique slug
const generateUniqueSlug = (title) => {
    return slugify(title, { lower: true });
}

module.exports = {
    generateUniqueSlug
}