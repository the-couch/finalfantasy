import React, { Component } from 'react'
import Head from 'next/head'

import Store from '../../../stores/stores'
import Actions from '../../../actions/actions'

import Menu from '../../components/menu'
import Character from '../../components/character'

import * as styles from '../../styles/ff7'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = Store.getState()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    Store.listen(this.onChange)

    let newMenu = []

    this.state.menu.map((item, i) => {
      if (i === 0) {
        item.hand = false
        item.visible = true
      } else {
        item.hand = false
        item.visible = false
      }
      newMenu.push(item)
    })
    Actions.updateMenu(newMenu)
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  render() {
    return (
      <div>
        <Head>
          <title>Final Fantasy 7 Menu</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet" />
        </Head>
        <div className={styles.wrapper}>
          <div className={styles.final}>
            <div {...styles.blueGrad} {...styles.finalMenu}>
              <span>Great Hole in Time</span>
            </div>
            <div {...styles.finalUsers} {...styles.finalMenu} {...styles.blueGrad}>
              {this.state.characters.map((character) => {
                let limit = false;
                return <Character key={character.id} character={character} limit={limit} />
              })}
            </div>
            <Menu />
          </div>
        </div>
      </div>
    )
  }
}
