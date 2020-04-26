const { models } = require('../models');

const { UserProfile } = models;

async function getUserProfile(req, res) {
  const userProfile = await UserProfile.findByPk(req.user.userId);

  if (userProfile != null) {
    return res.status(200).json({
      name: userProfile.name,
      surname: userProfile.surname,
      email: userProfile.email,
    });
  }

  return res.status(404).json({ message: 'Профиль не найден, создайте его' });
}

module.exports = {
  getUserProfile,
};
