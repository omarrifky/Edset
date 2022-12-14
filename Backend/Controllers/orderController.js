const { authenticatedelivery, authenticateadmin, authenticatesupplier, authenticateuser } = require("../MiddleWare");
const { Order } = require("../Models/Order");
const { GlobalValues, OrderStatusEnums } = require("../utils");

router.post("/create", authenticateuser, (req, res) => {
    const { products } = req.body;
    if(!products || products.length === 0) {
        return res.status(400).send({
            err: "Order doesn't contain products!",
        });
    }

    const supplierDeliverFees = {};
    const productsMapping = products.map(productEl => {
        const  {
            product,
            supplier,
            quantity,
            priceatPurchase,
            dateOfPurchase,
        } = productEl;

        const deliveryFees = supplierDeliverFees[supplier] ? 0 : GlobalValues.DeliveryFees;
        if(!supplierDeliverFees[supplier]) supplierDeliverFees[supplier] = true;
        
        return {
            product,
            supplier,
            quantity,
            status: OrderStatusEnums.Pending,
            priceatPurchase,
            dateOfPurchase,
            estimatedTime: {
                days: 0,
                hours: 0,
                minutes: 0
            },
            delivery: null,
            deliveryFees,
        }
    });
    const price =  productsMapping.reduce((a, b) => {
        return ((a.quantity || 1) * a.priceatPurchase) 
        + ((b.quantity || 1) * b.priceatPurchase) 
        + a.deliveryFees + b.deliveryFees
    });
    const orderData = {
        price,
        user: req.user._id,
        products: productsMapping,
    }

    const order = new Order({ ...orderData });
    order
        .save()
        .then(() => {
            res.status(200).send(order);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });

});
router.post("/admin/create", authenticateadmin, (req, res) => {
    const { products, user } = req.body;

    if(!user) {
        return res.status(400).send({
            err: "Client not provided!",
        });
    } 
    if(!products || products.length === 0) {
        return res.status(400).send({
            err: "Order doesn't contain products!",
        });
    }

    const supplierDeliverFees = {};
    const productsMapping = products.map(productEl => {
        const  {
            status,
            product,
            delivery,
            quantity,
            supplier,
            deliveryFees,
            estimatedTime,
            dateOfPurchase,
            priceatPurchase,
        } = productEl;

        const deliveryFeesParse = supplierDeliverFees[supplier] ? 0 : GlobalValues.DeliveryFees;
        if(!supplierDeliverFees[supplier]) supplierDeliverFees[supplier] = true;
        
        return {
            product,
            supplier,
            quantity,
            status: status || OrderStatusEnums.Pending,
            priceatPurchase,
            dateOfPurchase,
            estimatedTime: estimatedTime || {
                days: 0,
                hours: 0,
                minutes: 0
            },
            delivery: delivery || null,
            deliveryFees: deliveryFees || deliveryFeesParse,
        }
    });

    const price =  productsMapping.reduce((a, b) => {
        return ((a.quantity || 1) * a.priceatPurchase) 
        + ((b.quantity || 1) * b.priceatPurchase) 
        + a.deliveryFees + b.deliveryFees
    });
    const orderData = {
        user,
        price,
        products: productsMapping,
    }

    const order = new Order({ ...orderData });
    order
        .save()
        .then(() => {
            res.status(200).send(order);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });

});

