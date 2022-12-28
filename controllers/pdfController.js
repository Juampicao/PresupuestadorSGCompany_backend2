const createPdf = async (req, res) => {
  console.log(req.body);

  res.json({ msg: "desde createPdf" });
};

export { createPdf };
