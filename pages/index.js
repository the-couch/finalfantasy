import React, { Component } from 'react'
import Head from 'next/head'
import Store from '../stores/Store'
import Actions from '../actions/actions'

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
        </Head>
        <div>i'm using next dd spaghetti</div>
      </div>
    )
  }
}
