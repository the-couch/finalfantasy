import React, { Component } from 'react'
import Menu from '../components/menu'
import * as styles from '../styles/ff7'

export default class extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.final}>
          {this.props.children}
          <Menu routing={this.props.routing} />
        </div>
      </div>
    )
  }
}
