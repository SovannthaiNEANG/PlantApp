import React, { useEffect,useState } from 'react'
import { ScrollView, Text, Image, View,StatusBar,StyleSheet,YellowBox } from 'react-native'
import { Images,Colors, Metrics } from '../Themes'
import { useSelector, useDispatch } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Actions } from 'react-native-router-flux'


function WelcomeScreen (props){
	const [loadingWelcome,setWelcome] = useState(true)
	const [loginStatus,setLogin] = useState(null)


    // componentDidMount() {
    //     AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
    //         const LoginStatus = response[0][1];
    //         const token = response[1][1];
	// 		LoginStatus ?
	// 			setTimeout(() => {
	// 				Actions.HomeScreen()
	// 			},2500)
	// 		:Actions.LaunchScreen()
    //     })
    // }
    

	useEffect(() =>{
        if(Actions.currentScene == 'WelcomeScreen'){
            AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
                const LoginStatus = response[0][1];
                const token = response[1][1];
                LoginStatus ?
                    setTimeout(() => {
                        Actions.HomeScreen()
                    },2500)
                :Actions.LaunchScreen()
            })
        }
	}, []);
	console.disableYellowBox = true;
    YellowBox.ignoreWarnings(['Warning:']);
	return (
		<View style={styles.container}>
			<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Image source={Images.logo} style={{width:Metrics.screenWidth/2.5,height: Metrics.screenWidth/2.5}} />
            </View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	},
	
	content: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
});

export default WelcomeScreen;
