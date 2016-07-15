/* eslint-disable jsx-quotes, react/prop-types */

import React from 'react';

class GameCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { types: [] };
  }

  componentDidMount() {
    fetch('/players')
    .then(r => r.json())
    .then(j => {
      this.setState({ types: j.types.sections });
    });
  }

  render() {
    return (
      <div>
        <h1>Game Creator</h1>
        <form>
          <div className='form-group'>
            <label> Create Player</label>
            <input className='form-control' ref='player' type='text' />
          </div>
          <div>
            <button type="button">Create a game !</button>
          </div>
        </form>
      </div>
    );
  }
}

export default GameCreator;
