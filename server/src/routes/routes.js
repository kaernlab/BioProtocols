const UserController = require('../controllers/user_controller');
const DataController = require('../controllers/data_controller');

const routes = app => {
  app.get('/', (req, res) => {
    res.send('heartbeat')
  })

  // @route    POST login
  // @desc     Validate user
  // @access   Private
  app.post('/v1/login', UserController.login);

  // @route    GET data
  // @desc     get JSON data values
  // @access   Private
  app.get('/v1/get/data/', DataController.getAll)

  // @route    POST data
  // @desc     create new lab with new data
  // @access   Private
  app.put('/v1/post/data/', DataController.createLab)

  // @route    PUT data
  // @desc     update lab data
  // @access   Private
  app.put('/v1/put/data/', DataController.updateLab)

  // @route    DELETE data
  // @desc     delete lab 
  // @access   Private
  app.delete('/v1/delete/data/', DataController.deleteLab)


};

module.exports = routes;