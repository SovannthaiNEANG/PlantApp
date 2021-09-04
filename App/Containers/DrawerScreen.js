import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Images, Colors, Fonts} from '../Themes'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Badge, Container, Icon } from 'native-base'
import Header from './Header'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UIActivityIndicator } from 'react-native-indicators'
import firebase from 'react-native-firebase'

class DrawerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            arrayList:[
                { text: 'Order', icon: 'list-circle-outline',type:'Ionicons', status: false },
                { text: 'Whitelist', icon: 'favorite-border', type:'MaterialIcons', status: false },
                { text: 'Log-out', icon: 'log-out',type:'Feather', status: false }
            ],
            userData:null,
            loading: true
        }
    }

    componentDidMount() {
        AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
            const LoginStatus = response[0][1];
            const uid = response[1][1];
            CloudFireStoreUserHelper.isAccountExisting(uid, (status, response) => {
                if (status) {
                    this.setState({userData: response, loading: false})
                }
            })
        })
    }
    _handleOnPressed=(index)=>{
        const { arrayList } = this.state
        if(index==arrayList.length-1){
            Alert.alert('Attention!', 'Are you sure, you want to logout?', [{ text: 'NO', onPress: () => { cancelable: false } }, { text: 'YES', onPress: this.handleSuccessfullyConfirmationLogout }], { cancelable: false }); 
        }
    }
    handleSuccessfullyConfirmationLogout = () => {
        this.setState({loading: true})
		AsyncStorage.multiRemove(['LoginStatus', 'uid']);
		firebase.auth().signOut();
		setTimeout(() => {
            Actions.LaunchScreen()
			this.setState({loading: false, userData: null})
		}, 2000);
	}

    renderItemList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>this._handleOnPressed(index)} style={{ flexDirection: 'row',marginTop: 5, borderBottomColor: '#C0DBD5', borderBottomWidth: 0.3, padding: 10 }}>
                <View style={{ width: '20%' }}>
                    <Icon name={item.icon} type={item.type} style={{color: '#3C7C6C', fontSize: 25}} />
                </View>
                <View>
                    <Text style={{ fontSize: Fonts.size.medium, fontFamily: Fonts.type.base }}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    render() {
        const { userData, loading, arrayList } = this.state
        if(loading) return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <UIActivityIndicator color='#0d8e6d' size={25} style={{  zIndex: 1000 }} />
            </View>
        )
        return (
            <Container style={{ flex: 1 }}>
                <Header screen='DrawerScreen' title='Settings' />
                <View style={{ flex: 10, }}>
                    <View style={{alignSelf: 'center',padding: 10, }}>
                        <Image source={{uri: 'https://i.pinimg.com/736x/d1/d0/45/d1d0454dda886f3a6ea84f912abeec70.jpg'}} style={{width: 100, height: 100, borderRadius: 50, overflow: 'hidden'}} />
                        <View style={{paddingTop: 10}}>
                            <Text style={{ fontSize: Fonts.size.medium, color: Colors.main_button, textAlign: 'center', fontFamily: Fonts.type.base }}>{ userData !=null?userData.username:''} / {userData !=null?userData.phone_number:''}</Text>
                            <Text style={{ fontSize: Fonts.size.medium, color: Colors.main_button, textAlign: 'center', fontFamily: Fonts.type.base }}>{userData !=null?userData.email:''}</Text>
                        </View>
                    </View>

                    <View style={{padding: 10}}>
                        <FlatList
                            data={arrayList}
                            renderItem={this.renderItemList}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    
                </View>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity onPress={() => Actions.HomeScreen()}>
                        <Image source={Images.logo} style={{ alignSelf: 'center', width: 50, height: 50 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: Fonts.size.small+1, color: Colors.main_button, textAlign: 'center', paddingTop: 10, fontFamily: Fonts.type.base }}>Copyright @2021 Planty App</Text>
                </View>
            </Container>
        )
    }
}


export default DrawerScreen