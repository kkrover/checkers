import joi from 'joi';

const schema = {
  from: { x: joi.number().required().min(0)
    .max(7),
          y: joi.number().required().min(0)
          .max(7),
        },
  to: { x: joi.number().required().min(0)
    .max(7),
        y: joi.number().required().min(0)
        .max(7),
        },
  playerId: joi.string().required().regex(/^[0-9a-f]{24}$/),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
