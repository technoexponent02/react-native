/*
*Sign-In Page
*/
import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  Button } from 'react-native';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';

import CommonTasks from '../common-tasks/common-tasks.js';
export default class SignIn extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          userEmail               : '',
          userPassword            : '',
          staySignedIn            : false,
          visible                 : false,
          accountActivationStatus : this.props.navigation.state.params.accountActivationStatus,
          orderId                 : this.props.navigation.state.params.order_id,
          horseId                 : this.props.navigation.state.params.horse_id,
          pay_price               : this.props.navigation.state.params.pay_price,
      }
  }

    componentDidMount(){
      console.log("status"+this.state.accountActivationStatus);
      if(this.state.accountActivationStatus=="0"){
        CommonTasks._displayToast('Your account is successfully activated, Please Login to continue');
      }
      else if(this.state.accountActivationStatus=="1"){
        CommonTasks._displayToast('Your account is already active, Please Login to continue');
      }
      else if(this.state.accountActivationStatus==""){
        CommonTasks._displayToast('Please Login, to make your Payment');
      }
      else{}
    }

    static navigationOptions = {
      header : null,
    }
    render(){
      const { navigate } = this.props.navigation;
      return (
        <KeyboardAwareScrollView>

            <View  style = {styles.container}>
                <View
                  style = {styles.backgroundImageContainer}>
                  <Image
                    style = {styles.backgroundImage}
                    source = {require('../assets/images/background.png' )}
                  />
                </View>

                <TouchableOpacity onPress = {() => navigate('SignUpScreen')}>
                  <Text style = {styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>

                <View style = {styles.imageFormButtonContainer}>
                    <Image
                        style = {styles.horseImage}
                        source = {require('../assets/images/arab-horse.png')}
                    />

                    <Text style = {styles.capsText}>SIGN IN</Text>

                    <View style = {styles.inputHolder}>
                        <Image
                            style = {styles.inputImage}
                            source = {require('../assets/images/mail.png')}
                        />
                        <TextInput
                            style = {styles.textInput}
                            selectionColor = "#5C85D7"
                            returnKeyType = 'next'
                            autoCorrect={false}
                            autoCapitalize = "none"
                            onSubmitEditing = {()=>this.userPasswordInput.focus()}
                            placeholder = "Email Id"
                            placeholderTextColor = "#AED6F1"
                            underlineColorAndroid = 'rgba(0,0,0,0)'
                            onChangeText = {(input)=>this.setState({userEmail : input})}
                            ref = {((input)=>this.userEmailInput = input)}
                        />
                    </View>

                    <View style = {styles.inputHolder}>
                        <Image
                            style = {styles.inputImage}
                            source = {require('../assets/images/locked.png')}
                        />
                        <TextInput
                            secureTextEntry
                            style = {styles.textInput}
                            selectionColor = "#5C85D7"
                            returnKeyType = 'go'
                            autoCorrect={false}
                            autoCapitalize = "none"
                            onSubmitEditing = {()=>this._checkForInvalidInputs()}
                            placeholder = "Password"
                            placeholderTextColor = "#AED6F1"
                            underlineColorAndroid = 'rgba(0,0,0,0)'
                            onChangeText = {(input)=>this.setState({ userPassword : input })}
                            ref = {((input)=>this.userPasswordInput = input)}
                        />
                    </View>

                    <TouchableOpacity onPress = {() => navigate('ForgotPasswordScreen')}>
                      <Text style = {styles.forgotYourPasswordText}>Forgot Your Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.yellowButton} onPress = {()=>this._checkForInvalidInputs()}>
                      <Text style = {styles.signInText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style = {styles.checkBoxTextHolder}>
                        <CheckBox
                            onChange = {(checked) => this.setState({staySignedIn : checked})}
                            label = ''
                            uncheckedImage = {require('../assets/images/blank-square.png')}
                            checkedImage = {require('../assets/images/tick.png')}
                        />
                        <Text  style = {styles.checkBoxLabel}>
                            Stay Signed In
                        </Text>
                    </View>

                    <View style = {styles.containerOR}>
                        <View style = {styles.whiteBorder}></View>
                        <View style = {styles.whiteCircle}>
                            <Text style = {{fontSize : 15, color : '#fff', fontFamily : 'Raleway-Regular', alignSelf : 'center' }}>OR</Text>
                        </View>
                        <View style = {styles.whiteBorder}></View>
                    </View>

                    <TouchableOpacity style = {styles.facebookButton}>
                        <Image
                            style = {styles.facebookLogo}
                            source = {require('../assets/images/facebook-logo.png')}
                        />
                        <Text style = {{fontSize : 20, fontFamily : 'Raleway-Regular', color : '#fff', paddingRight : 20, paddingTop : 8, paddingLeft : 10}}>Sign Up with Facebook</Text>
                    </TouchableOpacity>
                </View>

                <Toast
                    visible={this.state.visible}
                    position={50}
                    shadow={false}
                    animation={false}
                    hideOnPress={true}
                ></Toast>
            </View>

            <View style = {styles.touANDpp}>
                <Text style = {styles.normalWhiteText}>
                    Our&nbsp;
                </Text>
                <TouchableOpacity >
                    <Text style = {styles.linkTOUandPP}>Terms of Use</Text>
                </TouchableOpacity>
                <Text style = {styles.normalWhiteText}>
                    &nbsp;and&nbsp;
                </Text>
                <TouchableOpacity >
                  <Text  style = {styles.linkTOUandPP}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
      )
    }

    //FUNCTION - check for invalid inputs
    _checkForInvalidInputs(){
      if(this.state.userEmail===''||this.state.userEmail.trim()===''){
          CommonTasks._displayToast("Please enter your E-mail");
          this.userEmailInput.focus();
          return false;
      }
      else{
        var response = CommonTasks._verifyEmail(this.state.userEmail.trim());
        if(response===false){
          CommonTasks._displayToast("Please enter a Valid Email");
          this.userEmailInput.focus();
          return false;
        }
        // console.log(this.state.userEmail);
      }

      if(this.state.userPassword===''||this.state.userPassword.trim()===''){
          CommonTasks._displayToast("Please enter your preferred Password");
          this.userPasswordInput.focus();
          return false;
      }

      this._signInUserProcess();
    }

    _signInUserProcess(){
      //params for sign-in - emailAddress,regFlag (R=normal login, F=login with fb), userPassword(needed only for normal login)
      var data = new FormData();
      data.append("emailAddress", this.state.userEmail.trim());
      data.append("userPassword", this.state.userPassword.trim());
      data.append("fcm_token", "eiwiewfhilyf");
      data.append("device_id", "82364985rikheklhg");
      data.append("device_type", "A");

      // fcm_token, device_id,device_type(I,A)
      data.append("regFlag", "R");

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          // console.log('success', xhr.responseText);
          var response = JSON.parse(xhr.responseText);
          if(response.status_code==0){
              var userProfileImage, userProfileImageForAsyncStorage;
              if(response.profile_picture.substr(response.profile_picture.lastIndexOf("/")+1)==""){
                  console.log(true);
                  userProfileImage = require("../assets/images/user_avatar.png");
                  userProfileImageForAsyncStorage = "../assets/images/user_avatar.png";
              }
              else{
                  userProfileImage = { uri : response.profile_picture };
                  userProfileImageForAsyncStorage = response.profile_picture;
              }
              console.log("option"+this.state.staySignedIn);
              if(this.state.staySignedIn===true){
                  AsyncStorage.setItem('user_stays_signed_in','true');
                  AsyncStorage.setItem('user_id', response.user_id);
                  AsyncStorage.setItem('user_full_name', response.name);
                  AsyncStorage.setItem('user_email_address', response.emailAddress);
                  AsyncStorage.setItem('user_profile_image', userProfileImageForAsyncStorage);
                  AsyncStorage.setItem('user_favourite_horses_number', response.favorite_horse_number.toString() + ' Horses');
                  AsyncStorage.setItem('user_cart_items_number', response.cart.toString());
              }else{
                  AsyncStorage.setItem('user_stays_signed_in','false');
              }
              // AsyncStorage.getItem('user_stays_signed_in').then(value=>alert(value));
              if(this.state.accountActivationStatus==''){
                  this.props.navigation.navigate('ConfirmPaymentSplitScreen',{
                    order_id : this.state.orderId,
                    horse_id : this.state.horseId,
                    pay_price : this.state.payPrice,
                  });
              }
              else{
                this.props.navigation.navigate('MyAccountScreen',
                {
                  userId                    : response.user_id,
                  userFullName              : response.name ,
                  userEmailAddress          : response.emailAddress,
                  userProfileImage          : userProfileImage,
                  userFavouriteHorsesNumber : response.favorite_horse_number + ' Horses',
                  userCartItemsNumber       : response.cart.toString(),
                });
              }

          }
          else{
            CommonTasks._displayToast(response.message);
          }
        } else {
          console.warn('error');
        }
      };

      xhr.open("POST", CommonTasks.ROOT_URL+"loginProcess");
      xhr.send(data);
    }

    doneStoring(){
      console.log('DONE');
      AsyncStorage.multiGet(['user_id','user_full_name','user_email_address','user_profile_image','user_favourite_horses_number','user_cart_items_number']).then(values => console.log(values));
    }
}

