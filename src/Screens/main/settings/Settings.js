import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { observer, inject } from 'mobx-react';


import SettingsForm from './SettingsForm';
import AsyncStorage from '@react-native-community/async-storage';



@inject('userStore')
@observer
class Settings extends Component {
  constructor(props) {
    super(props)

    this.store = props.userStore;
  }

  // static options(passProps) {
  //   return {
  //     topBar: {
  //       visible: true,
  //       title: {
  //         text: 'Settings',
  //         color: '#000'
  //       }
  //     }
  //   };
  // }


  logOut = () => {
    AsyncStorage.removeItem('x-auth').then(() => {
      this.store.token = '';
      this.store.user = '';
    }).catch(() => {
      this.store.token = '';
      this.store.user = '';
    })
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.topBar}>
          <Text style={style.message}>User Settings</Text>
        </View>

        <SettingsForm user={this.store.user} token={this.store.token} />
        
        <TouchableOpacity style={style.logoutButtonContainer} onPress={this.logOut}>
          <Text style={style.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fb'
  },
  topBar: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 60,
    height: '8%',
    width: '90%',
    backgroundColor: '#2c3e50',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 34,
    color: 'white'
  },
  message: {
    color: 'black',
    fontSize: 23
  }
})

export default Settings;