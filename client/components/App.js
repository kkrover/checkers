/* eslint-disable react/prop-types */

import React from 'react';

// import GameCreator from './GameCreator';
// import Game from './Game';
import Board from './Board';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkers: [] };
    this.refresh = this.refresh.bind(this);
  }
  componentDidMount() {
    this.refresh();
  }

  refresh() {
    fetch('/games')
  .then(r => r.json())
  .then(j => {
    this.setState({ checkers: j.checkers });
  });
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;
// export default (props) => (
//   <div>
//     <Nav />
//     <div className="container">
//       <div className="row">
//         <div className="col-xs-12">
//           {props.children}
//         </div>
//       </div>
//     </div>
//   </div>
// );
