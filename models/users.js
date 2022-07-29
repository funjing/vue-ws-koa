let id = 0

function nextId() {
  id++
  return id
}

function User(name) {
  this.id = nextId()
  this.name = name
}

let users = [
  new User('路人甲'), 
  new User('路人乙'),
  new User('路人丙')
]

module.exports = {
  getUsers: () => {
    return users
  },

  createUser: (name) => {
    const user = new User(name)
    users.push(user)
    return user
  }
}
