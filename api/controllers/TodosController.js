/**
 * TodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req, res) {
    Todos.find({}).exec(function(err, todos) {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.view('todos/list', { todos });
    });
  },
  add: function(req, res) {
    res.view('todos/add');
  },
  create: function(req, res) {
    const { name } = req.body;

    Todos.create({ name }).exec(function(err) {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.redirect('/todos/list');
    });
  }
};
