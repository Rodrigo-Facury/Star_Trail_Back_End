const { Trail, Step } = require('../../../database/models');

async function deleteTrail(req, res, next) {
  const trailId = req.params.trailId;
  const userId = req.user.id;

  try {
    const trail = await Trail.findByPk(trailId, {
      include: [{
        model: Step,
        as: 'steps'
      }],
    });

    if (!trail) {
      return res.status(404).json({ message: 'Trilha não encontrada!' });
    }

    if (trail.userId !== userId) {
      return res.status(403).json({ message: 'Acesso não autorizado! Você não é o proprietário desta trilha.' });
    }

    await Step.destroy({
      where: {
        trailId,
      },
    });

    await trail.destroy();

    return res.status(200).json({ message: 'Trilha excluída com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = deleteTrail;
