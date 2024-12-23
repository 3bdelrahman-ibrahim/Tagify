const User = require('../models/user.model');
const { renderUserTemplate } = require('../views/user.view');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).send(renderErrorTemplate('User not found'));
    }

    res.send(renderUserTemplate(user));
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send(renderErrorTemplate('Internal Server Error'));
  }
};