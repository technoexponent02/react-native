/*
*My-Account Page
*/

import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Button } from 'react-native';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';

import CommonTasks from '../common-tasks/common-tasks.js';
export default class MyAccount extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        userId              : this.props.navigation.state.params.userId,
        userProfileImage    : this.props.navigation.state.params.userProfileImage,
        userFullName        : this.props.navigation.state.params.userFullName,
        userEmailId         : this.props.navigation.state.params.userEmailAddress,
        favouriteHorses     : this.props.navigation.state.params.userFavouriteHorsesNumber,
        userCartItemsNumber : this.props.navigation.state.params.userCartItemsNumber,
        allHorseType : '',
        allHeightUnits : '',
        allHorseBreeds : '',
        allHorseColors : '',
      }
  }

  static navigationOptions = {
    header : null,
  }

  componentDidMount(){
    this._getHeight();
 this._getColor();
    this._getType();
  this._getBreed();
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style = {styles.container}>
          <ImageBackground
              source = { require( '../assets/images/horse_background.png' ) }
              style = { styles.top_container }>
              <Image
                  style  = { styles.top_left_icon}
                  source = { require( '../assets/images/menu.png' ) }
              />
              <View style = { styles.user_avatar_name_email_container }>
                      <Image
                          style = {styles.user_profile_pic_avatar}
                          source = { this.state.userProfileImage }
                      />
                  <View style = {styles.user_name_email_container}>
                      <Text style = {styles.simple_white_text_large}>{this.state.userFullName}</Text>
                      <Text style = {styles.simple_white_text_small}>{this.state.userEmailId}</Text>
                  </View>
              </View>
          </ImageBackground>
          <TouchableOpacity
              style = { styles.link_to_favourites}>
              <Image
                  style = { styles.horse_image }
                  source = { require( '../assets/images/arab-horse-small.png') }
              />
              <View style = {styles.user_name_email_container}>
                  <Text style = {styles.simple_white_text_large}>Your Favourite Horse List</Text>
                  <Text style = {styles.simple_white_text_small}>{this.state.favouriteHorses}</Text>
              </View>
              <Image
                  style = {styles.right_arrow}
                  source = { require( '../assets/images/arrow-point-to-right.png') }
              />
          </TouchableOpacity>
          <KeyboardAwareScrollView style = { styles.main_tabs_container}>
              <View style = {styles.sub_tabs_container}>
                  <TouchableOpacity
                      style = {styles.sub_tabs}
                      onPress = {()=>navigate('UpdateProfileScreen',{
                        userId : this.state.userId,
                        userProfileImage : this.state.userProfileImage,
                        userFullName : this.state.userFullName,
                        userEmailId : this.state.userEmailId,
                      })}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/user_avatar.png') }
                      />
                      <Text style = { styles.tab_text }>My Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {styles.sub_tabs}
                      onPress = {()=>navigate('UpdatePasswordScreen',{
                        userId : this.state.userId,
                        userFullName : this.state.userFullName,
                        userEmailId  : this.state.userEmailId,
                        userProfileImage : this.state.userProfileImage,
                      })}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/car-key.png') }
                      />
                      <Text style = { styles.tab_text }>Change Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {styles.sub_tabs}
                      onPress = { () => navigate('MyOrdersScreen')}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/parcel.png') }
                      />
                      <Text style = { styles.tab_text }>My Order</Text>
                  </TouchableOpacity>
              </View>
              <View style = {styles.sub_tabs_container}>
                  <TouchableOpacity
                      style = {styles.sub_tabs}
                      onPress = {() => navigate('PendingPaymentsScreen')}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/get-money.png') }
                      />
                      <Text style = { styles.tab_text }>Pending Payments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {styles.sub_tabs}
                      onPress = {() => navigate('ConfirmPaymentScreen')}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/heart.png') }
                      />
                      <Text style = { styles.tab_text }>My Favourites</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {styles.sub_tabs}
                      onPress = {() => navigate( 'TransactionHistoryScreen' )}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/transaction.png') }
                      />
                      <Text style = { styles.tab_text }>Transaction History</Text>
                  </TouchableOpacity>
              </View>
              <View style = {styles.sub_tabs_container}>
                  <TouchableOpacity
                      onPress = { () => navigate('CheckOutScreen')}
                      style = {styles.half_tab}
                      >
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/faq.png') }
                      />
                      <Text style = { styles.tab_text }>FAQ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {styles.half_tab}>
                      <Image
                          style = { styles.tab_image}
                          source = { require( '../assets/images/logout.png') }
                      />
                      <Text style = { styles.tab_text }>Logout</Text>
                  </TouchableOpacity>
              </View>
          </KeyboardAwareScrollView>
          <View style = { styles.footer }>
              <TouchableOpacity style = { styles.footer_tab}>
                  <Image
                      style = { styles.footer_tab_image}
                      source = { require( '../assets/images/home.png' )}
                  />
                  <Text style = { styles.tab_text }>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style = { styles.footer_tab }
                  onPress = { () => navigate( 'SearchHorseScreen' ,{
                    allHeightUnits : this.state.allHeightUnits,
                    allHorseType : this.state.allHorseType,
                    allHorseBreeds : this.state.allHorseBreeds,
                    allHorseColors : this.state.allHorseColors,
                  })}
                  >
                  <Image
                      style = { styles.footer_tab_image}
                      source = { require( '../assets/images/search.png' )}
                  />
                  <Text style = { styles.tab_text }>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style = { styles.footer_tab}>
                  <Image
                      style = { styles.footer_tab_image}
                      source = { require( '../assets/images/barn.png' )}
                  />
                  <Text style = { styles.tab_text }>Barn</Text>
              </TouchableOpacity>
              <TouchableOpacity style = { styles.active_footer_tab}>
                  <Image
                      style = { styles.footer_tab_image}
                      source = { require( '../assets/images/user-tab-white.png' )}
                  />
                  <Text style = { styles.tab_text_white }>My Account</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }

  _getHeight(){
    var data = new FormData();
    data.append("","");
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
            this.setState({allHeightUnits : response.height_details});
            this.state.allHeightUnits.unshift({"id" : "0", "height_unit" : "Select Height Unit"});
            // console.log(this.state.allHeightUnits);
        }
        else{
          CommonTasks._displayToast("Error getting height units for Horse, Some Error Occurred");
        }
      } else {
        console.warn('error');
      }
    };

    xhr.open( "POST" , CommonTasks.ROOT_URL+"get_height" );
    xhr.send( data );
  }

  _getColor(){
    var data = new FormData();
    data.append("","");
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
            this.setState({allHorseColors : response.color_details});
            this.state.allHorseColors.unshift({"id" : "0", "color" : "Select Horse Colour"});
            // console.log(this.state.allHorseColors);
        }
        else{
          CommonTasks._displayToast("Error getting colors for Horse, Some Error Occurred");
        }
      } else {
        console.warn('error');
      }
    };

    xhr.open( "POST" , CommonTasks.ROOT_URL+"get_color" );
    xhr.send( data );
  }

    _getType(){
    var data = new FormData();
    data.append("","");
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
            this.setState({allHorseType : response.type_details});
            // console.log(this.state.allHorseType);
            this.state.allHorseType.unshift({"id" : "0", "type_name" : "Select Horse Type"});
        }
        else{
          CommonTasks._displayToast( "Error getting types for Horse, Some Error Occurred" );
        }
      } else {
        console.warn('error');
      }
    };

    xhr.open( "POST" , CommonTasks.ROOT_URL+"get_type" );
    xhr.send( data );
  }

   _getBreed(){
    var data = new FormData();
    data.append("","");
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
            this.setState({allHorseBreeds : response.breed_details});
            this.state.allHorseBreeds.unshift({"id" : "0", "breed" : "Select Horse Breed"});
            // console.log(this.state.allHorseBreeds);
        }
        else{
          CommonTasks._displayToast( "Error getting breeds for Horse, Some Error Occurred" );
        }
      } else {
        console.warn('error');
      }
    };

    xhr.open( "POST" , CommonTasks.ROOT_URL+"get_breed" );
    xhr.send( data );
  }
}

