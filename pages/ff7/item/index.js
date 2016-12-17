import React, { Component } from 'react'
import Head from 'next/head'

import Store from '../../../stores/stores'
import MenuActions from '../../../actions/actions'

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
          </div>
        </div>
      </div>
    )
  }
}
