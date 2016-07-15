/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */
import React from 'react';
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: props.color };
  }
  render() {
    return (
      <div>
        Player {this.props.color}
      </div>
   );
  }
}

export default Player;
