/*
console.log('Before')
const user = getUser(1)
console.log('User: ', user)
console.log('After')


function getUser(id){
  setTimeout(() => {
      console.log('Reading a user from the database...')
      return {id: id, gitHubUsername: 'fahad'}
  }, 2000)
}
*/

// The above code will not work.
// There are three approaches to fix this.

// 1. Callbacks

function callbackMain() {
  console.log("Before");
  getUser(1, function(user) {
    console.log("User: ", user);
    getRepos(user.gitHubUsername, function(repos) {
      console.log("Repos: ", repos);
      getRepoStars(repos[0], function(stars) {
        console.log("Stars: ", stars);
      });
    });
  });
  console.log("After");
}

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, gitHubUsername: "fahad" });
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getRepoStars(repoName, callback) {
  setTimeout(() => {
    callback(3);
  }, 2000);
}

// callbackMain();

// 2. Fixing callback hell using named functions instead of anonymous functions

function fixCallbackHellMain() {
  console.log("Before");
  getUser(1, displayUser);
  console.log("After");
}

function displayStars(stars) {
  console.log("Stars: ", stars);
}

function displayRepos(repos) {
  console.log("Repos: ", repos);
  getRepoStars(repos, displayStars);
}

function displayUser(user) {
  console.log("User: ", user);
  getRepos(user, displayRepos);
}

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, gitHubUsername: "fahad" });
  }, 2000);
}

function getRepos(user, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getRepoStars(repo, callback) {
  setTimeout(() => {
    callback(3);
  }, 2000);
}

fixCallbackHellMain();
