const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Find all categories, including its associated Products 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find one category by its `id` value, including its associated Products 
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new Category  
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  //Calls the update method on the Category model
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      // Gets a category based on the category id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//Delete a category by its 'id' value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.status(200).json(deletedCategory);
    })
    .catch((err) => res.json(err));
});


module.exports = router;
