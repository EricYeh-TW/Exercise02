import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import Clarifai from 'clarifai';
import "./App.css";

const app = new Clarifai.App({
  apiKey: '271ca4335e4e49e483ecd4fd2e591750'
 });


class App extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignIn: false
    }
  }

  

  faceLocation = (obj) => {
    const boxPosition = obj.outputs[0].data.regions[0].region_info.bounding_box;
    const pic = document.getElementById('inputPic');
    const width = Number(pic.width);
    const height = Number(pic.height);
    return {
       left: boxPosition.left_col * width,
       top: boxPosition.top_row * height,
       right: width - (boxPosition.right_col * width),
       bottom: height - (boxPosition.bottom_row * height)
    }
  }

  detectBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.detectBox(this.faceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({isSignIn: false})
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route});
  }
  
  render() {
    const { isSignIn, imageUrl, route, box } = this.state;
    return (
      <div className="App" >
        <Navigation isSignIn={isSignIn} onRouteChange={this.onRouteChange}/>
      { route === 'home'
        ? <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonClick = {this.onButtonClick} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </> 
        : this.state.route === 'register'
        ?   <Register onRouteChange={this.onRouteChange} />
        :   <Signin onRouteChange={this.onRouteChange} />
      }
      </div>
    );
  }
}

export default App;
