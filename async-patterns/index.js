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
