//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content } from 'native-base';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import { Fonts, Metrics } from '../Themes';
import Header from './Header';

// create a component
const DetailScreen = (props) => {
    let product = props.products;
    const [loading, setLoading] = useState(false)
    


    const _handleAddToCart=()=> {
        setLoading(true)
        let data = [
            {
                pro_name: product.name,
                pro_url: product.url,
                price: product.price,
                pro_desc: product.desc,
                qty: Number(1)
            }
        ]
        
        let dataupdate = 
            {
                pro_name: product.name,
                pro_url: product.url,
                price: product.price,
                pro_desc: product.desc,
                qty: Number(1)
            }
        
        AsyncStorage.multiGet(["LoginStatus", "uid"]).then(response => {
            const uid = response[1][1];
            CloudFireStoreUserHelper.readCartItemByUid(uid, (status, response) => {
                if(status){
                    if(response.length>0){
                        CloudFireStoreUserHelper.updateAddToCartByUser(uid,dataupdate)
                    }else{
                        CloudFireStoreUserHelper.requestAddToCartByUser(uid,data,(status) => {
                            if(status) {
                                
                            }
                        })
                    }
                }
            })

            
        })
    }

    const _handlePressOnCart = () => {
        if(Actions.currentScene == 'DetailScreen'){
            Actions.CartScreen()
        }
    }

    return (
        <Container>
            <Header screen='DetailScreen' title={product.name} onPressCart={_handlePressOnCart} />
            <View style={{ flex: 1 }}>
                <View>
                    <Image source={{ uri: product.url }} style={{ width: Metrics.screenWidth, height: Metrics.screenWidth / 1.2, resizeMode: 'contain' }} />
                </View>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '70%' }}>
                        <Text style={{ fontFamily: Fonts.type.base }}>{product.desc}</Text>
                        <Text style={{ fontFamily: Fonts.type.bold }}>{product.name}</Text>

                    </View>
                    <View style={{ width: '30%',  alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.bold, fontSize: 17 }}>${product.price}</Text>
                        <TouchableOpacity onPress={_handleAddToCart} delayPressIn={1} style={{backgroundColor: '#0d8e6d', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <Text style={{ fontFamily: Fonts.type.base,color:'#fff', textAlign: 'center' }}>ADD TO CART</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <Content>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontFamily: Fonts.type.bold, fontSize: 18 }}>GROWING {product.name}</Text>
                        <Text style={{ fontFamily: Fonts.type.base, fontSize: 14, top: 10, textAlign: 'justify' }}>How to Plant Lilies:
                        Lily bulbs can be planted in spring, but getting them into the ground in autumn gives them a head start. Because they are stem rooters and the bulb often anchors a heavy blossom load, it’s critical to sink it at least 8 to 10 inches from top of bulb to top of soil. In regions where temperatures skyrocket above 90 degrees F on a daily basis, sink the bulbs an extra 4 inches or so deeper.

                        Planting tips:

                        Plant lilies in a berm or raised bed to ensure proper drainage
                        Lilies look best when planted in clusters of three or more bulbs
                        In areas of high rainfall, plant lily bulbs on their side to prevent rotting
                        If you have naturally acidic soil, add some garden lime to the planting hole</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontFamily: Fonts.type.bold, fontSize: 18 }}>{product.name} Care: </Text>
                        <Text style={{ fontFamily: Fonts.type.base, fontSize: 14, top: 10, textAlign: 'justify' }}>How to Plant Lilies:
                        Lily bulbs can be planted in spring, but getting them into the ground in autumn gives them a head start. Because they are stem rooters and the bulb often anchors a heavy blossom load, it’s critical to sink it at least 8 to 10 inches from top of bulb to top of soil. In regions where temperatures skyrocket above 90 degrees F on a daily basis, sink the bulbs an extra 4 inches or so deeper.

                        Planting tips:

                        Plant lilies in a berm or raised bed to ensure proper drainage
                        Lilies look best when planted in clusters of three or more bulbs
                        In areas of high rainfall, plant lily bulbs on their side to prevent rotting
                        If you have naturally acidic soil, add some garden lime to the planting hole</Text>
                    </View>
                </Content>
            </View>
        </Container>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default DetailScreen;
