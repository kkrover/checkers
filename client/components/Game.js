/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */
import React from 'react';
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { game: null };
  }
  render() {
    return (
      <div>
        <table>
          <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>d</td>
          </tr>
        </table>
      </div>
   );
  }
}

export default Game;
