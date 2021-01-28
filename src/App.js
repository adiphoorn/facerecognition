import React, {Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkform/imageLinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

const particleOptions = {
    particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 800
          } 
        },
        color: {
           value: "#333333",
        }, 
 }
}
class App extends Component {
  render() {
  return (
    <div className="App">
       <Particles className="particles" 
       params={particleOptions}
                />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
 }
}


export default App;
