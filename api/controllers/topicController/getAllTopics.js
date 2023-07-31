const { Topic } = require('../../../database/models');

async function getAllTopics(req, res, next) {
  try {
    const topics = await Topic.findAll({
      attributes: ['id', 'name'],
    });

    return res.status(200).json({ topics, message: 'Todos os tópicos foram recuperados com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getAllTopics;
