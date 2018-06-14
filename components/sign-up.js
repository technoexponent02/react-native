/*
*Sign-Up Page
*blue-color-code : #5C85D7
*yellow-color-code : #EFEE00
*placeholder-color-code : #AED6F1
*facebook-blue-color-code : #3B5998
*input title grey color code : #B3B6B7
*/
import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button } from 'react-native';
// import Toast, {DURATION} from 'react-native-easy-toast';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';

import CommonTasks from '../common-tasks/common-tasks.js';
export default class SignUp extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          userFirstName           : '',
          userLastName            : '',
          userEmail               : '',
          userPassword            : '',
          userConfirmPassword     : '',
          termsAndPolicyAgreement : false,
          visible                 : false,
      }
  }


  static navigationOptions = {
    header : null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
        <KeyboardAwareScrollView>
          <View style = {styles.container}>
            <View
              style = {styles.backgroundImageContainer}>
              <Image
                style = {styles.backgroundImage}
                source = {require('../assets/images/background.png' )}
              />
            </View>

              <TouchableOpacity onPress = {() => navigate('SignInScreen' , {
                accountActivationStatus : '2',
                order_id : '',
                horse_id : '',
                pay_price: '',
              })}>
                <Text style = {styles.signInText}>Sign In</Text>
              </TouchableOpacity>

              <View style = {styles.imageFormButtonContainer}>

                  <Image
                      style = {styles.horseImage}
                      source = {require('../assets/images/arab-horse.png')}
                  />

                  <Text style = {styles.capsText}>SIGN UP</Text>

                  <View style = {styles.inputHolder}>
                      <Image
                          style = {styles.inputImage}
                          source = {require('../assets/images/user.png')}
                      />
                      <TextInput
                          style = {styles.textInput}
                          selectionColor = "#5C85D7"
                          returnKeyType = 'next'
                          autoCorrect={false}
                          autoCapitalize = "none"
                          onSubmitEditing = {()=>this.userLastNameInput.focus()}
                          placeholder = "First Name"
                          placeholderTextColor = "#AED6F1"
                          underlineColorAndroid = 'rgba(0,0,0,0)'
                          onChangeText = {(input)=>this.setState({userFirstName : input})}
                          ref = {((input)=>this.userFirstNameInput = input)}
                      />
                  </View>

                  <View style = {styles.inputHolder}>
                      <Image
                          style = {styles.inputImage}
                          source = {require('../assets/images/user.png')}
                      />
                      <TextInput
                          style = {styles.textInput}
                          selectionColor = "#5C85D7"
                          returnKeyType = 'next'
                          autoCorrect={false}
                          autoCapitalize = "none"
                          onSubmitEditing = {()=>this.userEmailInput.focus()}
                          placeholder = "Last Name"
                          placeholderTextColor = "#AED6F1"
                          underlineColorAndroid = 'rgba(0,0,0,0)'
                          onChangeText = {(input)=>this.setState({userLastName : input})}
                          ref = {((input)=>this.userLastNameInput = input)}
                      />
                  </View>

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
                          onSubmitEditing = {()=>this._verifyEmailAndFocusOnPassword()}
                          placeholder = "Email Id"
                          placeholderTextColor = "#AED6F1"
                          underlineColorAndroid = 'rgba(0,0,0,0)'
                          onChangeText = {(input)=>this.setState({ userEmail : input })}
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
                          returnKeyType = 'next'
                          autoCorrect={false}
                          autoCapitalize = "none"
                          onSubmitEditing = {()=>this.userConfirmPasswordInput.focus()}
                          placeholder = "Password"
                          placeholderTextColor = "#AED6F1"
                          underlineColorAndroid = 'rgba(0,0,0,0)'
                          onChangeText = {(input)=>this.setState({ userPassword : input })}
                          ref = {((input)=>this.userPasswordInput = input)}
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
                          placeholder = "Confirm Password"
                          placeholderTextColor = "#AED6F1"
                          underlineColorAndroid = 'rgba(0,0,0,0)'
                          onChangeText = {(input)=>this.setState({ userConfirmPassword : input})}
                          ref = {((input)=>this.userConfirmPasswordInput = input)}
                      />
                  </View>

                  <TouchableOpacity style = {styles.yellowButton} onPress = {()=>this._checkForInvalidInputs()}>
                    <Text style = {styles.registerText}>Register</Text>
                  </TouchableOpacity>

                  <View style = {styles.checkBoxTextHolder}>
                      <CheckBox
                          onChange = {(checked) => this.setState({termsAndPolicyAgreement : checked})}
                          label = ''
                          uncheckedImage = {require('../assets/images/blank-square.png')}
                          checkedImage = {require('../assets/images/tick.png')}
                          checkboxStyle = {{}}
                          containerStyle = {{borderColor : '#fff'}}
                      />
                      <Text  style = {styles.checkBoxLabel}>
                          By Signing Up, You agree to our
                      </Text>
                  </View>

                  <View style = {styles.checkBoxCont}>
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
        </KeyboardAwareScrollView>
    );
  }

  //****************************FUNCTIONS**************************************//

  //FUNCTION - verify email
  _verifyEmailAndFocusOnPassword(){

      var response = CommonTasks._verifyEmail(this.state.userEmail);
      if(response===true){
        this.userPasswordInput.focus();
      }
      else{
        this.refs.toast.show("Please Enter a Valid Email");
      }
  }

  //FUNCTION - check for invalid inputs
  _checkForInvalidInputs(){
    if(this.state.userFirstName===''||this.state.userFirstName.trim()===''){
        CommonTasks._displayToast('Please enter your First Name');
        this.userFirstNameInput.focus();
        return false;
    }
    if(this.state.userLastName===''||this.state.userLastName.trim()===''){
        CommonTasks._displayToast("Please enter your Last Name");
        this.userLastNameInput.focus();
        return false;
    }
    if(this.state.userEmail===''||this.state.userEmail.trim()===''){
        CommonTasks._displayToast("Please enter your E-mail");
        this.userEmailInput.focus();
        return false;
    }
    else{
      var response = CommonTasks._verifyEmail(this.state.userEmail);
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
    if(this.state.userConfirmPassword===''||this.state.userConfirmPassword.trim()===''){
        CommonTasks._displayToast("Please confirm your entered Password");
        this.userConfirmPasswordInput.focus();
        return false;
    }

    if(this.state.userPassword!=this.state.userConfirmPassword){
        CommonTasks._displayToast("The entered Passwords do not match");
        this.userConfirmPasswordInput.focus();
        return false;
    }

    if(this.state.termsAndPolicyAgreement===false){
        CommonTasks._displayToast("Please agree to our Terms of Use and Privacy Policy");
        return false;
    }

    this._registerUserProcess();

  }

    //FUNCTION - Register User Process
    _registerUserProcess(){
      console.log("here" + this.state.userEmail.toString());
      // params for the web-service : emailAddress,firstName,lastName,userPassword
      var data = new FormData();
      data.append("firstName", this.state.userFirstName);
      data.append("lastName", this.state.userLastName);
      data.append("emailAddress", this.state.userEmail);
      data.append("userPassword", this.state.userPassword);

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
            CommonTasks._displayToast('You have Successfully Registered, Please check your Email for account activation link');
            this.props.navigation.navigate('SignInScreen', { accountActivationStatus : '2'});
          }
          else{
            CommonTasks._displayToast(response.message);
          }
        } else {
          console.warn('error');
        }
      };

      xhr.open("POST", CommonTasks.ROOT_URL+"registration");
      xhr.send(data);
    }
}


//STYLES - applied in sign-up page
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
  signInText : {
    fontFamily : 'Raleway-Regular',
    color : '#fff',
    textAlign : 'right',
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
  registerText : {
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
  checkBoxCont : {
    flexDirection : 'row',
    alignSelf : 'center',
    marginLeft : 25,
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

// const SignUpPageScreens = StackNavigator({
//     SignUpScreen : { screen : SignUp},
//     SignInScreen : {screen : SignIn},
// })

// AppRegistry.registerComponent('HorseApp', () => screens);
