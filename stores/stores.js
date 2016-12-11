import alt from '../config/alt'
import Actions from '../actions/actions'

import { CharactersAPI } from '../api/characters'

class Store {
  constructor() {
    this.characters        = CharactersAPI.characters
    this.hours             = 0
    this.minutes           = 0
    this.seconds           = 0
    this.interval          = null

    this.bindListeners({
      updateCharacters:         Actions.updateCharacters
    })
  }

  updateCharacters(characters) {
    this.characters = characters
  }
}

module.exports = alt.createStore(Store, 'Store')
