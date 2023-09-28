import Joi from "joi";

export const loginValidation = async (req, res, next) => {
  const validate = Joi.object({
    email: Joi.string().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
    }),
  });

  try {
    await validate.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    let errMessages = {};

    err.details.map((value) => {
      errMessages[value.context.key] = value.message;
    });

    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: errMessages,
    });
  }
  return next();
};
