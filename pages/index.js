import React, { Component } from 'react'
import Head from 'next/head'
import Store from '../stores/Store'
import Actions from '../actions/actions'

import css from 'glamor'
import 'glamor/reset'
import * as styles from './styles/ff7'


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = Store.getState()
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    Store.listen(this.onChange)
    console.log(this.state.characters)
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
          <title>Final Fantasy Menus</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet" />
        </Head>
        <div className={styles.wrapper}>
          <div className={styles.final}>
            {/* <div className="final--users final--blue final--menu"> */}
            <div {...styles.finalMenu} {...styles.blueGrad}>
              {this.state.characters.map((character) => {
                return <Character key={character.id} character={character} />
              })}
            </div>
            {/* <div className="final--info final--blue final--menu"> */}
            <div {...styles.finalMenu} {...styles.blueGrad} {...styles.finalInfo}>
              <div className="wrapper">
                <span>Time</span> <strong>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</strong>
              </div>
              <div className="wrapper">
                <span>Gil</span> <strong>3992883</strong>
              </div>
            </div>
            <div className="final--location final--blue final--menu">
              <span>Great Hole in Time</span>
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
      <div className="final--users-single">
        <div className="final--users-image">
          <img src={this.props.character.photo} alt="" />
        </div>
        <div className="final--users-wrapper">
          <div className="final--users-name">
            <span>{this.props.character.name}</span>
            <div className="final--users-stats">
              <div className="final--users-stats-header">
                LV
              </div>
              <div className="final--users-stats-value">
                {this.props.character.lv}
              </div>
            </div>
            <div className="final--users-stats">
              <div className="final--users-stats-header">
                HP
              </div>
              <div className="final--users-stats-value-row">
                <div className="final--users-stats-value-single" style={colorHPText}>
                  {this.state.hp + '/'}
                </div>
                <div className="final--users-stats-value-single">
                  {this.props.character.hp.total}
                </div>
                <div className="final--users-stats-amount"><span style={cloudHP}></span></div>
              </div>
            </div>
            <div className="final--users-stats">
              <div className="final--users-stats-header">
                MP
              </div>
              <div className="final--users-stats-value-row">
                <div className="final--users-stats-value-single" style={colorMPText}>
                  {this.state.mp + '/'}
                </div>
                <div className="final--users-stats-value-single">
                  {this.props.character.mp.total}
                </div>
                <div className="final--users-stats-amount"><span style={cloudMP}></span></div>
              </div>
            </div>
          </div>
          <div className="final--users-limit">
            <div className="final--users-limit-block">
              <span>next level</span>
              <div className="final--users-limit-box"><span style={nextLimitWidth}></span></div>
            </div>

            <div className="final--users-limit-block">
              <span>Limit level <strong>{this.props.character.limit.level}</strong></span>
              <div className="final--users-limit-box"><span style={limitLevelWidth}></span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
