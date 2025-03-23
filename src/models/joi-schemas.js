import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Kevin").required(),
    lastName: Joi.string().example("Malone").required(),
    email: Joi.string().email().example("kevin@malone.com").required(),
    password: Joi.string().example("office").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const StadiumSpec = {
  stadium: Joi.string().required(),
  competition: Joi.string().required(),
  rating: Joi.number().allow("").optional(),
  city: Joi.string().required(),
  latitude: Joi.number().allow("").optional(),
  longitude: Joi.number().allow("").optional(),
};

export const EventSpec = {
  title: Joi.string().required(),
};