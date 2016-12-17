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
  }

  onChange(state) {
    this.setState(state)
  }

  moveNav(direction) {
    console.log(this.state);
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
            document.querySelectorAll('.menu-item a')[i].click();
            console.log(window)
          } else {
            item.visible = false
          }
          newMenu.push(item)
        })
        Actions.updateMenu(newMenu)
        break
      }
      case 'backward': {
        break
      }
    }
  }

  handlePress(e) {
    if (e.keyCode === 38) {
      this.moveNav('up')
    }
    if (e.keyCode === 40) {
      this.moveNav('down')
    }
    console.log(e.keyCode)
    if (e.keyCode === 13 || e.keyCode === 88) {
      this.navigate('forward')
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
    return (
      <div {...styles.blueGrad} {...styles.finalMenu} {...styles.finalNav}>
        {this.renderNav()}
      </div>
    )
  }
}
