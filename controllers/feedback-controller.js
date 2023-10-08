import feedBackService from "../services/feedback/create-service.js";

export const userFeedback = async (req, res) => {
  try {
    await feedBackService(req);

    return res.status(200).json({
      status_code: 200,
      result: "success",
      message: "Feedback or Service Review Successfully Created",
    });
  } catch (error) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: error.message,
    });
  }
};
