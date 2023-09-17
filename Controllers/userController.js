import { response, Router } from "express";
import { authenticateadmin, authenticateuser } from "../MiddleWare";
import { User } from "../Models/User";

const router = Router();

router.post("/login", (req, res) => {
  // If email or password fields are not entered return error
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
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  User.findByCredentials(userData.email, userData.password) // Checks the username and password of user
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        // res.header("x-auth", token).status(200).send(user);
        res.status(200).send({ user: user, token: token });
      });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/getusers", function (req, res) {
  const query = req.query.query ? JSON.parse(req.query.query) : {};
  const filter = {
    $text: {
      $search: req.query.search,
    },
    ...query,
  };
  if (!req.query.search) delete filter.$text;

  User.find(filter, function (err, User) {
    if (err) res.send(err);
    res.json(User);
  });
});

router.post("/registerUser", (req, res) => {
  var newuser = new User(); // create a new instance of the User model
  newuser.username = req.body.username;
  newuser.prefrences = req.body.prefrences;
  newuser.email = req.body.email;
  newuser.mobileNumber = req.body.mobileNumber;
  newuser.dateOfBirth = req.body.dateOfBirth;
  newuser.firstname = req.body.firstname;
  newuser.lastname = req.body.lastname;
  newuser.password = req.body.password;
  newuser.university = req.body.university;
  newuser.faculty = req.body.faculty;
  newuser.wallet = 0;
  newuser.rating = 0;
  newuser.numberOfRatings = 0;
  newuser.admin = false;
  newuser.blocked = false;
  newuser.isremoved = false;
  newuser.addresses = req.body.address;
  newuser.imageURL = req.body.imageURL;
  newuser.cart = [];

  newuser
    .save()
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        // res.header("x-auth", token).status(200).send(user);
        res.status(200).send({ user: user, token: token });
      });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.post("/logout", authenticateuser, (req, res) => {
  req.user
    .removeToken(req.token)
    .then((logoutres) =>
      res.status(200).send({ msg: "User logged out successfully" })
    )
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/allusers", authenticateadmin, function (req, res) {
  const query = req.query.query ? JSON.parse(req.query.query) : {};
  const filter = {
    $text: {
      $search: req.query.search,
    },
    ...query,
  };
  if (!req.query.search) delete filter.$text;

  User.find(filter, function (err, User) {
    if (err) res.send(err);
    res.json(User);
  });
});

router.get("/viewuser/:user_id", authenticateadmin, (req, res) => {
  User.findById(req.params.user_id)
    .then((user) => {
      if (!user) {
        throw { err: "No user with this id" };
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/viewmyinfo", authenticateuser, (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw { err: "No user with this id" };
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/favorites", authenticateuser, (req, res) => {
  User.findById(req.user._id)
    .select("favorites")
    .populate({
      path: "favorites",
      model: "Product",
    })
    .then((user) => {
      if (!user) {
        throw { err: "No user with this id" };
      }
      res.status(200).send({ favorites: user.favorites || [] });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});
router.get("/getCart", authenticateuser, (req, res) => {
  User.findById(req.user._id)
    .select("cart")
    .populate({
      path: "cart.product",
      model: "Product",
      select: '_id quantity productName price photoLinks'
    })
    .then((user) => {
      if (!user) {
        throw { err: "No user with this id" };
      }

      const cart = (user.cart || []).map((el) => ({
        ...el._doc,
        product: el._doc.product._id,
        productPrice: el._doc.product.price,
        productName: el._doc.product.productName,
        productQuantity: el._doc.product.quantity,
        productLogo: el._doc.product.photoLinks && el._doc.product.photoLinks.length > 0 ? 
          el._doc.product.photoLinks[0] : el.productLogo,
      })) || []

      res.status(200).send({ cart });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.patch("/updatemyinfo", authenticateuser, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true }
  ).then((updateduser) => res.status(200).send({ user: updateduser }));
});

router.patch("/updateAddress", authenticateuser, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        addresses: {
          ...req.body,
        },
      },
    },
    { new: true }
  ).then((updateduser) => res.status(200).send({ user: updateduser }));
});

router.patch("/addtocart", authenticateuser, (req, res) => {
  if (
    !req.user.cart
      .map((element) => element.product)
      .includes(req.body.productid)
  ) {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            product: req.body.productid,
            quantity: req.body.quantity,
            supplier: req.body.supplier,
            productName: req.body.name,
            productPrice: req.body.price,
            productLogo: req.body.logo,
          },
        },
      },
      { new: true }
    ).then((updatedcart) => res.status(200).send({ user: updatedcart }));
  } else {
    User.findOneAndUpdate(
      { _id: req.user._id, "cart.product": req.body.productid },
      { $inc: { "cart.$.quantity": req.body.quantity } },
      { new: true }
    ).then((updatedcart) => res.status(200).send({ user: updatedcart }));
  }
  console.log(req.user.cart);
});

router.patch("/removefromcart", authenticateuser, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { _id: req.body.product_id } } },
    { new: true }
  ).then((updatedcart) => res.status(200).send({ user: updatedcart }));
});

router.patch("/clearcart", authenticateuser, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { cart: [] } },
    { new: true }
  ).then((updatedcart) => res.status(200).send({ user: updatedcart }));
});

router.patch("/rateuser/:user_id", authenticateuser, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $inc: { rating: req.body.rating, numberOfRatings: 1 } },
    { new: true }
  ).then((updateduser) => res.status(200).send({ updateduser: updateduser }));
});

router.patch("/setuserwallet/:user_id", authenticateadmin, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $inc: { wallet: req.body.wallet } },
    { new: true }
  ).then((updateduser) => res.status(200).send({ updateduser: updateduser }));
});

router.patch("/blockuser/:user_id", authenticateadmin, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $set: { blocked: true } },
    { new: true }
  ).then((updateduser) => res.status(200).send({ updateduser: updateduser }));
});

router.patch("/unblockuser/:user_id", authenticateadmin, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $set: { blocked: false } },
    { new: true }
  ).then((updateduser) => res.status(200).send({ updateduser: updateduser }));
});

router.patch("/removeuser/:user_id", authenticateadmin, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $set: { isremoved: true } },
    { new: true }
  ).then((updateduser) => res.status(200).send({ updateduser: updateduser }));
});

router.patch("/removeme/:user_id", authenticateuser, (req, res) => {
  // lesaaa
  User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $set: { isremoved: true } },
    { new: true }
  ).then((updateduser) => res.status(200).send({ updateduser: updateduser }));
});

export const userController = router;
