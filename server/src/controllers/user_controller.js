const login = async (req, res, next) => {
   console.log(req.body)
  try {
    // Validate with a userbase later
    if (req.body.username == 'user' && req.body.password=='pass'){
        const token = '12313231'
        res.status(201).send({'token': token});
    }else{
      throw new Error();
    }
  } catch (e) {
    res.status(400).send({'error': "Invalid Credentials"})
    next();
  }
};

const UserController = {
  login
};

module.exports = UserController;