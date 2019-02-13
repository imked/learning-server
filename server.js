const express = require('express')
const { addTotal } = require('./utils')
const app = express()

const data = {
  users: [
    { name: 'Dejan', amount: 3 },
    { name: 'Jerry', amount: 30 },
    { name: 'Jan', amount: 0 },
  ],
}

app.use(express.static('public'))
app.use(express.json())

app.post('/coffee', (req, res) => {
  const newUser = req.body
  const isNameEqual = user => user.name === newUser.name
  const user = data.users.find(isNameEqual)
  if (user) {
    user.amount += newUser.amount
  } else {
    data.users.push(newUser)
  }

  res.json(addTotal(data))
})

app.get('/coffee', (req, res) => {
  res.json(addTotal(data))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server ready on port 3000')
})
