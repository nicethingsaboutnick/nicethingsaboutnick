import React, { Component } from "react";
import data from "./data";
import "./App.css";

const removeIndex = (list, index) => {
  const firstPart = list.slice(0, index);
  const secondPart = list.slice(index + 1);

  return [ ...firstPart, ...secondPart ];
};

const random = (list) => {
  const min = 0;
  const max = list.length - 1;

  const index = Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    item: list[index],
    index: index
  };
};

const getInitialState = () => {
  let unread = [];

  for(let i = 0; i < data.length; i++) {
    unread.push(data[i]);
  }

  const current = random(data);

  unread = removeIndex(unread, current.index);

  return { 
    unread, 
    current: current.item
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = getInitialState();
    this.handleRefresh = this.handleRefresh.bind(this);

    window.random = random;
  }

  handleRefresh() {
    const { unread } = this.state;

    const next = random(unread);
    let nextUnread = removeIndex(unread, next.index);

    if(nextUnread.length === 0) {
      nextUnread = data;
    }

    this.setState({
      unread: nextUnread,
      current: next.item
    });
  }

  render() {
    const { quote, name } = this.state.current;

    return (
      <div className="App">
        <div className="content">
          <p className="quote">“{quote}”</p>
          <p className="name">- {name} -</p>
        </div>
        <button 
          className="refresh"
          onClick={this.handleRefresh}
        >
          Get another nice thing
        </button>
      </div>
    );
  }
}

export default App;
