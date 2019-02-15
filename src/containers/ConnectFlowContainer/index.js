/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ConnectForm, PageMiddleContent } from 'components'
import { postConnectFB, postConnectLR } from 'store/actions'

class ConnectFlowContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { postConnectFB, postConnectEmail } = this.props

    return (
      <PageMiddleContent>
        <ConnectForm
          onEmail={postConnectEmail}
          onFB={postConnectFB}
        />
      </PageMiddleContent>
    )
  }
}

ConnectFlowContainer.propTypes = {
  postConnectFB: PropTypes.func.isRequired,
  postConnectEmail: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  postConnectFB: () => dispatch(postConnectFB()),
  postConnectEmail: () => dispatch(postConnectLR()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectFlowContainer)
