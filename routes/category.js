const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Category = require('../models/Category');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/', function(req, res, next) {
    const { name,img } = req.body; 
    Category.findOne({ name: name })
        .then(existingCategory => {
            if (existingCategory) {
               
                res.status(400).json({ msg: 'Tên danh mục đã tồn tại' });
            } else {

                Category.create({ name: name, img:img })
                    .then(newCategory => {
                        res.status(201).json({ msg: 'Thêm danh mục thành công', category: newCategory });
                    })
                    .catch(err => {
                        console.error('Lỗi khi tạo danh mục mới:', err);
                        res.status(500).json({ msg: 'Thất bại khi thêm danh mục' });
                    });
            }
        })
        .catch(err => {
            console.error('Lỗi khi kiểm tra danh mục:', err);
            res.status(500).json({ msg: 'Thất bại khi kiểm tra danh mục' });
        });
});

router.get('/', function(req,res){
    Category.find()
    .then(categories => {
        res.json(categories)
    })
    .catch(err=>{
        res.status(500).json('that bai')
    })
});
module.exports = router;
