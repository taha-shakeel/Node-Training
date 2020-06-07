const users = require('../models/users.model');
const { states, stateHirarchy } = require('../constants/taskStates');

async function findAll() {
  return await users.findAll({});
}

async function find(searchBy = {}) {
  // const byId = searchBy.id;
  // const byName = searchBy.name;
  // const byDob = searchBy.dob;
  // const byDetails = searchBy.details;
  // const byDueDate = searchBy.dueDate;
  // const byState = searchBy.state;

  // let task = tasks;
  // if (byId) task = task.filter(u => u.id == byId);
  // if (byTitle) task = task.filter(u => u.title == byTitle);
  // if (byDetails) task = task.filter(u => u.details == byDetails);
  // if (byDueDate) task = task.filter(u => u.dueDate == byDueDate);
  // if (byState) task = task.filter(u => u.state == byState);

  // if (!task.length) {
  //   throw new Error('task not found');
  // }
  return await users.findAll({
    where: searchBy
  });
}

function findOne(name) {
  const user = users.find(u => u.name === name);
  if (!user.length) {
    throw new Error('task not found');
  }
  return user;
}

async function insert(user) {
  return await users.build(user).save();
}

function update(user) {
  const index = users.findIndex(u => u.id == user.id);
  if (user === -1) throw new Error('ID_NOT_FOUND');

  users[index].name = user.name;
  users[index].age = user.age;
  users[index].dob = user.dob;

  return users[index];
}

function deleteById(id) {
  const delIdx = users.findIndex(u => u.id == id);
  if (delIdx === -1) throw new Error('ID_NOT_FOUND');
  users.splice(delIdx, 1);
  return users;
}

function _validateState(previousState, newState) {
  if (!states[newState]) throw new Error('STATE_NOT_FOUND');
  if (!states[previousState]) throw new Error('STATE_NOT_FOUND');

  if (stateHirarchy[previousState].findIndex(u => u == states[newState]) === -1)
    throw new Error('STATE_NOT_VALID');
}

module.exports = {
  deleteById,
  findAll,
  find,
  findOne,
  insert,
  update
};
