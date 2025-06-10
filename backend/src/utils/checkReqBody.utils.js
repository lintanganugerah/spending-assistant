function checkReqBody(body) {
  if (!body)
    throw Object.assign(new Error("Please send request body"), {
      status: 400,
      code: "ERR_BAD_REQUEST",
    });
  return body;
}

module.exports = checkReqBody;
