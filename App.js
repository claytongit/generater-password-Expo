import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Slider from '@react-native-community/slider';

import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';

export default function App(){

  const [ password, setPassword ] = useState('');
  const [ size, setSize ] = useState(12);

  function generatePass(){

    let pass = '';

    for(let i = 0, n = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * n))
    }

    setPassword(pass);

  }

  function copyPass(){

    Clipboard.setString(password);

    alert('Senha copiada!');

  }


  return(
    <>
      <StatusBar style="light" />
      <View style={styles.container}>

        <Image 
          source={require('./src/assets/logo.png')}
          style={styles.logo}
        />

        <Text style={ styles.title } >{ size } Caracteres</Text>

        <View style={ styles.area }>

          <Slider 
            style={{ height: 50 }}
            minimumValue={5}
            maximumValue={15}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#000"
            value={size}
            onValueChange={ valor => setSize(valor.toFixed(0))}
          />

        </View>

        <TouchableOpacity style={ styles.button } onPress={ generatePass }>

          <Text style={ styles.text }>Gerar Senha</Text>

        </TouchableOpacity>

        { password !==  '' && (

          <View style={ styles.area}>

            <Text 
              style={ styles.password } 
              onLongPress={copyPass}
            >
                { password }
            </Text>

          </View>

        )}

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14213d'
  },

  logo: {
    marginBottom: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  area: {
    width: '80%',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#457b9d',
    borderRadius: 7,
  },

  button: {
    width: '80%',
    backgroundColor: '#ffa200',    
    height: 50,
    borderRadius: 7,
    marginBottom: 25,
    marginTop: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },

  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  }
});