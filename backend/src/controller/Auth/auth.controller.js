const { v4: uuidv4 } = require("uuid");
const config = require("@config/index.config");
const jwt = require("jsonwebtoken");

exports.generateGuestID = async (_, res) => {
  const key = jwt.sign("", config.JWT_SECRET, {
    expiresIn: "24h",
    jwtid: uuidv4(),
  });

  return res.status(200).send({
    success: true,
    data: key,
  });
};
