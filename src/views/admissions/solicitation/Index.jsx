import React, { Component } from 'react'
import { connect } from 'react-redux'

 class Index extends Component {
  render() {
    
    return (
      <div>
         邀约查询
      </div> 
    )
  }
}
export default connect(
    state=>({res:state})
)(Index)