import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { readMnemonic, createAccount, savePublicKey, mnemonicToSeed } from '../../api';
import LottieView from 'lottie-react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import * as Random from 'expo-random';
import { randomInt } from 'crypto';


const PantallaCarga = ({navigation}: {navigation: any}) => {

    const [palabras, setPalabras] = useState("")

    async function leerMnemonic() {
        const mnemonic = readMnemonic()
        mnemonic.then((value) => {
            setPalabras(value)
        })
    }

    leerMnemonic()

    //Crear cuenta
    async function crearCuenta(palabras: string) {
        const docePalabras = mnemonicToSeed(palabras)
        docePalabras.then((value) => {
            const acc = createAccount(value)
            acc.then((value) => {
                savePublicKey(value.publicKey.toString())
                setTimeout(() => {
                    navigation.navigate('Balance')
                }, 2000)
            })
        })
    }

    setTimeout(() => {
        crearCuenta(palabras)
    }, 2000);
    
    return (
        <View style={styles.body}>
            <View style={styles.body}>
                <LottieView
                    style={styles.lottie}
                    source={require("./Lottie/flowerCarga.json")}
                    autoPlay
                />
            </View>

        </View>
    )
}

export default PantallaCarga

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: '8%',
        alignItems:'center',
        justifyContent:'center'
    },
    txtcarga: {
        top: RFValue(90),
        fontSize:RFValue(18),
    },
    fondo:{
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center'
    },
    lottie: {
        width:200,
        height:200,
        alignItems:'center',
        justifyContent:'center'
    },
})
function txtcarga() {
    throw new Error('Function not implemented.');
}

function generaFrase(palabras: string) {
    throw new Error('Function not implemented.');
}

