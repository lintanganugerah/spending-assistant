const {
  checkGuestValid,
} = require("@database/redis/handler/guestRedis.handler");

exports.identifyUser = async (req, res, next) => {
  const jwt = req.headers["Authorization"];
  const keid = req.headers["x-identifier-keid"];
  const identity = { role: null, id: null };

  // if request attached authorization then it is an authenticated user
  if (jwt) {
    try {
      identity.role = "authenticated"; //Just Set the role because ID will be set in next JWT Middleware
      req.identity = identity;
      return next();
    } catch (e) {
      return res.status(401).json({ error: "Invalid JWT" });
    }
  }

  if (keid) {
    const valid = await checkGuestValid(keid);
    if (!valid) {
      return res
        .status(401)
        .send({ success: false, message: "You Are Not A Valid User" });
    }
    identity.role = "guest";
    identity.id = keid;
    req.identity = identity;
    return next();
  }

  return res
    .status(401)
    .send({ success: false, message: "You Are Not A Valid User" });
};
