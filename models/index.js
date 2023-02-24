// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Category have many Product
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Product belongToMany Tag (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "tag_id",
});

// Tag belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "product_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
