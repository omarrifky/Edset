import { Router } from "express";
import { authenticateadmin, authenticatesupplier } from "../MiddleWare";
import { Supplier } from "../Models/Supplier";

const router = Router();

router.post("/login", (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      err: "email feild is required !",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      err: "password feild is required !",
    });
  }
  const supplierData = {
    email: req.body.email,
    password: req.body.password,
  };

  Supplier.findByCredentials(supplierData.email, supplierData.password)
    .then((supplier) => {
      return supplier.generateAuthToken().then((token) => {
        res.status(200).send({ supplier, token });
      });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.post("/logout", authenticatesupplier, (req, res) => {
  Supplier.removeToken(req.token)
    .then((supplier) => {
      res.status(200).send({ err: "Logged ot successfully !" });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/admin/readAll", authenticateadmin, async (req, res) => {
  Supplier.find()
    .then((suppliers) => {
      res.status(200).send(suppliers);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/readAll", async (req, res) => {
  const exclude =
    "-username -password -blocked -taxNumber -officialDocuments -tokens";
  const { queryBody, search, page, sort, limit } = req.body;
  const skip = limit * (page - 1);
  if (search) queryBody.$text = { $search: search };
  Supplier.find({ ...queryBody })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "supplier",
      model: "Supplier",
      select: "companyName rating _id",
    })
    .then(async (suppliers) => {
      const count = await Supplier.countDocuments({
        isremoved: false,
        ...queryBody,
      }).sort(sort);
      const pages = Math.ceil(count / limit);
      res.status(200).send({ suppliers, pages, count });
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get("/readOne/:supplierId", async (req, res) => {
  if (!req.params.supplierId) {
    return res.status(400).send({
      err: "Supplier id should be provided!",
    });
  }

  const exclude =
    "-username -password -blocked -taxNumber -officialDocuments -tokens";
  Supplier.findOne({
    _id: req.params.supplierId,
    blocked: false,
  })
    .select(exclude)
    .then((supplier) => {
      if (!supplier) {
        res.status(400).send({
          err: "No supplier found!",
        });
      }
      res.status(200).send(supplier);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.get(
  "/admin/readOne/:supplierId",
  authenticateadmin,
  async (req, res) => {
    if (!req.params.supplierId) {
      return res.status(400).send({
        err: "Supplier id should be provided!",
      });
    }
    Supplier.findOne({
      _id: req.params.supplierId,
    })
      .then((supplier) => {
        if (!supplier) {
          res.status(400).send({
            err: "No supplier found!",
          });
        }
        res.status(200).send(supplier);
      })
      .catch((err) => {
        res.status(400).send({
          err: err.message ? err.message : err,
        });
      });
  }
);

router.get("/me", authenticatesupplier, async (req, res) => {
  Supplier.findOne({
    _id: req.supplier._id,
  })
    .then((supplier) => {
      if (!supplier) {
        res.status(400).send({
          err: "No supplier found!",
        });
      }
      res.status(200).send(supplier);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.post("/create", authenticateadmin, async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      err: "email feild is required !",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      err: "password feild is required !",
    });
  }
  if (!req.body.username) {
    return res.status(400).send({
      err: "username feild is required !",
    });
  }
  if (!req.body.address) {
    return res.status(400).send({
      err: "address feild is required !",
    });
  }
  if (!req.body.companyName) {
    return res.status(400).send({
      err: "company name feild is required !",
    });
  }
  if (!req.body.mobileNumbers) {
    return res.status(400).send({
      err: "mobile numbers feild is required !",
    });
  }

  const supplierData = {
    rating: 5,
    blocked: false,
    numberOfRatings: 0,
    email: req.body.email,
    imageURL: req.body.imageURL,
    password: req.body.password,
    username: req.body.username,
    address: req.body.address,
    taxNumber: req.body.taxNumber,
    companyName: req.body.companyName,
    mobileNumbers: req.body.mobileNumbers || [],
    officialDocuments: req.body.officialDocuments || "",
  };

  const supplier = new Supplier({ ...supplierData });
  supplier
    .save()
    .then(() => {
      res.status(200).send(supplier);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

router.patch(
  "/admin/update/:supplierId",
  authenticateadmin,
  async (req, res) => {
    if (!req.params.supplierId) {
      return res.status(400).send({
        err: "Admin should provide supplier id!",
      });
    }

    Supplier.findOneAndUpdate(
      {
        _id: req.params.supplierId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
      .then((supplier) => {
        if (!supplier) {
          res.status(400).send({
            err: "No supplier found!",
          });
        }
        res.status(200).send(supplier);
      })
      .catch((err) => {
        res.status(400).send({
          err: err.message ? err.message : err,
        });
      });
  }
);

router.patch("/update", authenticatesupplier, async (req, res) => {
  Supplier.findOneAndUpdate(
    {
      _id: req.supplier._id,
      blocked: false,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    }
  )
    .then((supplier) => {
      if (!supplier) {
        res.status(400).send({
          err: "No supplier found!",
        });
      }
      res.status(200).send(supplier);
    })
    .catch((err) => {
      res.status(400).send({
        err: err.message ? err.message : err,
      });
    });
});

export const supplierController = router;
