import React, {Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkform/imageLinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import FaceRecognition from'./components/faceRecognition/faceRecognition';
import Signin from './components/signIn/signIn';
import Register from './components/register/register';
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
};

const initialState = {
  input: '',
  imageUrl: '',
  boxAll: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  
  onInputChange= (event)=> {
  this.setState({input: event.target.value});
  }

  onRouteChange= (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home' ){
       this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }



  calculateFaceLocation =(data) => {

    //const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFaceAll = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log("breedte =" + width , 'lengte =' + height);
    const boxArr = clarifaiFaceAll.map(region => {
      return ( 
        {
      leftCol :  region.region_info.bounding_box.left_col * width,
      topRow :  region.region_info.bounding_box.top_row * height,
      rightCol : width - (region.region_info.bounding_box.right_col * width),
      bottomRow : height - (region.region_info.bounding_box.bottom_row * height)
    })
   
      //return { 
       //  topRow: face.top_row * height,
      //   leftCol: face.left_col * width,
       //  rightCol: width -(face.right_col * width),
     //    bottomRow: height - (face.bottom_row * height)
     //  }   
});
return boxArr;
}
 // displayFaceBox = (box) => {this.setState({box: box})};
 displayFaceBox = (boxAll) => {
   this.setState({boxAll: boxAll});
 }


    onPictureSubmit = () => {
       //console.log('click');
      this.setState({imageUrl: this.state.input})
      fetch('https://git.heroku.com/gentle-oasis-04342.git/imageurl', {
              method: 'post',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify({
             input:this.state.input
            })
        })
        .then(response => response.json())
      
      .then(response => {
        if (response) {
          fetch('https://git.heroku.com/gentle-oasis-04342.git/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
              
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        .catch(error => console.log(error));
        
     
    }  
  


  render() {
    const { isSignedIn, imageUrl, route, boxAll } = this.state ;
  return (
    <div className="App">
       <Particles className="particles" 
       params={particleOptions}
                />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange } />
      { route === 'home' ? 
           <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
             <ImageLinkForm 
                 onInputChange={this.onInputChange} 
                 onPictureSubmit={this.onPictureSubmit}/>
              <FaceRecognition boxAll={boxAll} imageUrl={imageUrl}/>
              </div>
            : (
              route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
          }
         </div>
      
  );
 }
}


export default App;
