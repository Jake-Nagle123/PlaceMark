import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
.keys({
  email: Joi.string().email().example("kevin@malone.com").required(),
  password: Joi.string().example("office").required(),
})
.label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Kevin").required(),
    lastName: Joi.string().example("Malone").required(),
  }).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus")

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const StadiumSpec = Joi.object()
.keys({
  stadium: Joi.string().required().example("Gtech Community Stadium"),
  competition: Joi.string().required().example("Premier League"),
  rating: Joi.number().allow("").optional().example(8.2),
  city: Joi.string().required().example("London"),
  latitude: Joi.number().allow("").optional().example(51.49),
  longitude: Joi.number().allow("").optional().example(-0.29),
  eventid: IdSpec,
})
.label("Stadium");

export const StadiumSpecPlus = StadiumSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("StadiumPlus");

export const StadiumArraySpec = Joi.array().items(StadiumSpecPlus).label("StadiumArray");

export const reviewSpec = Joi.object()
.keys({
  reviewText: Joi.string().required.example("Great visit to Wembley Stadium"),
  eventid: IdSpec,
})
.label("Review");

export const EventSpec = Joi.object()
 .keys({
  title: Joi.string().required().example("Best Games"),
  userid: IdSpec,
  stadiums: StadiumArraySpec,
})
.label("Event");

export const EventSpecPlus = EventSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("EventPlus");

export const EventArraySpec = Joi.array().items(EventSpecPlus).label("EventArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
})
.label("JwtAuth");