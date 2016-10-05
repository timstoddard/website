import React from 'react';

import { instructions } from './Data';
import './LC3Ref.scss';

export default React.createClass({
  getInitialState() {
    return { instructions: instructions };
  },
  render() {
    let e = this.state.instructions.map((instruction, index) => {
      let content = instruction.formats.map((format, index) => {
        let bitDisplay = format.encoding.map(code => typeof code.value === 'string' ? code.value : code).join(' | ');
        return <div key={index}>
          <div className="col s1">{instruction.name}</div>
          <div className="col s10">{bitDisplay}</div>
          <div className="col s1">{instruction.modifiesConditionCodes ? 'TRUE' : 'FALSE'}</div>
        </div>
      });
      return <div key={index}>
        {content}
      </div>
    });
    return <div className="row">
      {e}
    </div>
  }
});
