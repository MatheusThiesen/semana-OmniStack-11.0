const app = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngsController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = app.Router();

routes.post('/session', SessionController.store)

routes.get('/ongs', OngsController.index);
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),    
  })
}) ,OngsController.store);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),    
  }).unknown()
}), ProfileController.index)

routes.post('/incidents', IncidentsController.store)

routes.get('/incidents',celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  }),
}), IncidentsController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentsController.detroy)

module.exports = routes; 
