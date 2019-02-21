const express = require('express')
const app = express()
const uid = require('uid')

app.use(express.json())

const data = {
  cards: [
    {
      name: 'Card-title1',
      content: 'Card-content1',
      id: uid(),
      tags: ['html', 'css'],
    },
    {
      name: 'Card-title2',
      content: 'Card-content2',
      id: uid(),
      tags: ['react', 'javascript'],
    },
    {
      name: 'Card-title3',
      content: 'Card-content3',
      id: uid(),
      tags: ['html', 'redux', 'css'],
    },
  ],
}

app.get('/cards', (req, res) => {
  res.json(data.cards)
})

app.post('/cards', (req, res) => {
  const newCard = req.body
  newCard.id = uid()
  data.cards.push(newCard)
  res.json(newCard)
})

app.patch('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = data.cards.findIndex(card => card.id === id)
  const card = { ...data.cards[index], ...req.body }
  data.cards[index] = card
  res.json(card)
}) // schickt nur mit, was ersetzt werden soll. The HTTP PATCH request method applies partial modifications to a resource.

app.put('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = data.cards.findIndex(card => card.id === id)
  const card = { ...req.body, id: uid() }
  data.cards[index] = card
  res.json(card)
}) //The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload. Only allows complete replacement.

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const deletedCard = data.cards.find(card => card.id === id)
  data.cards = data.cards.filter(card => card.id !== id)
  /*const index = data.cards.findIndex(card => card.id === id)
const deletedCard = data.cards[index]
index !== -1 && data.cards.splice(index, 1)
statt 
const deletedCard = data.cards.find(card => card.id === id) 
data.cards = data.cards.filter(card => card.id !== id)
*/

  res.json(deletedCard)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
