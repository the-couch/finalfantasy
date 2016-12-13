import Config from '../config/config'

let ItemsAPI = {
  "items": [
    {
      name: "Potion",
      value: 100,
      attribute: 'hp',
      value: 25,
      qty: 40,
      multi: false
    },
    {
      name: "Hi-Potion",
      value: 500,
      attribute: 'hp',
      value: 150,
      qty: 10,
      multi: false
    },
    {
      name: "X-Potion",
      value: 9999,
      attribute: 'hp',
      value: 1,
      qty: 1,
      multi: false
    },
    {
      name: "Ether",
      value: 100,
      attribute: 'mp',
      value: 750,
      qty: 12,
      multi: false
    },
    {
      name: "Turbo Ether",
      value: 999,
      attribute: 'mp',
      value: 1,
      qty: 9,
      multi: false
    }
  ]
}

module.exports = {
  ItemsAPI
}