router.get("/admin/readOne/:orderId", authenticateadmin, (req, res) => {
    Order
        .findOne({
            _id: req.params.orderId
        })
        .then((order) => {
            res.status(200).send(order);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/customer/readOne/:orderId", authenticateuser, (req, res) => {
    Order
        .findOne({
            user: req.user._id,
            _id: req.params.orderId
        })
        .then((order) => {
            res.status(200).send(order);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/delivery/readOne/:orderId", authenticatedelivery, (req, res) => {
    Order
        .findOne({
            "products.delivery": req.delivery._id,
            _id: req.params.orderId
        })
        .then((order) => {
            res.status(200).send(order);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/supplier/readOne/:orderId", authenticatesupplier, (req, res) => {
    Order
        .findOne({
            "products.supplier": req.supplier._id,
            _id: req.params.orderId
        })
        .then((order) => {
            res.status(200).send(order);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/admin/readAll", authenticateadmin, (req, res) => {
    Order
        .find()
        .then((orders) => {
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/customer/readAll", authenticateuser, (req, res) => {
    Order
        .find({
            user: req.user._id
        })
        .then((orders) => {
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/delivery/readAll", authenticatedelivery, (req, res) => {
    Order
        .find({
            "products.delivery": req.delivery._id
        })
        .then((orders) => {
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.get("/supplier/readAll", authenticatesupplier, (req, res) => {
    Order
        .find({
            "products.supplier": req.supplier._id
        })
        .then((orders) => {
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.patch('/supplier/rejectAll/:orderId', authenticatesupplier, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products.supplier": req.supplier._id,
            "products.status": OrderStatusEnums.Pending
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Rejected
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});
router.patch('/supplier/rejectOne/:orderId', authenticatesupplier, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    if(!req.body.productId) {
        return res.status(400).send({
            err: "Product is required!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products._id": req.body.productId,
            "products.supplier": req.supplier._id,
            "products.status": OrderStatusEnums.Pending,
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Rejected
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});

router.patch('/supplier/prepareAll/:orderId', authenticatesupplier, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products.supplier": req.supplier._id,
            "products.status": OrderStatusEnums.Pending
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Preparing
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});
router.patch('/supplier/prepareOne/:orderId', authenticatesupplier, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    if(!req.body.productId) {
        return res.status(400).send({
            err: "Product is required!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products._id": req.body.productId,
            "products.supplier": req.supplier._id,
            "products.status": OrderStatusEnums.Pending,
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Preparing
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});

router.patch('/delivered/:orderId', authenticatedelivery, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products.delivery": req.delivery._id,
            "products.status": OrderStatusEnums.Preparing,
            
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Delivered,
                'products.$.deliveryEnd':req.body.deliveryEnd
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});
router.patch('/deliveringOne/:orderId', authenticatedelivery, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products.product": {$in:req.body.products},
            "products.status": OrderStatusEnums.Preparing
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Delivering,
                'products.$.estimatedTime': req.body.estimatedTime,
                'products.$.deliveryStart':req.body.deliveryStart
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});
router.patch('/deliveringAll/:orderId', authenticatedelivery, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            "products.status": OrderStatusEnums.Preparing
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Delivering,
                'products.$.estimatedTime': req.body.estimatedTime,
                'products.$.deliveryStart':req.body.deliveryStart
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});

router.patch('/cancelAll/:orderId', authenticateuser, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            user: req.user._id,
            "products.status": OrderStatusEnums.Pending
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Canceled
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});
router.patch('/cancelOne/:orderId', authenticateuser, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }
    if(!req.body.productId) {
        return res.status(400).send({
            err: "Product is required!",
        });
    }
    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId,
            user: req.user._id,
            "products._id": req.body.productId,
            "products.status": OrderStatusEnums.Pending
        }, 
        { 
            $set: {
                'products.$.status': OrderStatusEnums.Canceled
            }
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});

// so important & tricky
router.patch('/update/:orderId', authenticateadmin, (req, res) => {
    if(!req.params.orderId) {
        return res.status(400).send({
            err: "Please choose an order!",
        });
    }

    const orderId = req.params.orderId; 
    Order.findOneAndUpdate(
        { 
            _id: orderId
        }, 
        { 
            $set: req.body
        }, 
        { new: true }
    ).then(order => {
        if(!order) {
            return res.status(400).send({
                err: "Order not found!",
            });
        }
        res.status(200).send({ order })
    })
});
