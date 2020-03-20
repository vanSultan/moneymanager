const { models } = require('../models');

const { UserProfile } = models;

async function getUserProfile(req, res) {
  const userProfile = await UserProfile.findByPk(req.user.userId);

  if (userProfile != null) {
    res.status(201).json({
      name: userProfile.name,
      surname: userProfile.surname,
      email: userProfile.email,
    });
  } else {
    res.status(404).json({
      message: 'Профиль не найден, создайте его',
    });
  }

  return undefined;
}

module.exports = {
  getUserProfile,
};
