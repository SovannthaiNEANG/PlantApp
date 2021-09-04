import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Icon } from 'native-base';
import React, { PureComponent, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { UIActivityIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import { Colors, Fonts, Images, Metrics } from '../Themes';

function Login (props) {
    const [inputValues, setInputValues] = useState({ email: '', password: '' });
    const [statusLoading, setLoading] = useState(false)

    const _hadleSignUp=()=>{
        Actions.currentScene == 'Login' ? Actions.SignupScreen() : null;
    }

     
    const _handleSignin = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(Actions.currentScene == 'Login'){
            setLoading(true)
            if (inputValues.email != '' && inputValues.name != '' && inputValues.password != '') {
                if(reg.test(inputValues.email) === true){
                    firebase.auth().signInWithEmailAndPassword(inputValues.email, inputValues.password).then((data) => {
                        // db.collection("users").doc(data.user.uid).onSnapshot(doc =>{
                            setLoading(false)
                            AsyncStorage.multiSet([['LoginStatus', 'true'], ['uid',  data.user.uid]]);
                            Actions.reset('HomeScreen')
                        // });
                        
                    }).catch((error) => {
                        Alert.alert('Attention!', error.message)
                        setLoading(false)

                    });
                }else {
                    setLoading(false)
                    Alert.alert('Attention!', 'Your email/password is invalid, Please check again.')
                }
            }else {
                setLoading(false)
                Alert.alert('Attention!', 'Please fill in your information following require fields.')
            }
        }
    }
    return (
        <Container style={{ flex: 1, }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ width: Metrics.screenWidth, height: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Images.logo} resizeMode="contain" />
                    <Text style={{ marginTop: 10, fontSize: 15, fontFamily: Fonts.type.bold }}>Welcome to Plan Application</Text>
                    <Text style={{ marginTop: 10, fontSize: 13, color: '#8A8585', textAlign: 'center', fontFamily: Fonts.type.base }}>Sign-in to buy your {'\n'}favorite plan for your green life.</Text>
                </View>
                <View style={{ height: '40%', }}>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            style={{ borderColor: '#8A8585', borderWidth: 0.4, height: 50, borderRadius: 5, paddingLeft: 10, fontFamily: Fonts.type.base }}
                            placeholder='Email Address'
                            value={inputValues.email}
                            onChangeText={(text) => setInputValues({ email: text, password: inputValues.password })}
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            style={{ borderColor: '#8A8585', borderWidth: 0.4, height: 50, borderRadius: 5, paddingLeft: 10, fontFamily: Fonts.type.base }}
                            placeholder='Password'
                            value={inputValues.password}
                            secureTextEntry={true}
                            onChangeText={(text) => setInputValues({ email: inputValues.email, password: text })}
                        />
                    </View>
                </View>
                <View style={{ height: '20%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={_handleSignin} delayPressIn={0} style={{ width: '45%', padding: 10, backgroundColor: '#197564', borderWidth: 0.5, height: 45, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {statusLoading?
                        <UIActivityIndicator color={Colors.snow} size={25} style={{  zIndex: 1000 }} />
                        :
                        <Text style={{ textAlign: 'center', fontSize: 15, color: '#ffffff', fontFamily: Fonts.type.bold }}>LOGIN</Text>
                    }
                        <Icon name='ray-start-arrow' type='MaterialCommunityIcons' style={{ color: '#eeeeee', marginLeft: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_hadleSignUp}>
                        <Text style={{marginTop: 10, fontSize: 12, color:'#7E7979', fontFamily: Fonts.type.base }}>Don't have an account? Sign-up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Container>
    );
}

export default Login;
