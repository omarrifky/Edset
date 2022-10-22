import { Router } from "express";
import { authenticatesupplier } from "../MiddleWare";
import { Product } from "../Models/Product";
const router = Router();

router.post("/getallProducts", (req, res) => { // Gets all products
    const { queryBody, search, page, sort, limit } = req.body;
    const skip = limit * (page - 1);
    if (search) queryBody.$text = { $search: search };
    Product.find({ isremoved: false, ...queryBody })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .then(async(products) => {
            const count = await Product.countDocuments({ isremoved: false, ...queryBody })
                .sort(sort);
            const pages = Math.ceil(count / limit);
            res.status(200).send({ products, pages, count });
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.post("/createProduct", authenticatesupplier, (req, res) => {

    var newproduct = new Product(); // create a new instance of the Product model
    newproduct.productName = req.body.productName;
    newproduct.description = req.body.description;
    newproduct.photoLinks = req.body.photoLinks;
    newproduct.price = req.body.price;
    newproduct.percentageDiscount = req.body.percentageDiscount;
    newproduct.rating = req.body.rating;
    newproduct.supplier = req.supplier._id;
    newproduct.quantity = req.body.quantity;
    newproduct.category = req.body.category;
    newproduct.Subcategory = req.body.Subcategory;
    newproduct.save().then(product => {
            res.status(200).send({ product: newproduct });
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})


router.get("/viewmyproducts", authenticatesupplier, (req, res) => {
    console.log(req.supplier._id)
    Product.find({ supplier: req.supplier._id, isremoved: false }).then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})



router.get('/viewproduct/:product_id', (req, res) => {
    Product.findById(req.params.product_id).then(product => {
            if (!product) {
                throw { err: "No product with this id" }
            }
            res.status(200).send(product);

        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });;
})
router.patch("/editmyproduct/:productid", authenticatesupplier, (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productid, supplier: req.supplier._id }, { $set: req.body }, { new: true }).then(updatedproduct => res.status(200).send({ updatedproduct: updatedproduct }))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });

})

router.patch("/decreaseproductsquantity", authenticatesupplier, (req, res) => {
    const products = []
    const promise = new Promise((resolve, reject) => {
        console.log(req.body.products)
        req.body.products.forEach((product, index) => {
            Product.findOneAndUpdate({ _id: product.product }, { $inc: { quantity: product.quantity } }, { new: true }).then(res => {
                if (index == req.body.products.length - 1) {
                    resolve()
                }
            }).catch(err => {
                reject(err)
            })
        })
    })

    promise.then(promiseres => {
        res.status(200).send({
            products
        })
    }).catch((err) => {
        res.status(400).send({
            err: err.message ? err.message : err,
        });
    });

})

router.patch('/removeproduct/:productid', authenticatesupplier, (req, res) => {

    Product.findOneAndUpdate({ _id: req.params.productid }, { $set: { isremoved: true } }, { new: true }).then(updatedproduct => res.status(200).send({ updatedproduct: updatedproduct }))
})



export const productController = router;