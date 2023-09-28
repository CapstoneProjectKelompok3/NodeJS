import Joi from "joi";

export default async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
            .trim()
            .optional(),
        username: Joi.string()
            .min(6)
            .max(16)
            .trim()
            .pattern(/^\S+$/, { name: 'username' })
            .messages({
                'string.pattern.name': 'username field cannot contain whitespace',
            })
            .optional(),
        nik: Joi.string()
            .pattern(new RegExp('^\\d{16}$'), {
                name: 'nik',
            })
            .optional(),
        fullname: Joi.string()
            .max(50)
            .trim()
            .optional(),
        phone: Joi.string()
            .pattern(new RegExp("^\\+[0-9]+$"))
            .optional(),
        gender: Joi.string()
            .valid('male', 'female')
            .optional(),
    });

    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
    } catch (err) {
        let errMessages = {};

        if (err.details) {
            err.details.map((value) => {
                errMessages[value.context.key] = value.message;
            });
        }

        return res.status(400).json({
            status_code: 400,
            result: 'bad request',
            message: errMessages,
        });
    }

    return next();
};
