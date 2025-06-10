const { getDbStatus, isHealthy } = require("@utils/dbHealthListener.utils");

exports.getDbHealth = (_, res) => {
  const dbDetailStatus = getDbStatus();
  const status = isHealthy();

  res.status(200).send({
    status: status ? "Healthy" : "Unhealthy",
    details: dbDetailStatus,
  });
};
