import Config from '../config/config'

let ItemsAPI = {
  "items": [
    {
      name: "Potion",
      value: 100,
      attribute: 'hp',
      message: 'Restores HP by 100',
      value: 25,
      hand: true,
      qty: 40,
      multi: false
    },
    {
      name: "Hi-Potion",
      value: 500,
      attribute: 'hp',
      message: 'Restores HP by 500',
      hand: false,
      value: 150,
      qty: 10,
      multi: false
    },
    {
      name: "X-Potion",
      value: 9999,
      attribute: 'hp',
      message: 'Fully restores HP of one party member',
      value: 1,
      hand: false,
      qty: 1,
      multi: false
    },
    {
      name: "Ether",
      value: 100,
      attribute: 'mp',
      message: 'Restores MP by 100',
      value: 750,
      hand: false,
      qty: 12,
      multi: false
    },
    {
      name: "Turbo Ether",
      value: 999,
      attribute: 'mp',
      message: 'Fully restories MP of one party member',
      value: 1,
      hand: false,
      qty: 9,
      multi: false
    }
  ]
}

module.exports = {
  ItemsAPI
}
