var express = require('express');
var Flower = require('../models/Flower');
var router = express.Router();

router.get('/', function (req, res) {
    Flower.find({}, function (err, flowers) {
        if (err) return res.status(500).json({error: err});
        res.json(flowers);
    });
});C:\Users\Luz_9\Desktop\DESKTOP VECIO\Lezioni e varie\Web back end\esameGabrieleSammartino
router.get('/:id', function (req, res) {
    Flower.find({_id: req.params.id}, function (err, flowers) {
        if (err) return res.status(500).json({message: 'flower not found'});
        res.json(flowers);
    });
});
router.post('/', function (req, res) {
    var newFlower = Flower(req.body);
    newFlower.save(function () {
        res.status(201).json(newFlower);
    })
});
router.put('/:id', function (req, res) {
    Flower.findOne({_id: req.params.id}).exec(function (err, Flower) {
        if (err) return res.status(500).json({message: 'flower not found'});
        if (!Flower) return res.status(404).json({message: 'flower not found'});
        for (key in req.body) {
            Flower[key] = req.body[key];
        }
        Flower.save(function (err) {
            if (err) return res.status(500).json({message: 'cant save the flower'});
            res.json(Flower);
        })
    });
});

router.delete('/:id', function (req, res) {
    Flower.remove({_id: req.params.id}, function (err) {
        if (err) return response.status(500).json({message: 'flower not found'});
        res.json({message: 'flower deleted'})
    })
});

module.exports = router;

