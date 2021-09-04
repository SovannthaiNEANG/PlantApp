import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image,StyleSheet } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../Themes';
import { Badge, Icon } from 'native-base'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countCart: 0
        };
    }
    static propTypes = {
        title: PropTypes.string,
        screen:PropTypes.string,
        onPressCart:PropTypes.func,
        onBack:PropTypes.func
    }

    componentDidMount() {
        AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
            const uid = response[1][1];
            CloudFireStoreUserHelper.readCartItemByUid(uid, (status, response) => {
                if(status){
                    this.setState({countCart: response.length})
                }
            })

            
        })
    }
    

    _hadleMenuIcon = () => {
        Actions.DrawerScreen()
    }

    _handleBack = () => {
       Actions.pop()
    }

    render() {
        const { title,screen,onPressCart,onBack } = this.props;
        var isBack = false;
        if (screen == 'HomeScreen' ) {
            isBack = false;
        }else if(screen == 'DetailScreen' || screen == 'DrawerScreen' || screen == 'CartScreen'){
            isBack = true
        }
        return (
            <View style={[styles.mainHeaderFooterContainer]}>
                {isBack?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height:56}}>
                        <TouchableOpacity onPress={this._handleBack} delayPressIn={0} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon type= 'Entypo' name='chevron-small-left' style={{ color: Colors.snow, fontSize:30}} />
                        </TouchableOpacity>
                        <View style={{ width: '78%'  }}>
                            <Text style={{ fontSize: Fonts.size.regular, color: Colors.snow, fontFamily: Fonts.type.bold,paddingLeft:Metrics.marginHorizontal }}>{title}</Text>
                        </View>
                        <View style={{width:'15%',paddingRight:Metrics.marginHorizontal, alignItems: 'flex-end'}}>
                            <TouchableOpacity delayPressIn={0} onPress={onPressCart} style={{ justifyContent: 'center', alignItems: 'center'}} >
                                <Badge style={{position: 'absolute',bottom: 15,right: -5,backgroundColor: '#C82121',height:18,alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
                                    <Text style={{textAlign: 'center',textAlignVertical: 'center',fontFamily:Fonts.type.base,fontSize:Fonts.size.medium,paddingBottom: 2,color:Colors.snow}}>{this.state.countCart}</Text>
                                </Badge>
                                <Icon name='shopping-cart' type='Feather'  style={{color: Colors.snow, fontSize: 23}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height:56}}>
                        <TouchableOpacity onPress={this._hadleMenuIcon} delayPressIn={0} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon type= 'MaterialIcons' name='menu-open' style={{ color: Colors.snow, fontSize:30}} />
                        </TouchableOpacity>
                        <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center'  }}>
                            <Text style={{ fontSize: Fonts.size.input, color: Colors.snow, fontFamily: Fonts.type.bold,paddingLeft:Metrics.marginHorizontal }}>{title}</Text>
                        </View>
                        <View style={{width:'15%',paddingRight:Metrics.marginHorizontal, alignItems: 'flex-end'}}>
                            <TouchableOpacity delayPressIn={0} onPress={onPressCart} style={{ justifyContent: 'center', alignItems: 'center'}} >
                                <Badge style={{position: 'absolute',bottom: 15,right: -5,backgroundColor: '#C82121',height:18,alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
                                    <Text style={{textAlign: 'center',textAlignVertical: 'center',fontFamily:Fonts.type.base,fontSize:Fonts.size.medium,paddingBottom: 2,color:Colors.snow}}>{this.state.countCart}</Text>
                                </Badge>
                                <Icon name='shopping-cart' type='Feather'  style={{color: Colors.snow, fontSize: 23}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainHeaderFooterContainer:{
        backgroundColor:'#0d8e6d', 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingTop: Platform.OS == "android" ? 4 : 0,
        height:56
    }
});



export default Header
