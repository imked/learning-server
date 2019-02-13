function toTitleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function addTotal(data) {
  return {
    ...data,
    total: data.users.reduce((prev, curr) => prev + curr.amount, 0),
  }
}

module.exports = {
  toTitleCase,
  addTotal,
}
