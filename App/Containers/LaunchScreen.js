import { Icon } from 'native-base'
import React, { Component } from 'react'
import { ScrollView, Text, Image, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Fonts, Images, Metrics } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

function LaunchScreen(props) {


  const _handleSignup =()=>{
    Actions.currentScene == 'LaunchScreen' ? Actions.SignupScreen() : null;

  }

  const _handleSignIn = () => {
    Actions.currentScene == 'LaunchScreen' ? Actions.Login() : null;
  }

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{height: Metrics.screenHeight/1.3}}>
            <Image source={Images.splash_bg} style={{flex: 1,resizeMode: "cover",justifyContent: "center"}}/>
          </View>

          <View style={{justifyContent: 'center', backgroundColor: '#ECE9EA', height: Metrics.screenWidth/2, position: 'absolute', top: '95%', width: Metrics.screenWidth, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
            <Text style={{textAlign: 'center', fontSize: 20,fontFamily: Fonts.type.bold}}>Say hello to a fresher {'\n'}space and feeling</Text>
            <Text style={{textAlign: 'center', fontSize: 14,top: 10, fontFamily: Fonts.type.base}}>Bring your home to life with some{'\n'}new green friends.</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginTop: 10}}>
              <TouchableOpacity onPress={_handleSignup} delayPressIn={0} style={{width: '45%', padding: 10, borderColor: '#197564', borderWidth: 0.5, height: 45, borderRadius: 50}}>
                <Text style={{textAlign: 'center', fontSize: 15,color: '#197564',fontFamily: Fonts.type.bold}}>Sign-up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={_handleSignIn} delayPressIn={0} style={{width: '45%', padding: 10, backgroundColor: '#197564', borderWidth: 0.5, height: 45, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <Text style={{textAlign: 'center', fontSize: 15,color: '#ffffff',fontFamily: Fonts.type.bold}}>Login</Text>
                <Icon name='ray-start-arrow' type='MaterialCommunityIcons' style={{color: '#eeeeee',marginLeft: 10}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
}
export default LaunchScreen;
