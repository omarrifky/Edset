const { authenticatedelivery, authenticateadmin } = require("../MiddleWare");
const { Delivery } = require("../Models/Delivery");

router.post("/login", (req, res) => { // If email or password fields are not entered return error
    if (!req.body.email) {
        return res.status(400).send({
            err: "email field is required !",
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            err: "password feild is required !",
        });
    }
    const deliveryData = {
        email: req.body.email,
        password: req.body.password,
    };

    Delivery.findByCredentials(deliveryData.email, deliveryData.password) // Checks the deliveryname and password of delivery
        .then((delivery) => {
            return delivery.generateAuthToken().then((token) => {
                // res.header("x-auth", token).status(200).send(delivery);
                res.status(200).send({ delivery: delivery, token: token });
            });
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});




router.post("/registerdelivery", authenticateadmin, (req, res) => {
  
    var newdelivery = new Delivery(); // create a new instance of the delivery model
    newdelivery.deliveryname = req.body.deliveryname;
    newdelivery.email = req.body.email;
    newdelivery.companyName = req.body.companyName;
    newdelivery.mobileNumber = req.body.mobileNumber;
    newdelivery.password = req.body.password;
    newdelivery.rating = 0;
    newdelivery.numberOfRatings = 0;
    newdelivery.blocked = false;
    newdelivery.taxNumber = req.body.taxNumber;
    newdelivery.officialDocuments = req.body.officialDocuments;
    newdelivery.cart = [];
    newdelivery.save().then(delivery => res.status(200).send(delivery))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})
router.post("/logout", authenticatedelivery, (req, res) => {
    req.delivery.removeToken(req.token).then(logoutres => res.status(200).send({ msg: "Delivery logged out successfully" })).catch((err) => {
        res.status(400).send({
            err: err.message ? err.message : err,
        });
    });
})

router.get('/alldelivery', function(req, res) {
    const query = req.query.query ? JSON.parse(req.query.query) : {};
    const filter = {
        $text: {
            $search: req.query.search
        },
        ...query
    };
    if (!req.query.search) delete filter.$text;

    Delivery.find(filter, function(err, Delivery) {
        if (err)
            res.send(err);
        res.json(Delivery);

    });
})


router.get('/viewdelivery/:delivery_id', (req, res) => {
    Delivery.findById(req.params.delivery_id).then(delivery => {
            if (!delivery) {
                throw { err: "No delivery with this id" }
            }
            res.status(200).send(delivery);

        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });;
})

router.patch('/updatemyinfo', authenticatedelivery, (req, res) => {
    Delivery.findOneAndUpdate({ _id: req.delivery._id }, { $set: req.body }, { new: true }).then(updateddelivery => res.status(200).send({ delivery: updateddelivery }))
})

router.patch('/ratedelivery/:delivery_id', authenticatedelivery, (req, res) => {
    Delivery.findOneAndUpdate({ _id: req.params.delivery_id }, { $inc: { rating: req.body.rating, numberOfRatings: 1 } }, { new: true }).then(updateddelivery => res.status(200).send({ updateddelivery: updateddelivery }))

})



router.patch('/blockdelivery/:delivery_id', authenticateadmin, (req, res) => {
    Delivery.findOneAndUpdate({ _id: req.params.delivery_id }, { $set: { blocked: true } }, { new: true }).then(updateddelivery => res.status(200).send({ updateddelivery: updateddelivery }))
})

router.patch('/unblockdelivery/:delivery_id', authenticateadmin, (req, res) => {
    Delivery.findOneAndUpdate({ _id: req.params.delivery_id }, { $set: { blocked: false } }, { new: true }).then(updateddelivery => res.status(200).send({ updateddelivery: updateddelivery }))
})