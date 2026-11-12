
exports.api = function(req, res) {
  res.json([
    {
      resource: "products",
      verbs: ["GET", "POST", "PUT", "DELETE"]
    }
  ]);
};
