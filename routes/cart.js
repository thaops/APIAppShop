const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ProductsInCart = require('../models/Cart');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/add', function(req, res){
    const { name, img, quantity,gia } = req.body;

    ProductsInCart.findOne({ name: name, img: img,quantity:quantity,gia:gia })
        .then(existingProduct => {
            if (existingProduct) {
                existingProduct.quantity += quantity;
                return existingProduct.save();
            } else {
                const newProductInCart = new ProductsInCart({
                    name: name,
                    img: img,
                    quantity: quantity,
                    gia:gia,
                });
                return newProductInCart.save();
            }
        })
        .then(savedProductInCart => {
            const statusCode = savedProductInCart ? 200 : 201;
            res.status(statusCode).json({code:1,msg:"thêm thanh công"});
        })
        .catch(error => {
            res.status(400).json({ message: error.message });
        });
});

//xoa 1
router.delete('/delete/:_id', function(req, res, next){
    ProductsInCart.deleteOne({_id: req.params._id})
    .then(data=>{
     res.json({code:1,msg:'xóa thanh công'})
    })
    .catch(err=>{
     res.status(500).json({msg:'xóa thất bại'})
    })
  });

  router.get('/', function(req,res){

    ProductsInCart.find()
    .then(ProductsInCart => {
      
        res.json(ProductsInCart)
    })
    .catch(err=>{
        res.status(500).json({msg:'that bai '})
    })
  });

 
router.delete('/delete-all', function(req, res){
    ProductsInCart.deleteMany({})
        .then(result => {
            res.json({ code: 1, msg: 'Xóa tất cả sản phẩm thành công' });
        })
        .catch(err => {
            res.status(500).json({ msg: 'Xóa tất cả sản phẩm thất bại' });
        });
});
module.exports = router;