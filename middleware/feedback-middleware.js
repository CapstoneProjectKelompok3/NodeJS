export const createFeedBackValidation = async (req, res, next) => {
  const { rating } = req.body;

  if (isNaN(Number(rating))) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "Rating must be a numeric value.",
    });
  } else if (Number(rating) < 1) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "Minimum rating must be at least 1.",
    });
  } else if (Number(rating) > 5) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "Maximum rating allowed is 5",
    });
  }
  return next();
};
