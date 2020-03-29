const repo = require('../reporsitories/users.repository');
const { states } = require('../constants/taskStates');

function findAll() {
  return repo.findAll();
}

async function find(searchBy = {}) {
  return await repo.find(searchBy);
}

async function insert(task) {
  task.state = states.new;
  return await repo.insert(task);
}

function update(task) {
  return repo.update(task);
}

function deleteById(id) {
  return repo.deleteById(id);
}

module.exports = {
  deleteById,
  findAll,
  find,
  insert,
  update
};
