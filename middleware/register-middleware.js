import Joi from "joi";

export default async (req, res, next) => {
  const validate = Joi.object({
    email: Joi.string().required().empty().email().trim(),
    username: Joi.string()
      .required()
      .empty()
      .min(6)
      .max(16)
      .trim()
      .pattern(/^\S+$/, { name: "username" })
      .messages({
        "string.pattern.name": "username field cannot contains whitespace",
      }),
    nik: Joi.string().required().empty().pattern(new RegExp("^\\d{16}$"), {
      name: "nik",
    }),
    password: Joi.string()
      .required()
      .empty()
      .min(5)
      .max(24)
      .trim()
      .pattern(/^\S+$/, { name: "password" })
      .messages({
        "string.pattern.name": "username field cannot contains whitespace",
      }),
    level: Joi.string().optional().valid("user", "admin", "superadmin"),
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
