var express = require('express');
var axios = require('axios');
var router = express.Router();

// fetch users
async function getUsers() {
  try {
      const users = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      return users.data;
  } catch(err){
      console.error(err);
  }
}

// fetch user by id
async function getUserById(id) {
  try {
      const users = await axios.get('https://jsonplaceholder.typicode.com/users?id=' + id);
      return users.data;
  } catch(err){
      console.error(err);
  }
}

// get the object one way or the other
async function getFilteredUserObject(id) {
  var users = {};
  if(id){
    users = await getUserById(id);
  }else{
    users = await getUsers();
  }
  return formatResponseObject(users);
}

/* GET users listing. */
router.get('/users', async function(req, res) {
   const returnObject = await getFilteredUserObject();
   res.send(returnObject);
});

router.post('/user', async function(req, res) {
   if (req.body.id){
    const returnObject = await getFilteredUserObject(req.body.id);
    res.send(returnObject);
   }else{
    res.send("please enter a user id.");
   }
});

//format each user and return this
function formatResponseObject(users){
  const returnObject = [];
  
  users.forEach(user => {
    var ob = getUserJson(user);
    returnObject.push(ob);
  });
  return returnObject;
}

//only grab what we need
function getUserJson(user){
  return {name: user.name, username: user.username, email: user.email, company: user.company.name};
}

module.exports = router;
