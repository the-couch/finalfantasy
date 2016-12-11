import alt from '../config/alt'

class Actions {
  updateCharacters(characters) {
    return characters
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
