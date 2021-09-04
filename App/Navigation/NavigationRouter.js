import React, { Component } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import { connect } from 'react-redux'
import LaunchScreen from '../Containers/LaunchScreen'
import Login from './../Containers/Login'
import SignupScreen from './../Containers/SignupScreen'
import HomeScreen from './../Containers/HomeScreen'
import DetailScreen from './../Containers/DetailScreen'
import DrawerScreen from './../Containers/DrawerScreen';
import WelcomeScreen from './../Containers/WelcomeScreen'
import CartScreen from './../Containers/CartScreen'
class NavigationRouter extends Component {

    render() {
        return (
            <Router>
                {/* <Drawer contentComponent={DrawerScreen} > */}
                    <Scene key="root">
                        <Scene initial={true} key="LaunchScreen" component={LaunchScreen} hideNavBar={true} />
                        <Scene initial={true} key="WelcomeScreen" component={WelcomeScreen} hideNavBar={true} />
                        <Scene key="Login" component={Login} hideNavBar={true} />
                        <Scene key="SignupScreen" component={SignupScreen} hideNavBar={true} />
                        <Scene key="HomeScreen" component={HomeScreen} hideNavBar={true} />
                        <Scene key="DetailScreen" component={DetailScreen} hideNavBar={true} />
                        <Scene key="DrawerScreen" component={DrawerScreen} hideNavBar={true} />
                        <Scene key="CartScreen" component={CartScreen} hideNavBar={true} />
                    </Scene>
                {/* </Drawer> */}
            </Router>
        );
    }
}


export default connect(null, null)(NavigationRouter)
