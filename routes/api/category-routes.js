const router = require('express').Router();
const {
    Category,
    Product
} = require('../../models');
const {
    findAll
} = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    Category.findAll(
            // be sure to include its associated Products
            {
                include: [Product]
            }
        )
        .then((categoryInfo) => {
            res.json(categoryInfo)
        })
        .catch(err => {
            res.json(err)
        })


});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    console.log(req.params.id)
    Category.findOne({
            where: {
                id: req.params.id
            },
            // be sure to include its associated Products
            include: [Product]
        })
        .then((categoryInfo) => {
            res.json(categoryInfo)
        })
        .catch(err => {
            res.json(err)
        })
});

router.post('/', (req, res) => {
    // create a new category
    Category.create(
            req.body
        )
        .then((categoryInfo) => {
            res.json(categoryInfo)
        })
        .catch(err => {
            res.json(err)
        })
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }
        )
        .then((categoryInfo) => {
            res.json(categoryInfo)
        })
        .catch(err => {
            res.json(err)
        })
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(categoryInfo => {
        if(!categoryInfo) {
            res.status(404).json({
                message: 'No post found with this id' 
            });
            return;
        }
        res.json(categoryInfo);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;