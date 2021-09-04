import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { View, Text,TouchableOpacity, FlatList, Image,   } from 'react-native';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import { Fonts } from '../Themes';
import Header from './Header';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listCart: []
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
        const LoginStatus = response[0][1];
        const uid = response[1][1];
        CloudFireStoreUserHelper.readCartItemByUid(uid,(status, response) => {
            if(status){
                this.setState({listCart: response})
            }
        })
    })
  }

  _handlePressOnCart=()=> {

  }

  _handleRemoveItem=(item)=>{
    AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
        const uid = response[1][1];
        CloudFireStoreUserHelper.removeItemCarts(uid,item);

    })
  }

    renderItemList = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row',justifyContent: 'space-between', margin: 5, width: '100%', height: 100, justifyContent: 'center', backgroundColor: '#ebf4f2', borderRadius: 10 }}>
                <View style={{ justifyContent: 'flex-start',alignSelf: 'flex-start', height: 100, width: '30%'}}>
                    <Image source={{ uri: item.pro_url }} style={{ width: '100%', height: 100, resizeMode: 'contain', overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                </View>
                
                <View style={{width: '80%', height: 100, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{width: '70%', flexDirection: 'column', justifyContent:'center'}}>
                        <Text style={{ fontFamily: Fonts.type.base, color: '#4B4949' }}>{item.pro_name}</Text>
                        <Text style={{ fontFamily: Fonts.type.base, color: '#4B4949', fontSize: Fonts.size.regular, bottom: 7 }}>{item.pro_desc}</Text>
                    </View>
                    <View style={{width: '30%',justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=>this._handleRemoveItem(item)} delayPressIn={1} style={{alignSelf: 'flex-end',paddingRight:20, paddingBottom: 10}}>
                            <Icon  name='circle-with-minus' type='Entypo' style={{fontSize: 20}}/>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: Fonts.type.base, color: '#4B4949', fontSize: Fonts.size.medium, bottom: 5 }}>Quatity: {item.qty}</Text>
                        <Text style={{ fontFamily: Fonts.type.base, color: '#4B4949', fontSize: Fonts.size.medium, bottom: 5, }}>${item.price}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }
  

  render() {
    const { listCart } = this.state
    return (
      <Container>
        <Header screen='CartScreen' title='Carts' onPressCart={this._handlePressOnCart} />
        <Content>
            <View style={{padding: 10}}>
                <Text style={{fontFamily: Fonts.type.bold, color: '#4B4949', fontSize: Fonts.size.medium-1}}>Your items have been added</Text>
            </View>
            <View style={{paddingLeft: 10, paddingRight: 10}}>
                <View>
                    <FlatList
                        data={listCart}
                        renderItem={this.renderItemList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </Content>
        <View style={{paddingTop: 10}}>
            <TouchableOpacity style={{alignItems: 'center', backgroundColor:  '#0d8e6d', padding: 10}}>
                <Text style={{fontFamily: Fonts.type.base, color: '#FAFAFA', fontSize: Fonts.size.regular,}}>Check-out</Text>
            </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default CartScreen;
