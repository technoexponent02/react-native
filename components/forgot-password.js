/*
*Forgot-Password Page
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
export default class ForgotPassword extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          userEmail : '',
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

            <Text style = { styles.capsText }> PASSWORD </Text>
            <Text style = { styles.capsText }> RECOVERY </Text>

            <Image
                style  = { styles.keyImage }
                source = { require( '../assets/images/key.png' ) }
            />

            <View style = { styles.inputHolder }>
                <Image
                    style  = { styles.inputImage }
                    source = { require('../assets/images/mail.png' )}
                />
                <TextInput
                    style                 = { styles.textInput }
                    selectionColor        = "#5C85D7"
                    returnKeyType         = 'go'
                    autoCorrect           ={false}
                    autoCapitalize        = "none"
                    onSubmitEditing       = { () => this._checkForInvalidInputs() }
                    placeholder           = "Email Id"
                    placeholderTextColor  = "#AED6F1"
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText          = { (input) => this.setState( { userEmail : input } ) }
                    ref                   = { ( (input) => this.userEmailInput = input ) }
                />
            </View>
            <View style = { styles.normalWhitTextContainer }>
            <Text style = { styles.normalWhiteText }> Oops, lets reset that Password </Text>
            <Text style = { styles.normalWhiteText }> Please enter your Email above. </Text>
            </View>
            <TouchableOpacity style = { styles.yellowButton } onPress = {()=>this._checkForInvalidInputs()}>
              <Text style = { styles.recoverText }>Recover</Text>
            </TouchableOpacity>

          </View>
      </KeyboardAwareScrollView>
    );
  }

  _checkForInvalidInputs(){
    if( this.state.userEmail === '' || this.state.userEmail.trim() === '' ){
        CommonTasks._displayToast( "Please enter your E-mail" );
        this.userEmailInput.focus();
        return false;
    }
    else{
      var response = CommonTasks._verifyEmail( this.state.userEmail );
      if( response === false ){
        CommonTasks._displayToast( "Please enter a Valid Email" );
        this.userEmailInput.focus();
        return false;
      }
      // console.log(this.state.userEmail);
    }
    this._submitForgotPasswordEmail();
  }

  _submitForgotPasswordEmail(){
    var data = new FormData();
    data.append( "emailAddress" , this.state.userEmail );

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
            CommonTasks._displayToast("Please exit the app, and hit the link sent to your Email");
        }
        else{
          CommonTasks._displayToast( response.message );
        }
      } else {
        console.warn('error');
      }
    };

    xhr.open( "POST" , CommonTasks.ROOT_URL+"forgotPassword" );
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
