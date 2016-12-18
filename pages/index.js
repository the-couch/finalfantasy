import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Store from '../stores/stores'
import Actions from '../actions/actions'
import Character from './components/character'
import Menu from './components/menu'
import Layout from './layout'

import css from 'glamor'
import 'glamor/reset'
import * as styles from './styles/ff7'


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = Store.getState()
    this.onChange = this.onChange.bind(this)
    this.setTime = this.setTime.bind(this)
  }

  componentWillMount() {
    this.setTime()
  }

  componentDidMount() {
    Store.listen(this.onChange)
    Actions.updateHandSelector('menu')

    this.state.interval = setInterval(() => {
      this.setTime();
    }, 1000)
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange)
    clearInterval(this.state.internal)
  }

  onChange(state) {
    this.setState(state)
  }

  setTime() {
    let currentdate = new Date();
    let hours = currentdate.getUTCHours() - 4;

      // correct for number over 24, and negatives
      if( hours >= 24 ){ hours -= 24; }
      if( hours < 0   ){ hours += 12; }

      // add leading zero, first convert hours to string
      let stringHours = hours.toString();
      if( stringHours.length === 1 ){ stringHours = "0" + stringHours; }

      // minutes are the same on every time zone
      let minutes = currentdate.getUTCMinutes();

      // add leading zero, first convert hours to string
      let stringMinutes = minutes.toString();
      if( stringMinutes.length === 1 ){ stringMinutes = "0" + stringMinutes; }

      let seconds = currentdate.getUTCSeconds();
      Actions.updateHours(stringHours)
      Actions.updateMinutes(stringMinutes)
      Actions.updateSeconds(seconds)
  }

  render() {
    return (
        <div>
          <Head>
            <title>Final Fantasy 7 Menu</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet" />
          </Head>
          <a href="https://github.com/the-couch/finalfantasy" {...styles.github} aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250"  aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="oct"></path><path className="oct" d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>

          <Layout routing={this.props}>
            <div {...styles.finalUsers} {...styles.finalMenu} {...styles.blueGrad}>
              {this.state.characters.map((character) => {
                let limit = true
                return <Character key={character.id} character={character} limit={limit} />
              })}
            </div>
            <div {...styles.finalMenu} {...styles.blueGrad} {...styles.finalInfo}>
              <div className="wrapper">
                <span>Time</span> <strong>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</strong>
              </div>
              <div className="wrapper">
                <span>Gil</span> <strong>3992883</strong>
              </div>
            </div>
            {/* <div className="final--location final--blue final--menu"> */}
            <div {...styles.blueGrad} {...styles.finalMenu} {...styles.finalLocation}>
              <span>Great Hole in Time</span>
            </div>
          </Layout>
        </div>
    )
  }
}
