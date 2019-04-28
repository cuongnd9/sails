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
  },
  delete: function(req, res) {
    Todos.destroy({ id: req.params.id }).exec(function(err) {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.redirect('/todos/list');
    });
    return false;
  },
  edit: function(req, res) {
    Todos.findOne({ id: req.params.id }).exec(function(err, todo) {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.view('todos/edit', { todo });
    });
  },
  update: function(req, res) {
    const { name, status } = req.body;
    Todos.update(
      { id: req.params.id },
      { name, isCompleted: status === 'Completed' }
    ).exec(function(err) {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.redirect('/todos/list');
    });

    return false;
  }
};
