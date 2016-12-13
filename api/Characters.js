import Config from '../config/config'

let CharactersAPI = {
  "characters": [
      {
      id: 1,
      name: "Cloud",
      lv: 97,
      active: true,
      hp: {
        current: 830,
        total: 9201
      },
      mp: {
        current: 120,
        total: 902
      },
      limit: {
        next: 40,
        level: 3,
        limitLevel: 60
      },
      photo: Config.baseUrl.concat('cloud.png')
    },
    {
      id: 2,
      name: "Barret",
      lv: 95,
      active: false,
      hp: {
        current: 1500,
        total: 8701
      },
      mp: {
        current: 450,
        total: 702
      },
      limit: {
        next: 10,
        level: 2,
        limitLevel: 80
      },
      photo: Config.baseUrl.concat('barret.png')
    },
    {
      id: 3,
      name: "Cid",
      lv: 93,
      active: true,
      hp: {
        current: 6730,
        total: 9101
      },
      mp: {
        current: 350,
        total: 802
      },
      limit: {
        next: 10,
        level: 3,
        limitLevel: 80
      },
      photo: Config.baseUrl.concat('cid.png')
    },
    {
      id: 4,
      name: "Tifa",
      lv: 96,
      active: true,
      hp: {
        current: 6063,
        total: 9105
      },
      mp: {
        current: 762,
        total: 974
      },
      limit: {
        next: 90,
        level: 2,
        limitLevel: 80
      },
      photo: Config.baseUrl.concat('tifa.png')
    }
  ]
}

module.exports = {
  CharactersAPI
}
