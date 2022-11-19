import { Supplier } from "./Models/Supplier";
import { User } from "./Models/User";
import { Delivery } from "./Models/Delivery";

export const authenticateuser = (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];

    User.findByToken(token)
        .then((user) => {
            if (!user) {
                throw {
                    message: "No user with this id !",
                };
            }
            req.user = user;
            req.token = token;
            next(); // to execute the coming instruction
        })
        .catch((err) => {
            res.status(401).send({
                err: err.message ? err.message : err,
            });
        });
};

export const authenticateadmin = (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];

    User.findByToken(token)
        .then((user) => {
            if (!user) {
                throw {
                    message: "No admin with this id !",
                };
            }

            if (!user.admin && user.employeeLevel != "Admin") {
                throw {
                    message: "Access Denied, Not an admin!",
                };
            }
            req.user = user;
            req.token = token;
            next(); // to execute the coming instruction
        })
        .catch((err) => {
            res.status(401).send({
                err: err.message ? err.message : err,
            });
        });
};


export const authenticatesupplier = (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log("In Supplier Auth")
    Supplier.findByToken(token)
        .then((supplier) => {
            if (!supplier) {
                throw {
                    message: "No Supplier with this id !",
                };
            }
            req.supplier = supplier;
            req.token = token;
            next(); // to execute the coming instruction
        })
        .catch((err) => {
            res.status(401).send({
                err: err.message ? err.message : err,
            });
        });
};


export const authenticatedelivery = (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log("IN AUTH")
    Delivery.findByToken(token)
        .then((delivery) => {
            if (!delivery) {
                throw {
                    message: "No Delivery with this id !",
                };
            }
            req.delivery = delivery;
            req.token = token;
            next(); // to execute the coming instruction
        })
        .catch((err) => {
            res.status(401).send({
                err: err.message ? err.message : err,
            });
        });
};