//STYLES - style classes applied
const styles = StyleSheet.create({
  // main container class
  container         : {
    flex            : 1,
    backgroundColor : '#fff',
  },
  //top container containing image user profile pic avatar name and email
  top_container : {
       height   : 200
  },
  //top icon on left
  top_left_icon : {
    height      : 20,
    top         : 20,
    left        : 15,
  },
  //user profile pic avatar, name, email container
  user_avatar_name_email_container : {
    flexDirection                  : 'row',
    top                            : 40,
    left                           : 40,
  },
  //user profile pic avatar
  user_profile_pic_avatar : {
      width               : 120,
      height              : 120,
      borderRadius        : 60,
      borderColor         : '#fff',
      borderWidth         : 2,
  },
  //user full name and email container
  user_name_email_container : {
    flexDirection           : 'column',
    paddingLeft             : 20,
    justifyContent          : 'center',
  },
  // normal white text large
  simple_white_text_large : {
      fontFamily          : 'Raleway-Regular',
      fontSize            : 15,
      color               : '#fff',
      paddingBottom       : 10,
  },
  //normal white text small
  simple_white_text_small : {
    fontFamily            : 'Raleway-Regular',
    fontSize              : 10,
    color                 : '#fff',
  },
  //link taking to favourites Page
  link_to_favourites : {
    backgroundColor  : '#2F55A6',
    flexDirection    : 'row',
    alignItems       : 'center',
    padding          : 5

  },
  //horse image in blue link to favourites
  horse_image  : {
     width     : 50,
     height    : 50,
     left      : 5,
     alignSelf : 'flex-start'
  },
  //right arrow
  right_arrow : {
    height    : 15,
    position  : 'absolute',
    right     : 15,
  },
  // class for main tabs
  main_tabs_container : {
    flexDirection     : 'column',
    backgroundColor   : '#2F55A6',
  },
  //sub main tabs container
  sub_tabs_container : {
    flexDirection    : 'row',
    // height : Dimensions.get('window').width,
     // height : (((Dimensions.get('window').height)/2)),
  },
  //sub tabs
  sub_tabs          : {
    height          : (((Dimensions.get('window').height)/2)/3),
    width           : ((Dimensions.get('window').width)/3),
    backgroundColor : '#fff',
    margin          : 1,
    justifyContent  : 'center',
    alignItems      : 'center',
  },
  //half tab
  half_tab           : {
    height          : (((Dimensions.get('window').height)/2)/3),
    width           : (Dimensions.get('window').width)/2,
    backgroundColor : '#fff',
    margin          : 1,
    flexDirection   : 'row',
    paddingLeft     : ((((Dimensions.get('window').width)/3)-50)/2),
    alignItems      : 'center',
  },
  //images inside tabs
  tab_image : {
    height  : 50,
    width   : 50,
    margin  : 5,
  },
  //text inside tab
  tab_text : {
    fontSize : 10,
    fontFamily : 'Raleway-Regular',
  },
  // text inside tab white
  tab_text_white : {
    fontSize : 10,
    fontFamily : 'Raleway-Regular',
    color : '#fff',
  },
  //footer tab
  footer : {
    flexDirection : 'row',
    width : Dimensions.get('window').width,
    height : 80,
    paddingTop : 10,
  },
  //footer tab
  footer_tab : {
    justifyContent  : 'center',
    alignItems      : 'center',
    width : ((Dimensions.get('window').width)/4),
  },
  //footer tab image
  footer_tab_image : {
    width : 40,
    height : 40,
    marginBottom : 10,
  },
  //active footer tab
  active_footer_tab : {
    backgroundColor : '#2F55A6',
    justifyContent  : 'center',
    alignItems      : 'center',
    width : ((Dimensions.get('window').width)/4),
    marginTop : -10,
  },
});
