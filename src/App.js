import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkform/imageLinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import FaceRecognition from'./components/faceRecognition/faceRecognition';
import './App.css';
import 'tachyons';


const app = new Clarifai.App({
  apiKey: '8671d50c92fb41679fd68f20c1bec60b'
});

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
};

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  onInputChange= (event)=> {
  this.setState({input: event.target.value});
  }

  calculateFaceLocation =(data) => {

    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log("breedte =" + width , 'lengte =' + height);
   
      return { 
         topRow: face.top_row * height,
         leftCol: face.left_col * width,
         rightCol: width -(face.right_col * width),
         bottomRow: height - (face.bottom_row * height)
       }
    
}

  displayFaceBox = (box) => {this.setState({box: box})};


    onButtonSubmit = () => {
       console.log('click');
      this.setState({imageUrl: this.state.input})
      app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL,
      })
      .then((faceDetectModel) => {
        return faceDetectModel.predict(
          this.state.imageUrl
        );
      })
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(error => console.log(error));
       
     };    
  


  render() {
  return (
    <div className="App">
       <Particles className="particles" 
       params={particleOptions}
                />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );
 }
}


export default App;
