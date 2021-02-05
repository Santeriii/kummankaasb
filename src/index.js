import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Hit the gear icon to the left of JS in the header to open JavaScript settings

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: {
        sound: null,
        soundName: null,
        currentlyPlaying: null 
      }
    }
  }
  
  playSound(id) {
    if (this.state.audio.currentlyPlaying) {
      let snd = this.state.audio.sound;
      snd.pause();
    }
    let sound = this.props.sounds.find(sound => { return sound.id === id});
    let snd = new Audio(sound.soundURL);
    this.setState({ audio: { sound: snd, soundName: sound.soundName, currentlyPlaying: true }});
    snd.play();
    
    let data = [...this.props.sounds];
    const index = data.findIndex(obj => obj.soundName === sound.soundName);
    data[index].count += 1;
    data[index].isPlaying = true;
    this.setState(data);
    
    snd.addEventListener('ended', this.soundListener.bind(this, data, index, snd));
  }
  
  soundListener(data, index, snd) {
    const newData = [ ...data ];
    newData[index].isPlaying = false;
    this.setState(newData);
    snd.removeEventListener('ended', this.soundListener);
  } 
  
  renderSounds() {
    return this.props.sounds.map(sound => {
      return <Sound key={sound.id} sound={sound} audio={this.state.audio} playSound={this.playSound.bind(this)} />
    })
  }
  render() {
    return (
      <div className="appContainer">
        {this.renderSounds()}
      </div>
    )
  }
};

class Sound extends React.Component {
  render() {
    return (
      <div className='sound-card'
        onClick={() => this.props.playSound(this.props.sound.id)}>
            <img className="profile-image" src={this.props.sound.image} alt="W3Schools.com"></img>
            <h3 className="name">{this.props.sound.soundName}</h3>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sounds: [
        { id: 1, soundName: 'Vesa', soundURL: 'https://dl.dropboxusercontent.com/s/ft0e4k4xmbx7r9g/Vesa.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/pcq96lhlg9yp6tk/Vesa.PNG?dl=0', count: 0, isPlaying: false }, 
        { id: 2, soundName: 'Anne', soundURL: 'https://dl.dropboxusercontent.com/s/qu1splvjf9g9wlc/Anne.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/9iyopa9vym65qe6/Anne.PNG?dl=0', count: 0, isPlaying: false },
        { id: 3, soundName: 'Ellu', soundURL: 'https://dl.dropboxusercontent.com/s/omuaira0zxgq414/Ellu.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/ll821xfkjvdq069/Ellu.PNG?dl=0', count: 0, isPlaying: false },
        { id: 4, soundName: 'Aki', soundURL: 'https://dl.dropboxusercontent.com/s/2jf6hroymvk8ape/Aki.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/d9kk3dcbfs6cuhd/Aki.PNG?dl=0', count: 0, isPlaying: false },
        { id: 5, soundName: 'Tarja', soundURL: 'https://dl.dropboxusercontent.com/s/pwwx7zdndtm4jia/Tarja.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/51aodnl1mjfa5uf/Tarja.PNG?dl=0', count: 0, isPlaying: false },
        { id: 6, soundName: 'Telttapoju', soundURL: 'https://dl.dropboxusercontent.com/s/sqrxf76sqa6lfcd/Telttapoju.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/yiihok9tovvfa8i/Telttapoju.PNG?dl=0', count: 0, isPlaying: false },
        { id: 7, soundName: 'Jesse', soundURL: 'https://dl.dropboxusercontent.com/s/442hmlfw5r9sbuv/Jesse.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/97c4cd2cajh04gl/Jesse.PNG?dl=0', count: 0, isPlaying: false },
        { id: 8, soundName: 'Laulu', soundURL: 'https://dl.dropboxusercontent.com/s/xmhmgbxmoc0is9d/Laulu.mp3?dl=0', image: 'https://dl.dropboxusercontent.com/s/9mtbrehyubk9d0o/Laulu.PNG?dl=0', count: 0, isPlaying: false }
      ]
    }
  }
    render() {
      return (
        <div>
          <h1 className="header">"Kumman kaa"-Soundboard</h1>
          <Board sounds={this.state.sounds} audio={this.state.audio} />
          <p style={{color:"white"}}>By Snaderi</p>
        </div>
      );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
