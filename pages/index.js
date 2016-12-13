import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Store from '../stores/stores'
import MenuActions from '../actions/actions'
import Character from './components/character'

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

    setInterval(() => {
      this.setTime();
    }, 1000)
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange)
    this.state.internal = null
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
      this.setState({
        hours: stringHours,
        minutes: stringMinutes,
        seconds: seconds
      });
  }

  renderNav() {
    let nav = [
      'item',
      'magic',
      'materia',
      'equip',
      'status',
      'order',
      'limit',
      'config'
    ]
    return nav.map((item, i) => {
      return (<div key={i}><Link href={"/ff7/"+item}><a>{item}</a></Link></div>)
    })
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
            <div {...styles.finalUsers} {...styles.finalMenu} {...styles.blueGrad}>
              {this.state.characters.map((character) => {
                return <Character key={character.id} character={character} />
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
            <div {...styles.blueGrad} {...styles.finalMenu} {...styles.finalNav}>
              {this.renderNav()}
              <br />
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
