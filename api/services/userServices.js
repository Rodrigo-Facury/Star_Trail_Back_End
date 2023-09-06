const { User } = require('../../database/models');

async function findByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

async function findByUsername(username) {
  try {
    const user = await User.findOne({ where: { username } });
    
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

async function gradeUser(id) {
  try {
    const user = await User.findByPk(id);

    const countStars = [];

    const usersTrails = await user.getTrails();

    await Promise.all(usersTrails.map((trail) => trail.getStars()))
      .then((stars) => countStars.push(...stars.map((star) => star.length)));

    if (countStars.filter((star) => star >= 200) && countStars.filter((star) => star >= 200).length >= 20) {
      await user.update({ level: 5 });

      return;
    }

    if (countStars.filter((star) => star >= 150) && countStars.filter((star) => star >= 150).length >= 10) {
      await user.update({ level: 4 });

      return;
    }

    if (countStars.filter((star) => star >= 100) && countStars.filter((star) => star >= 100).length >= 5) {
      await user.update({ level: 3 });

      return;
    }

    if (countStars.filter((star) => star >= 100) && countStars.filter((star) => star >= 100).length >= 1) {
      await user.update({ level: 2 });

      return;
    }

    if (countStars.filter((star) => star >= 50) && countStars.filter((star) => star >= 50).length >= 1) {
      await user.update({ level: 1 });

      return;
    }

    if (user.level !== 0) {
      await user.update({ level: 0 });

      return;
    }
    
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findByEmail,
  findByUsername,
  gradeUser
};
