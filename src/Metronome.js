import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  startStop = () => {
    if(this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick,(60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        // Play a click immediately after setstate finishes
      }, this.playClick);
    }
  }
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if(count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    if (this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      
      <div className="metronome">
        <h1>React Metronome</h1>
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input 
            type="range" 
            min="40" 
            max="300" 
            value={bpm} 
            onChange={this.handleBpmChange}
            />
        </div>
        <button className="timeSignature">1/4</button>
        <button className="timeSignature">2/4</button>
        <button className="timeSignature">3/4</button>
        <button className="timeSignature">4/4</button>
        <button className="start" onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;