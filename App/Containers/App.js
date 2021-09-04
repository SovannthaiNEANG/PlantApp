import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import firebase from 'react-native-firebase';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBavoSgWXvWUTyluLsthQVv_779LyRAnj8",
      authDomain: "planting-c2dc4.firebaseapp.com",
      projectId: "planting-c2dc4",
      storageBucket: "planting-c2dc4.appspot.com",
			databaseURL: "https://planting-c2dc4.appspot.com",
      messagingSenderId: "663538962438",
      appId: "1:663538962438:web:4651c3d089ee42b55bf387",
      measurementId: "G-47KBT7VB22"
    };
    
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
  }
  

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
