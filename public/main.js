class Form {
  constructor(onSubmit) {
    const el = this.render()
    el.addEventListener('submit', event => {
      event.preventDefault()
      const nameInput = el.querySelector('[name=name]')
      const amountInput = el.querySelector('[name=amount]')
      onSubmit({ name: nameInput.value, amount: Number(amountInput.value) })
    })
  }

  render() {
    const el = document.createElement('form')
    el.innerHTML = `
      <input name="name" type="text" />
      <input name="amount" type="number" />
      <button>Update</button>
    `
    return document.body.appendChild(el)
  }
}

class App {
  constructor() {
    this.placeholder = document.querySelector('.placeholder')
    this.createForm()
    this.getData()
  }

  createForm() {
    new Form(this.sendUserData.bind(this))
  }

  sendUserData(user) {
    fetch('/coffee', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => this.render(data))
      .catch(error => console.log(error.message))
  }

  render(data) {
    this.placeholder.innerHTML = ''
    this.createTotal(data.total)
    this.createCards(data.users)
  }

  createTotal(total) {
    const el = document.createElement('div')
    el.innerHTML = `<h1>Total: ${total}</h1>`
    this.placeholder.appendChild(el)
  }

  getData() {
    fetch('/coffee')
      .then(res => res.json())
      .then(data => this.render(data))
      .catch(error => console.log(error.message))
  }

  createCards(cardsData) {
    cardsData.forEach(card => this.createSingleCard(card))
  }

  createSingleCard(cardData) {
    const el = document.createElement('div')
    el.innerHTML = `
      <strong>${cardData.name}</strong>
      (${cardData.amount})
    `
    this.placeholder.appendChild(el)
  }
}

new App()
