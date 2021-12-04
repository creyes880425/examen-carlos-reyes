//const { create, edit,del, get, list } = require('../controllers/mascota.controller');
const ProjectController = require('../controllers/project.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/projects', authenticate, ProjectController.list);
    app.get('/api/projects/:id', authenticate, ProjectController.get);
    app.post('/api/projects', authenticate, ProjectController.create);
    app.put('/api/projects/:id', authenticate, ProjectController.edit);
    app.delete('/api/projects/:id', authenticate, ProjectController.del);
}