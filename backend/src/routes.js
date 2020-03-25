const app = require('express');
const routes = app.Router();

const OngsController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.post('/session', SessionController.store)

routes.get('/ongs', OngsController.index);
routes.post('/ongs',OngsController.store);

routes.get('/profile', ProfileController.index)

routes.post('/incidents', IncidentsController.store)
routes.get('/incidents', IncidentsController.index)
routes.delete('/incidents/:id', IncidentsController.detroy)

module.exports = routes; 
