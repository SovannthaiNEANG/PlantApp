//import liraries
import { Container, Content, Icon } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { UIActivityIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import { Colors, Fonts } from '../Themes';
import Header from './Header';

// create a component
const HomeScreen = () => {
    const [arryScroll, setarryScroll] = useState([
        { status: true, text: 'Plants' },
        { status: false, text: 'Planters' },
        { status: false, text: 'Tools' },
        { status: false, text: 'Decor' },
    ]);

    const [listCategories, setlistCategories] = useState([]);
    const [listSubCategories, setlistSubCategories] = useState([]);
    const [statusLoading, setLoading] = useState(false)



    const listProduct = [
        {
            url: 'https://images.squarespace-cdn.com/content/v1/5e8730ccab347a2207df8e09/1618488318820-0DWDO4FESJ6RLWQQMBKR/ke17ZwdGBToddI8pDm48kOxD3puFSoHI7pGTw0mGX7J7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UdCl0g1fmGjVBCnwPnSy03--kUWkUZ4ougHmIQ-t-LVFVgI4FK6Hv-LPRlRdIDmx2w/DSC_4464.jpg?format=1500w',
            name: 'Ficus',
            desc: 'Outdoor',
            price: '15.0'
        },
        {
            url: 'https://i.etsystatic.com/15265690/r/il/9c7e6c/1211862072/il_570xN.1211862072_3kuo.jpg',
            name: 'Lily',
            desc: 'Indoor',
            price: '17.0'
        },
        {
            url: 'https://www.coxandcox.co.uk/media/catalog/product/a/w/aw18-h-potmon-2622.png',
            name: 'Monstera',
            desc: 'Indoor',
            price: '15.5'
        },
        {
            url: 'https://cdn.shopify.com/s/files/1/0253/6701/9565/products/detail-Anthurium-Purple-Small_1000x1000.jpg?v=1606070319',
            name: 'Anthrium',
            desc: 'Indoor',
            price: '10.5'
        },
        {
            url: 'https://images.squarespace-cdn.com/content/v1/5e8730ccab347a2207df8e09/1618488318820-0DWDO4FESJ6RLWQQMBKR/ke17ZwdGBToddI8pDm48kOxD3puFSoHI7pGTw0mGX7J7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UdCl0g1fmGjVBCnwPnSy03--kUWkUZ4ougHmIQ-t-LVFVgI4FK6Hv-LPRlRdIDmx2w/DSC_4464.jpg?format=1500w',
            name: 'Ficus',
            desc: 'Outdoor',
            price: '15.0'
        },
        {
            url: 'https://i.etsystatic.com/15265690/r/il/9c7e6c/1211862072/il_570xN.1211862072_3kuo.jpg',
            name: 'Lily',
            desc: 'Indoor',
            price: '17.0'
        },
        {
            url: 'https://www.coxandcox.co.uk/media/catalog/product/a/w/aw18-h-potmon-2622.png',
            name: 'Monstera',
            desc: 'Indoor',
            price: '15.5'
        },
        {
            url: 'https://cdn.shopify.com/s/files/1/0253/6701/9565/products/detail-Anthurium-Purple-Small_1000x1000.jpg?v=1606070319',
            name: 'Anthrium',
            desc: 'Indoor',
            price: '10.5'
        },
    ]
    const listPlanters = [
        {
            url: 'https://www.gardenia-centre.com/allfiles/55115892020_31(6MTLC34CB).png',
            name: 'Brown',
            desc: 'Metal',
            price: '8.80'
        },
        {
            url: 'https://i0.wp.com/shop.theplantlounge.com.au/wp-content/uploads/2020/10/Abstract-Relief-Plant-Pot-Thick-Olive-Green.png?fit=403%2C448&ssl=1',
            name: 'Olive',
            desc: 'Caramic',
            price: '8.0'
        },
        {
            url: 'https://livefreecreative.co/wp-content/uploads/2015/06/DIY-Face-Plant-Pot-One-Little-Minute-Blog-4.jpg',
            name: 'Face Planter',
            desc: 'Caramic',
            price: '7.5'
        },
        {
            url: 'https://www.decorist.com/static/finds/product_images/full_size/205253-img59o.f10112424271a41465ea09722ab62166.png',
            name: 'Blue',
            desc: 'Fibre',
            price: '4.5'
        },
        {
            url: 'https://lh3.googleusercontent.com/proxy/Y3U3opEAuu7OPQJFKxzEYVlvOQLfP5dxijmuF47dEQnmqzZjB9ijnPbiyU4CdXs7yuP1VL4lInYApGzTyw7wNtf2o_8HAx9E-OF3iRTOyfbPPNdYA1F1tQ1TeYhQOjYkdnn-XTXJB4Jf_cZSVMviV_dvpGqT6Zl7cK9msK_69NM',
            name: 'Block',
            desc: 'Cement',
            price: '3.5'
        },
        {
            url: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/170/1702863230616999397/jpeg-600/G03.jpg',
            name: 'Yellow',
            desc: 'Caramic',
            price: '5.0'
        },
        {
            url: 'https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_959,dpr_1.0,q_auto:good,b_rgb:f5f6f4/v4/catalog/product/asset/b/3/f/f/b3ff56931d77257d16674ac41ef2d81b8c51d978_OACRAZ007GRY_UK_Razan_Set_2_Tall_Galvanized_Conical_Planters_Black_ar5_6_LB01_PS.png',
            name: 'Black',
            desc: 'Fibre',
            price: '4.5'
        },
    ]
    const listTools = [
        {
            url: 'https://ae01.alicdn.com/kf/HTB1.iiBdFyZBuNjt_jJq6zDlXXaW/Mini-Gardening-Shovel-Colorful-Metal-Small-Shovel-Garden-Spade-Hardware-Tools-Digging-Garden-Tools-Kids-Spade.jpg_Q90.jpg_.webp',
            name: 'Metal Shovel',
            desc: '',
            price: '2.80'
        },
        {
            url: 'https://gardentrading.images.blucommerce.com/gardentrading/product/WCGS01_square_0.jpg?auto=format%2Ccompress&bluhash=1785f000dea0b89979f4ec95afab7788&s=dbe8b370799478549520225c3ca677f4',
            name: 'Waterig Can',
            desc: '',
            price: '2.0'
        },
        {
            url: 'https://cf.shopee.ph/file/320ce29cffa0699e352366d69a24d001',
            name: 'Garden Glove',
            desc: '',
            price: '2.90'
        },
        {
            url: 'https://www.teknistore.com/106106-thickbox_default/honana-hg-gt7-3pcs-mini-garden-hand-tools-set-gardening-shovel-spade-rake-trowel-wood-handle.jpg',
            name: 'Hand Tools Set',
            desc: '',
            price: '4.5'
        },
        {
            url: 'data:image/jpeg;base64,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',
            name: 'Pyramid Trowel',
            desc: '',
            price: '2.5'
        },
        {
            url: 'https://cdn.shopify.com/s/files/1/1104/3638/products/cates-garden-tool-set-01.jpg?v=1530802082',
            name: 'Hand Tools Cambo',
            desc: '',
            price: '7.5'
        },
        
    ]
    const listDecors = [
        {
            url: 'https://images-na.ssl-images-amazon.com/images/I/81EP69-4PGL._AC_SX466_.jpg',
            name: 'Terranium Round',
            desc: 'Mini',
            price: '5.80'
        },
        {
            url: 'https://thegiftery.com/uploads/product/image/2019/04/13938.jpeg',
            name: 'Rose Mini Vase',
            desc: 'Mini',
            price: '3.0'
        },
        {
            url: 'https://www.woodies.ie/media/catalog/category/19677_Woodies_Christmas_2020_Digital_Ezine_v2_Category_Block_Plush_Animals_375x375.jpg',
            name: 'Santa Decor Figure',
            desc: 'Meduim',
            price: '8.90'
        },
        {
            url: 'https://cb.scene7.com/is/image/Crate/GlassTerrariumsWWoodLidFHS20/web_pdp_main_carousel_low/191216112242/glass-terrarium-with-wood-lid.jpg',
            name: 'Terranium Glass',
            desc: 'Mini',
            price: '4.5'
        },
        {
            url: 'data:image/jpeg;base64,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',
            name: 'Terranium Glass',
            desc: 'Meduim',
            price: '7.5'
        },
        {
            url: 'https://images-na.ssl-images-amazon.com/images/I/61KZJeoE2FL._AC_SX466_.jpg',
            name: 'Terranium Glass',
            desc: 'Meduim',
            price: '9.5'
        },
        
        
    ]

    
    useEffect(() => {
        CloudFireStoreUserHelper.requestAllCategories((status, response) => {
            if(status){
                var cate_key = response[0].key
                CloudFireStoreUserHelper.requestSubCateByCateKey(cate_key,(status, response)=>{
                    setlistSubCategories(response.sub_list)
                })
                setlistCategories(response)
            }
        })
	}, []);



    const [statusIndex, setStatusIndex] = useState({ title: null, status: 0 });
    const { title, status } = statusIndex;

    var current_index = 0;

    const _handlePressOnCart = () => {
        if(Actions.currentScene == 'HomeScreen'){
            Actions.CartScreen()
        }
    }

    const _handlePressTap = (item, index) => {
        setStatusIndex({ title: item.text, status: index })
        setLoading(true)
        CloudFireStoreUserHelper.requestSubCateByCateKey(item.key,(status, response)=>{
            if(status) {
                setlistSubCategories(response.sub_list)
                setLoading(false)

            }
        })
    }

    const _pressDetail = (item) => {
        // const db = firebase.firestore();
        // var ref = db.collection("sub_categories")
        // var plant = 'nwX21uwbcC9rdkKknn3H'
        // ref.doc(plant).set({
        //         sub_list: listDecors
        //     }).then((data) => {
        //         console.tron.log({ data: data });
    
        //     }).catch((error) => {
    
        //     });
        Actions.currentScene == 'HomeScreen' ? Actions.DetailScreen({products: item}) : null;
    }


    const renderItemList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>_pressDetail(item)} style={{ margin: 5, width: '48%', height: 270, justifyContent: 'center', marginBottom: 10, backgroundColor: '#ebf4f2', borderRadius: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 200, width: '100%' }}>
                    <Image source={{ uri: item.url }} style={{ width: '100%', height: 200, resizeMode: 'cover', overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                </View>
                <View style={{ height: 270 - 200, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{width: '60%'}}>
                        <Text style={{ fontFamily: Fonts.type.base, color: '#4B4949' }}>{item.desc}</Text>
                        <Text style={{ fontFamily: Fonts.type.base, color: '#4B4949', fontSize: Fonts.size.regular, bottom: 7 }}>{item.name}</Text>
                    </View>
                    <View style={{width: '40%',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontFamily: Fonts.type.bold, color: '#4B4949', fontSize: Fonts.size.regular }}>${item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <Header screen='HomeScreen' title='PLANTY' onPressCart={_handlePressOnCart} />
            <View style={{ padding: 10 }}>
                <View>
                    <Text style={{ fontSize: Fonts.size.input, fontFamily: Fonts.type.bold }}>Say hello to a fresher</Text>
                    <Text style={{ fontSize: Fonts.size.input - 2, fontFamily: Fonts.type.base, }}>Spacce & feeling.</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ marginTop: 10, width: '100%', backgroundColor: '#CFE6E2', height: 45, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '12%', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='search' type='EvilIcons' style={{ color: '#4A8178' }} />
                        </View>
                        <View style={{ width: '85%', height: 45, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.base, }}
                                placeholder='Search products...'
                            />
                        </View>
                    </View>

                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {listCategories.map((item, index) => {
                        return (
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomColor: status == index ? '#4A8178' : null, borderBottomWidth: status == index ? 1 : null }}>
                                <TouchableOpacity onPress={() => _handlePressTap(item, index)} style={{ backgroundColor: Colors.main_color, padding: 7, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: Fonts.type.bold, fontSize: Fonts.size.regular }}>{item.cate_name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <Content style={{paddingLeft: 10, paddingRight: 10}} >
                {statusLoading ? 
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <UIActivityIndicator color='#0d8e6d' size={25} style={{  zIndex: 1000 }} />
                    </View>
                :
                    <FlatList
                        data={listSubCategories}
                        renderItem={renderItemList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                    />
                }
            </Content>
        </Container>
    );
};

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default HomeScreen;
