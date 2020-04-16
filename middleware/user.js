const { check } = require('express-validator')

module.exports = {
  checkPermission: [
    check('permission', 'Пермишн должен быть указан в формате CRUD').notEmpty(),
  ]
}