import Joi from "joi";

export default async (req, res, next) => {
    const schema = Joi.object({
        currentPass: Joi.string()
            .required(),
        newPass: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/),
        repeatPass: Joi.ref('newPass'),
        })
        .with('newPass', 'repeatPass');;

    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
    } catch (err) {
        let errMessages = {};

        if (err.details) {
            err.details.map((value) => {
                if (value.context.key === 'newPass') {
                    errMessages[value.context.key] = 'New password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character';
                } else {
                    errMessages[value.context.key] = value.message;
                }
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
