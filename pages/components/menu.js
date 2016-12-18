import React, { Component } from 'react'
import Store from '../../stores/stores'
import Actions from '../../actions/actions'
import Link from 'next/link'
import MenuActions from '../../actions/actions'
import Config from '../../config/config'

import * as styles from '../styles/ff7'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = Store.getState()
    this.onChange = this.onChange.bind(this)
    this.renderNav = this.renderNav.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.navigate = this.navigate.bind(this)
    this.moveNav = this.moveNav.bind(this)
  }

  componentDidMount() {
    Store.listen(this.onChange)
    document.addEventListener('keydown', this.handlePress)
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange)
    document.removeEventListener('keydown', this.handlePress)
  }

  onChange(state) {
    this.setState(state)
  }

  moveNav(direction) {
    let current = this.state.menuActive,
     previous = this.state.menuActive - 1,
     next = this.state.menuActive + 1,
     length = this.state.menu.length - 1,
     menu = this.state.menu,
     newMenu = [],
     sound = new Audio(Config.baseUrl.concat('bring.wav'))

    switch(direction) {
      case 'up': {
        sound.play()
        if (current > 0) {
          menu.map((item, i) => {
            if (previous === i) {
              item.hand = true
            } else {
              item.hand = false
            }
            newMenu.push(item)
          })
          Actions.updateMenu(newMenu)
        }
        if (previous >= 0) {
          Actions.updateMenuActive(previous)
        } else {
          Actions.updateMenuActive(0)
        }
        break
      }
      case 'down': {
        sound.play()
        if (current < length) {
          menu.map((item, i) => {
            if (next === i) {
              item.hand = true
            } else {
              item.hand = false
            }
            newMenu.push(item)
          })
          Actions.updateMenu(newMenu)
        }
        if (next >= length) {
          Actions.updateMenuActive(length)
        } else {
          Actions.updateMenuActive(next)
        }
        break
      }
    }
  }

  navigate(direction) {
    let menu = this.state.menu,
      current = this.state.menuActive,
      newMenu = []

    switch(direction) {
      case 'forward': {
        menu.map((item, i) => {
          if (i === current) {
            item.visible = true
            item.hand = false
            this.props.routing.url.pushTo("/ff7/"+item.name)
          } else {
            item.hand = false
            item.visible = false
          }
          newMenu.push(item)
        })
        Actions.updateMenu(newMenu)
        break
      }
      case 'back': {
        menu.map((item, i) => {
          if (i === 0) {
            item.visible = true
            item.hand = true
            this.props.routing.url.pushTo("/")
          } else {
            item.hand = false
            item.visible = true
          }
          newMenu.push(item)
        })
        Actions.updateMenu(newMenu)
        Actions.updateMenuActive(0)
        break
      }
    }
  }

  handlePress(e) {
    e.preventDefault()

    if (this.state.handSelector === 'menu') {
      if (e.keyCode === 38) {
        this.moveNav('up')
      }
      if (e.keyCode === 40) {
        this.moveNav('down')
      }
    }
    if (e.keyCode === 13 || e.keyCode === 88) {
      this.navigate('forward')
    }
    if (e.keyCode === 8) {
      this.navigate('back')
      e.preventDefault()
    }
  }

  renderNav() {
    return this.state.menu.map((item, i) => {
      return (
        <div key={i}>
          {item.visible ?
            <div onKeyDown={this.handlePress}  className={'menu-item visible-'+item.visible+ ' active-'+item.active}>
              {item.hand ?
                <div {...styles.hand}>
                  <img src={Config.baseUrl.concat('hand.png')} />
                </div>
              : ''}
              <Link href={"/ff7/"+item.name}><a>{item.name}</a></Link>
            </div>
          : '' }
        </div>
      )
    })
  }

  render() {
    let url = this.props.routing.url
    let inner = ''
    if (url.pathname.length >= 3) {
      inner= 'inner-page'
    }
    return (
      <div {...styles.blueGrad} {...styles.finalMenu} {...styles.finalNav} className={inner}>
        {this.renderNav()}
      </div>
    )
  }
}
