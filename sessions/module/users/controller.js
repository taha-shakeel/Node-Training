const fs = require('fs');
const path = require("path");
const userData = require('../../repository/users/index.json');
const dataPath = path.resolve(__dirname, '../../repository/users/index.json');

const getUsers = (req, res) => {
  const filteredData = req.params.id
    ? userData.filter((item) => item.id === Number(req.params.id))
    : userData;
  res.statusCode = 200;
  res.send(filteredData);
}

const createNewUser = (req, res) => {
    const parsedData = userData
    if (parsedData.length === 0) {
      req.body.id = parsedData.length + 1;
    } else {
      req.body.id = parsedData[parsedData.length - 1].id + 1;
    }
    
    parsedData.push(req.body);
    
    fs.writeFile(dataPath, JSON.stringify(parsedData), (err) => {
      if (err) {
        throw err;
      }
      res.statusCode = 201;
      res.send(parsedData);
    })
}
const updateUser = (req, res) => {
  const indexOfRecord = userData.findIndex(item => item.id === Number(req.params.updateId));
  if (indexOfRecord !== -1) {
    userData[indexOfRecord] = {...userData[indexOfRecord], ...req.body};
    fs.writeFile(dataPath, JSON.stringify(userData), (err) => {
      if (err) {
        throw err;
      }
      res.statusCode = 200;
      res.send(userData);
    })
  }
  res.statusCode = 204;
  res.send({message: "No content found"});
}

const deleteUser = (req, res) => {
  const removingUserWithDeletionId = userData.filter(item => item.id !== Number(req.params.deleteId));
  if (removingUserWithDeletionId.length === userData.length) {
    return res.json({ message: 'No record found' });
  }
  fs.writeFile(dataPath, JSON.stringify(removingUserWithDeletionId), (err) => {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.json({ success: true, message: 'Record deleted successfully' });
  })
}

module.exports = {
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
