import React, { Component } from 'react'
import Head from 'next/head'
import Store from '../stores/stores'
import MenuActions from '../actions/actions'

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

    this.state.interval = setInterval(() => {
      this.setTime();
    }, 1000)
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange)
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
      return (<div key={i}>{item}</div>)
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


const Character = React.createClass({
  getInitialState() {
    return {
      hp: this.props.character.hp.current,
      mp: this.props.character.mp.current
    }
  },
  healHP() {
    this.setState({
      hp: this.state.hp + 150
    })
  },
  healMP() {
    this.setState({
      mp: this.state.mp + 50
    })
  },
  render() {
    let cloudHP = {
      width: (this.state.hp / this.props.character.hp.total) * 100 + '%'
    }
    let userColor;
    if ((this.state.hp / this.props.character.hp.total * 100) <= 50) {
      userColor = 'rgb(231, 231, 0)';
    } else {
      userColor = 'rgb(255,255,255)';
    }
    let colorHPText = {
      color: userColor
    }
    let cloudMP = {
      width: (this.state.mp / this.props.character.mp.total) * 100 + '%'
    }
    let userMPColor;
    if ((this.state.mp / this.props.character.mp.total * 100) <= 50) {
      userMPColor = 'rgb(231, 231, 0)';
    } else {
      userMPColor = 'rgb(255,255,255)';
    }
    let colorMPText = {
      color: userMPColor
    }
    let nextLimitWidth = {
      width: this.props.character.limit.next + '%'
    }
    let limitLevelWidth = {
      width: this.props.character.limit.limitLevel + '%'
    }
    return (
      <div {...styles.userSingle}>
        <div className="image">
          <img src={this.props.character.photo} alt="" />
        </div>
        <div className="wrapper">
          <div className="final--users-name">
            <span>{this.props.character.name}</span>
            <div {...styles.stats}>
              <div {...styles.statsHeader}>
                LV
              </div>
              <div className="value">
                {this.props.character.lv}
              </div>
            </div>
            <div {...styles.stats}>
              <div {...styles.statsHeader}>
                HP
              </div>
              <div {...styles.statsValueRow}>
                <div {...styles.statsValueSingle} style={colorHPText}>
                  {this.state.hp + '/'}
                </div>
                <div {...styles.statsValueSingle}>
                  {this.props.character.hp.total}
                </div>
                <div {...styles.statsAmount}><span style={cloudHP}></span></div>
              </div>
            </div>
            <div {...styles.stats}>
              <div {...styles.statsHeader}>
                MP
              </div>
              <div {...styles.statsValueRow}>
                <div {...styles.statsValueSingle} style={colorMPText}>
                  {this.state.mp + '/'}
                </div>
                <div {...styles.statsValueSingle}>
                  {this.props.character.mp.total}
                </div>
                <div {...styles.statsAmount}><span style={cloudMP}></span></div>
              </div>
            </div>
          </div>
          <div {...styles.limit}>
            <div {...styles.limitBlock}>
              <span>next level</span>
              <div {...styles.limitBox}><span style={nextLimitWidth}></span></div>
            </div>

            <div {...styles.limitBlock}>
              <span>Limit level <strong>{this.props.character.limit.level}</strong></span>
              <div {...styles.limitBox}><span style={limitLevelWidth}></span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
