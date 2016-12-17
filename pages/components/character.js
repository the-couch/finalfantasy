import React from 'react'
import * as styles from '../styles/ff7'

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
    let colorHP = {
      width: (this.state.hp / this.props.character.hp.total) * 100 + '%'
    }
    let colorHPBar;

    let userColor;
    if ((this.state.hp / this.props.character.hp.total * 100) <= 50) {
      userColor = 'rgb(231, 231, 0)'
      colorHPBar = 'redzone'
    } else {
      userColor = 'rgb(255,255,255)';
      colorHPBar = 'gradient'
    }
    let colorHPText = {
      color: userColor
    }
    let cloudMP = {
      width: (this.state.mp / this.props.character.mp.total) * 100 + '%'
    }
    let colorMPBar;
    let userMPColor;
    if ((this.state.mp / this.props.character.mp.total * 100) <= 50) {
      userMPColor = 'rgb(231, 231, 0)'
      colorMPBar = 'redzone'
    } else {
      userMPColor = 'rgb(255,255,255)'
      colorMPBar = 'gradient-green'
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
    let userActive = this.props.character.active ? 'visible' : 'hidden'
    return (
      <div {...styles.userSingle} className={userActive}>
        <div className={"image close-"+this.props.limit}>
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
                <div {...styles.statsAmount}><span className={colorHPBar} style={colorHP}></span></div>
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
                <div {...styles.statsAmount}><span className={colorMPBar}  style={cloudMP}></span></div>
              </div>
            </div>
          </div>
          {this.props.limit ?
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
          : '' }
        </div>
      </div>
    )
  }
})

export default Character
