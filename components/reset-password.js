/*
*Reset-Password Page
*/
import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Button } from 'react-native';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';

import CommonTasks from '../common-tasks/common-tasks.js';
export default class ResetPassword extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          userNewPassword : '',
          userConfirmNewPassword : '',
          userPasswordToken : this.props.navigation.state.params.userResetPasswordToken,
          visible   : false,
      }
  }

  static navigationOptions = {
    header : null,
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <KeyboardAwareScrollView>
          <View style = {styles.container}>

            <View
              style = { styles.backgroundImageContainer } >
              <Image
                style  = { styles.backgroundImage }
                source = { require( '../assets/images/background.png' )}
              />
            </View>

            <Text style = { styles.capsText }> RESET PASSWORD</Text>

            <Image
                style  = { styles.keyImage }
                source = { require( '../assets/images/key.png' ) }
            />

            <View style = { styles.normalWhitTextContainer }>
            <Text style = { styles.normalWhiteText }> Please Enter Your New Password </Text>
            </View>

            <View style = { styles.inputHolder }>
                <Image
                    style  = { styles.inputImage }
                    source = { require('../assets/images/locked.png' )}
                />
                <TextInput
                    secureTextEntry
                    style                 = { styles.textInput }
                    selectionColor        = "#5C85D7"
                    returnKeyType         = 'next'
                    autoCorrect           = {false}
                    autoCapitalize        = "none"
                    onSubmitEditing       = { () => this.userConfirmNewPasswordInput.focus() }
                    placeholder           = "New Password"
                    placeholderTextColor  = "#AED6F1"
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText          = { (input) => this.setState( { userNewPassword : input } ) }
                    ref                   = { ( (input) => this.userNewPasswordInput = input ) }
                />
            </View>
            <View style = { styles.inputHolder }>
                <Image
                    style  = { styles.inputImage }
                    source = { require('../assets/images/locked.png' )}
                />
                <TextInput
                    secureTextEntry
                    style                 = { styles.textInput }
                    selectionColor        = "#5C85D7"
                    returnKeyType         = 'go'
                    autoCorrect           = {false}
                    autoCapitalize        = "none"
                    onSubmitEditing       = { () => this._checkForInvalidInputs() }
                    placeholder           = "Confirm New Password"
                    placeholderTextColor  = "#AED6F1"
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText          = { (input) => this.setState( { userConfirmNewPassword : input } ) }
                    ref                   = { ( (input) => this.userConfirmNewPasswordInput = input ) }
                />
            </View>
            <TouchableOpacity style = { styles.yellowButton } onPress = {()=>this._checkForInvalidInputs()}>
              <Text style = { styles.recoverText }>Reset Password</Text>
            </TouchableOpacity>

          </View>
      </KeyboardAwareScrollView>
    );
  }

  _checkForInvalidInputs(){
    console.log();
    if(this.state.userNewPassword===''||this.state.userNewPassword.trim()===''){
        CommonTasks._displayToast("Please enter your New Password");
        this.userNewPasswordInput.focus();
        return false;
    }
    if(this.state.userConfirmNewPassword===''||this.state.userConfirmNewPassword.trim()===''){
        CommonTasks._displayToast("Please Confirm your newly entered Password");
        this.userConfirmNewPasswordInput.focus();
        return false;
    }
    if(this.state.userNewPassword!=this.state.userConfirmNewPassword){
      CommonTasks._displayToast("Your entered Passwords do not match");
      return false;
    }
    // console.log(true);
    this._changeUserPassword();
  }

  _changeUserPassword(){
    var data = new FormData();
    data.append( "userPassword" , this.state.userNewPassword );
    data.append( "token" , this.state.userPasswordToken );

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        // console.log('success', xhr.responseText);
        var response = JSON.parse( xhr.responseText );
        if(response.status_code == 0){
            CommonTasks._displayToast('Your New Password has been successfully Updated, Please Login to Continue');
            this.props.navigation.navigate('SignInScreen', { accountActivationStatus : '2'});
        }
        else{
          CommonTasks._displayToast( response.message );
        }
      } else {
        console.warn('error');
      }
    };

    xhr.open( "POST" , CommonTasks.ROOT_URL+"forgotPasswordProcess" );
    xhr.send( data );
  }
}

//STYLES - styles applied on forgot-password Page
const styles = StyleSheet.create({
  //main container class
  container : {
    height           : Dimensions.get( 'window' ).height,
    backgroundColor  : '#000',
    padding          : 15,
    justifyContent   : 'center',
    alignItems       : 'center'
  },
  //background image container
  backgroundImageContainer :{
    position  : 'absolute',
    top       : 0,
    left      : 0,
    width     : '100%',
    height    : '100%',
    flex      : 1,
  },
  //background image
  backgroundImage : {
    resizeMode : 'cover',
  },
  //password recovery text caps class
  capsText : {
    fontSize    : 25,
    fontFamily  : 'Raleway-Regular',
    color       : '#fff',
  },
  //horse image class
  keyImage : {
    width  : 200,
    height : 200,
  },
  //holder for input field and image on right side
  inputHolder : {
    flexDirection   : 'row',
    backgroundColor : '#fff',
    borderRadius    : 25,
    justifyContent  : 'center',
    alignItems      : 'center',
    marginTop       : 30,
  },
  //image with input field
  inputImage : {
    marginLeft   : 15,
    marginRight  : 10,
    paddingRight : 15,
    height       : 20,
    width        : 20,
    resizeMode   : 'stretch',
    alignItems   : 'center'
  },
  //input field
  textInput : {
    flex         : 0.75,
    textAlign    : 'center',
    fontFamily   : 'Raleway-SemiBold',
    marginLeft   : -30,
    paddingLeft  : 20,
    color        : '#5C85D7',
    fontSize     : 15,
    paddingRight : 30,
  },
  //yellow Register Button
  yellowButton : {
    alignSelf        : 'stretch',
    marginHorizontal : 40,
    backgroundColor  : '#EFEE00',
    borderRadius     : 25,
    marginTop        : 30,
    height           : 50,
    justifyContent   : 'center',
    alignItems       : 'center',
  },
  //register text in yellow button
  recoverText : {
    fontFamily : 'Raleway-Regular',
    fontSize   : 20,
    color      : '#5C85D7',
    textAlign  : 'center',
  },
  //noraml white text
  normalWhiteText : {
    fontFamily : 'Raleway-Regular',
    color      : '#fff',
    textAlign  : 'center',
    fontSize   : 15,
  },
  //normal white text container
  normalWhitTextContainer : {
    marginTop : 30,
  }
});
