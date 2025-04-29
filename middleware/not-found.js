const notFound = (req, res) =>
  res.status(404).json({ error: "Route Not Found" });

module.exports = notFound;
