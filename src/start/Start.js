import React from 'react'

import InfoBar from './InfoBar'
import Links from './Links'
import MainContent from './MainContent'

export default React.createClass({
  render() {
    document.title = 'Start'
    return (
      <div>
        <InfoBar />
        <div className="start row">
          <Links className="col s12 m3 l2" />
          <MainContent className="col s12 m9 l10" />
        </div>
      </div>
    )
  }
})
