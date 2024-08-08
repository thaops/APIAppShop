const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Product = require('../models/Product');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/add', function(req, res, next) {
    const productData = req.body; 
    const product = new Product(productData); // Sử dụng Product thay vì ProductNew
    product.save() // Lưu đối tượng sản phẩm vào cơ sở dữ liệu
     .then(data=>{
      res.json({msg:'Thêm sản phẩm thành công'});
     })
     .catch(err=>{
      console.error('Lỗi khi thêm sản phẩm:', err);
      res.status(500).json({msg:'Thêm sản phẩm thất bại'});
     });
});

router.get('/', function(req,res){

    Product.find()
    .then(product => {
      
        res.json(product)
    })
    .catch(err=>{
        res.status(500).json({msg:'that bai '})
    })
  });


  router.get('/:_idCate?', function(req, res){
    const id = req.params._idCate; 
    let query = {}; 
    if (id) {
        query = {
            $or: [
                { categoryId: id },
                { parentId: id }
            ]
        };
    }
    Product.find(query) 
    .then(data =>{
        res.json(data); 
    })
    .catch(err=>{
        res.status(400).json({message: err.message}); 
    });
});

router.get('/detail/:productId', function(req, res) {
  const productId = req.params.productId; 
  Product.findById(productId)
  .then(product => {
      if (!product) {
          return res.status(404).json({msg: 'Sản phẩm không tồn tại'});
      }
      res.json(product); 
  })
  .catch(err => {
      res.status(500).json({msg: 'Lỗi server khi lấy chi tiết sản phẩm'});
  });
});


  //tim
  router.post('/search', function(req, res){
    const name = req.body.name;
  
    if (name) {
      Product.find({ name: { $regex: name, $options: 'i' } })
        .then(products => {
          res.json(products);
        })
        .catch(err => {
          res.status(500).json({ msg: 'Thất bại trong việc tìm kiếm theo ten.' });
        });
    } else {
      
      res.status(400).json({ msg: 'Ten không được tìm thấy trong dữ liệu yêu cầu.' });
    }
  });
module.exports = router;
