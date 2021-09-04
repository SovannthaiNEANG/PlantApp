import firebase from 'react-native-firebase';

const db = firebase.firestore();

const CloudFireStoreUserHelper = {
    creatNewUser: function (uid, data, callback) {
        db.collection('users').doc(uid).set({
            ...data
        }).then(function (error) {
        })
        var status = true
        return callback(status);
    },
    readUserExisting: function (uid, callback) {
        db.collection("users").doc(uid)
        .onSnapshot(function (doc) {
            callback(true, doc._data);
        });
    },

    isAccountExisting: function (uid, callback) {
        db.collection("users").doc(uid).get()
        .then(function (doc) {
            return callback(true, doc._data);
        });
    },

    requestAllCategories: function (callback) {
        db.collection("categories").onSnapshot(function (querySnapshot) {
            let newObjectData = [];
            var status = true
            querySnapshot.forEach(function (doc) {
                if (doc) {
                    let concatObj = { ...doc.data(), status: false }
                    newObjectData.push(concatObj)
                }
            });
            return callback(status, newObjectData);
        });
    },

    requestSubCateByCateKey: function (cate_key, callback) {
        db.collection("sub_categories").doc(cate_key)
        .onSnapshot(function (doc) {
            if(doc._data == undefined){
                return callback(true,[]);
            }else{
                return callback(true, doc._data);
            }
        });
    },

    requestAddToCartByUser: function (uid,data, callback) {
        db.collection("carts").doc(uid).set({carts: data}).then(function (error) {
        })
        var status = true
        return callback(status);
       
    },
    
    readCartItemByUid: function (uid, callback) {
        db.collection("carts").doc(uid).onSnapshot(function (doc) {
            if(doc._data == undefined){
                return callback(true,[]);
            }else{
                return callback(true, doc._data.carts);
            }
        });
    },
    removeItemCarts: function (uid,data) {
        db.collection("carts").doc(uid).update({'carts': firebase.firestore.FieldValue.arrayRemove(data)})
    },

    updateAddToCartByUser: function (uid,data) {
        db.collection("carts").doc(uid).update({'carts': firebase.firestore.FieldValue.arrayUnion(data)})
    },
}
export default CloudFireStoreUserHelper;