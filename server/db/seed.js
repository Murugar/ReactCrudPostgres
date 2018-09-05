
const db = require('../db')
const {User} = require('../db/models')

async function seed () {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({email: 'test1@test1.com', name: 'Test1', phone: 2081231234}),
    User.create({email: 'test2@test2.com', name: 'Test2', phone: 2094567890}),
    User.create({email: 'test3@test3.com', name: 'Test3', phone: 2081235678})
  ])
  console.log('Seeded database')
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
  })
  .then(() => {
    db.close()
    console.log('Connection closed')
  })

