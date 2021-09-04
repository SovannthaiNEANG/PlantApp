import { Container, Icon } from 'native-base';
import React, { PureComponent, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Colors, Fonts, Images, Metrics } from '../Themes';
import firebase from 'react-native-firebase'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';



function SignupScreen (props) {

    const [inputValues, setInputValues] = useState({ phoneNumber: '', name: '', email: '', password: '' });
    const [inputError, setinputError] = useState({ name: false, email: false, phone: false, password: false });
    const [statusLoading, setLoading] = useState(false)

    const _hadleSignIn=()=>{
        Actions.currentScene == 'SignupScreen' ? Actions.Login() : null;
    }

    const _handleSignUp = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let checkNumber = inputValues.phoneNumber[0]==0? true : false
        setLoading(true)
        if (inputValues.email != '' && inputValues.name != '' && inputValues.phoneNumber != '') {
            if(reg.test(inputValues.email) === true && inputValues.phoneNumber.length>=9 && checkNumber){
                firebase.auth().createUserWithEmailAndPassword(inputValues.email, inputValues.password).then((data) => {
                    let userObject = {
                        key:data.user.uid,
                        username:inputValues.name,
                        email:data.user.email,
                        password:inputValues.password,
                        phone_number:inputValues.phoneNumber,
                        created_date:firebase.firestore.FieldValue.serverTimestamp(),
                    }
                    let uid = data.user.uid
                    CloudFireStoreUserHelper.creatNewUser(uid,userObject, (status) => {
                        if(status){
                            setLoading(false)
                            AsyncStorage.multiSet([['LoginStatus', 'true'], ['uid', uid]]);
                            Actions.reset('HomeScreen')

                        }
                    })
                }).catch(error => {
                    Alert.alert('Attention!', error.message)
                    setLoading(false)

                }) 
            }else {
                setLoading(false)
                Alert.alert('Attention!', 'Your email/phone number is invalid, Please check again.')
            }
        }else {
            setLoading(false)
            Alert.alert('Attention!', 'Please fill in your information following require fields.')
        }
        
        // Actions.currentScene == 'SignupScreen' ? Actions.HomeScreen() : null;
    }

    const handleOnChange = event => {
        setInputValues({ phoneNumber: event, confirmPhone: event, name: inputValues.name, email: inputValues.email, password: inputValues.password })
    };

    const _handleEmail = (text) => {
        setInputValues({ email: text, name: inputValues.name, phoneNumber: inputValues.phoneNumber, password: inputValues.password })
    }

    return (
        <Container style={{ flex: 1, }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ width: Metrics.screenWidth, height: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Images.logo} resizeMode="contain" />
                    <Text style={{ marginTop: 10, fontSize: 15, fontFamily:Fonts.type.bold }}>Let's Get Start with Plan Application.</Text>
                    <Text style={{ marginTop: 10, fontSize: 13, color: '#8A8585', textAlign: 'center', fontFamily:Fonts.type.base }}>Let's create your account.</Text>
                </View>
                <View style={{ height: '40%', }}>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            style={{ borderColor: '#8A8585', borderWidth: 0.4, height: 50, borderRadius: 5, paddingLeft: 10, fontFamily: Fonts.type.base }}
                            placeholder='Username'
                            value={inputValues.name}
                            placeholderTextColor={inputError.name ? Colors.error : Colors.charcoal}
                            onChangeText={(text) => setInputValues({ name: text, email: inputValues.email, phoneNumber: inputValues.phoneNumber, password: inputValues.password })}
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            style={{ borderColor: '#8A8585', borderWidth: 0.4, height: 50, borderRadius: 5, paddingLeft: 10, fontFamily: Fonts.type.base }}
                            placeholder='Email Address'
                            value={inputValues.email}
                            placeholderTextColor={inputError.email ? Colors.error : Colors.charcoal}
                            onChangeText={(text) => _handleEmail(text)}
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            style={{ borderColor: '#8A8585', borderWidth: 0.4, height: 50, borderRadius: 5, paddingLeft: 10, fontFamily: Fonts.type.base }}
                            placeholder='Phone Number'
                            keyboardType='number-pad'
                            value={inputValues.phoneNumber}
                            placeholderTextColor={inputError.phone ? Colors.error : Colors.charcoal}
                            // onEndEditing={handleEndInputPhoneNum}
                            onChangeText={handleOnChange}
                            maxLength={12}
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            style={{ borderColor: '#8A8585', borderWidth: 0.4, height: 50, borderRadius: 5, paddingLeft: 10, fontFamily: Fonts.type.base }}
                            placeholder='Password'
                            secureTextEntry={true}
                            value={inputValues.password}
                            placeholderTextColor={inputError.phone ? Colors.error : Colors.charcoal}
                            // onEndEditing={handleEndInputPhoneNum}
                            onChangeText={(text) => setInputValues({ name: inputValues.name, email: inputValues.email, phoneNumber: inputValues.phoneNumber, password: text })}
                        />
                    </View>
                </View>
                <View style={{ height: '20%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={_handleSignUp} delayPressIn={0} style={{ width: '45%', padding: 10, backgroundColor: '#197564', borderWidth: 0.5, height: 45, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {statusLoading?
                        <UIActivityIndicator color={Colors.snow} size={25} style={{  zIndex: 1000 }} />
                        :
                        <Text style={{ textAlign: 'center', fontSize: 15, color: '#ffffff', fontFamily: Fonts.type.bold }}>SIGN-UP</Text>
                    }
                        <Icon name='ray-start-arrow' type='MaterialCommunityIcons' style={{ color: '#eeeeee', marginLeft: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_hadleSignIn}>
                   
                        <Text style={{marginTop: 10, fontSize: 12, color:'#7E7979', fontFamily: Fonts.type.base }}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Container>
    );
}

export default SignupScreen;
