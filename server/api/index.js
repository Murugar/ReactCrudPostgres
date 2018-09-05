const router = require('express').Router()
const {User} = require('../db/models')

router.get('/users', function (req, res, next) {
    User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.get('/users/:userId', function (req, res, next) {
    User.findOne({where: {id: req.params.userId}})
    .then(user => res.json(user))
    .catch(next)
})

router.post('/users', function (req, res, next) {
    User.create(req.body)
    .then(createdUser => res.json(createdUser))
    .catch(next)
})

router.put('/users/:userId', function (req, res, next) {
    User.update(req.body, {where: {id: req.params.userId}, returning: true})
    .then(updatedUser => res.json(updatedUser[1]))
    .catch(next)
})

router.delete('/users/:userId', function (req, res, next) {
    User.destroy({where: {id: req.params.userId}})
    .then(() => res.send('Contact deleted!'))
    .catch(next)
})

router.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

module.exports = router