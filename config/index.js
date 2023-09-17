const secretOrPrivateKey =
  `${process.env.NODE_ENV}` === "production"
    ? process.env.JWT_SECRET
    : "secretOrPrivateKey";

    module.exports = { secretOrPrivateKey };