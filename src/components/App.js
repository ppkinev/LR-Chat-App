/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { getAppRequest, iframeMessageSend } from 'store/actions'
import { fromApp } from 'store/selectors'

import { ChatPage, Fetching } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  html, body, main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  body {
    background-color: #f0f2f5;
  }
`

class App extends Component {
  componentWillMount() {
    this.props.getApp()
  }

  componentWillUpdate(nextProps) {
    if (!this.props.isActive && nextProps.isActive) {
      this.props.sendMessageToParent({
        isActive: true,
      })
    }
  }

  render() {
    return this.props.isActive ? (
      <ThemeProvider theme={theme}>
        <Switch>
          {/* <Route path="/" component={HomePage} exact /> */}
          <Route component={ChatPage} />
        </Switch>
      </ThemeProvider>
    ) : <Fetching />
  }
}

App.propTypes = {
  isActive: PropTypes.bool,
  getApp: PropTypes.func,
  sendMessageToParent: PropTypes.func,
}

const mapStateToProps = state => ({
  isActive: fromApp.isActive(state),
})

const mapDispatchToProps = dispatch => ({
  getApp: () => dispatch(getAppRequest()),
  sendMessageToParent: message => dispatch(iframeMessageSend(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