//STYLES - applied in sign-in page
const styles = StyleSheet.create({
  //main container class
  container : {
    flex : 1,
    backgroundColor : '#000',
    padding : 15,
  },
  //background image container
  backgroundImageContainer :{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  //background image
  backgroundImage : {
    alignSelf : 'stretch',
  },
  //upper right corner sign in link class
  signUpText : {
    fontFamily : 'Raleway-Regular',
    color : '#fff',
    textAlign : 'right',
    fontSize : 15,
  },
  //forgot your password link
  forgotYourPasswordText : {
    fontFamily : 'Raleway-Regular',
    color : '#fff',
    textAlign : 'center',
    marginTop : 30,
    fontSize : 15,
  },
  //class for horse image, input fields and button container
  imageFormButtonContainer :{
    alignItems : 'center',
    justifyContent : 'center',
  },
  //horse image class
  horseImage : {
    width : 100,
    height : 100,
  },
  //sign in text caps class
  capsText : {
    fontSize : 25,
    fontFamily : 'Raleway-Regular',
    color : '#fff',
  },
  //holder for input field and image on right side
  inputHolder : {
    flexDirection : 'row',
    backgroundColor : '#fff',
    borderRadius : 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 30,
  },
  //image with input field
  inputImage : {
    marginLeft: 15,
    marginRight : 10,
    paddingRight : 15,
    height: 20,
    width: 20,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
  //input field
  textInput : {
    flex : 0.75,
    textAlign : 'center',
    fontFamily : 'Raleway-SemiBold',
    marginLeft : -30,
    paddingLeft : 20,
    color : '#5C85D7',
    fontSize : 15,
    paddingRight : 30,
  },
  //yellow Register Button
  yellowButton : {
    alignSelf : 'stretch',
    marginHorizontal : 40,
    backgroundColor : '#EFEE00',
    borderRadius : 25,
    marginTop : 30,
    height : 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //register text in yellow button
  signInText : {
    fontFamily : 'Raleway-Regular',
    fontSize : 20,
    color : '#5C85D7',
    textAlign : 'center',
  },
  //checkbox and text holder
  checkBoxTextHolder : {
      paddingTop : 30,
      flexDirection : 'row',
  },
  //checkbox-label
  checkBoxLabel : {
    marginTop : 3,
    marginLeft : 10,
    color : '#fff',
    fontFamily : 'Raleway-Regular',
    fontSize : 18,
  },
  //check box label continues
  touANDpp : {
    flexDirection : 'row',
    justifyContent : 'center',
    backgroundColor : '#2F55A6',
    height : 45,
    paddingTop : 10,
    width : '100%',
  },
  //TOU and PP link
  linkTOUandPP : {
      color : '#EFEE00',
      textDecorationLine : 'underline',
      fontFamily : 'Raleway-Regular' ,
      fontSize : 18,
  },
  // OR container
  containerOR : {
    flexDirection : 'row',
    alignSelf : 'stretch',
    marginTop : 30
  },
  //white border
  whiteBorder : {
    borderTopColor : '#fff',
    borderTopWidth : 1,
    marginTop : 17,
    flex : 0.45,
  },
  //white circle
  whiteCircle : {
    borderColor : '#fff',
    borderWidth : 1,
    width : 34,
    height : 34,
    borderRadius : 17,
    flex : 0.1,
    paddingTop : 7
  },
  //normal white text
  normalWhiteText : {
    fontSize : 18,
    fontFamily : 'Raleway-Regular',
    color : '#fff',
    textAlign : 'center',
  },
  //facebook Button
  facebookButton : {
    backgroundColor : '#3B5998',
    borderRadius : 25,
    height : 50,
    flexDirection : 'row',
    padding : 3,
    marginTop : 30,
    marginBottom : 30
  },
  //facebook logo
  facebookLogo : {
    width : 44,
    height : 44,
  },

});
