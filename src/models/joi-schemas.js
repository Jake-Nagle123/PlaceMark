import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

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