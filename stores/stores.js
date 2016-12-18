import alt from '../config/alt'
import Actions from '../actions/actions'

import { CharactersAPI } from '../api/characters'
import { NavAPI } from '../api/nav'
import { ItemsAPI } from '../api/items'

class Store {
  constructor() {
    this.characters        = CharactersAPI.characters
    this.menu              = NavAPI.items
    this.items             = ItemsAPI.items
    this.hours             = 0
    this.minutes           = 0
    this.seconds           = 0
    this.menuActive        = 0
    this.itemSelected      = null
    this.handSelector      = 'menu'
    this.interval          = null

    this.bindListeners({
      updateCharacters:         Actions.updateCharacters,
      updateHours:              Actions.updateHours,
      updateMenu:               Actions.updateMenu,
      updateMenuActive:         Actions.updateMenuActive,
      updateHandSelector:       Actions.updateHandSelector,
      updateMinutes:            Actions.updateMinutes,
      updateSeconds:            Actions.updateSeconds,
    })
  }

  updateCharacters(characters) {
    this.characters = characters
  }

  updateMenu(menu) {
    this.menu = menu
  }

  updateMenuActive(menuActive) {
    this.menuActive = menuActive
  }

  updateHours(hours) {
    this.hours = hours
  }

  updateHandSelector(handSelector) {
    this.handSelector = handSelector
  }

  updateMinutes(minutes) {
    this.minutes = minutes
  }

  updateSeconds(seconds) {
    this.seconds = seconds
  }
}

module.exports = alt.createStore(Store, 'Store')
