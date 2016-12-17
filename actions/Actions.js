import alt from '../config/alt'

class Actions {
  updateCharacters(characters) {
    return characters
  }
  updateMenu(menu) {
    return menu
  }
  updateMenuActive(menuActive) {
    return menuActive
  }
  updateHours(hours) {
    return hours
  }
  updateMinutes(minutes) {
    return minutes
  }
  updateSeconds(seconds) {
    return seconds
  }
}

module.exports = alt.createActions(Actions)
