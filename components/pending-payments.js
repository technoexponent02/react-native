/*
*Pending-Payments Page
*/
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonTasks from '../common-tasks/common-tasks.js';
export default class PendingPayments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      dataSource : '',
    };
  }

  static navigationOptions = {
    header : null,
  };

  componentDidMount() {
      this._getUserPendingPayments();
  }

  render(){
    // const navigate = this.props.navigation;
      if (this.state.isLoading) {
          return (
              <View style={{ flex: 1 }}>
                  <View style={styles.headerContainer}>
                      <View style={styles.menuImage}>
                          <Image
                              source={require('../assets/images/menu.png')}
                          />
                      </View>
                      <Text style={styles.headerText}>Pending Payments</Text>
                      <View>
                          <Image
                              style={styles.profImage}
                              source={require('../assets/images/user_avatar.png')}
                          />
                      </View>
                  </View>
                  <ActivityIndicator />
              </View>
          );
      }

      return (

          <View style={styles.MainContainer}>

              <View style={styles.headerContainer}>
                  <View style={styles.menuImage}>
                      <Image
                          source={require('../assets/images/menu.png')}
                      />
                  </View>
                  <Text style={styles.headerText}>Pending Payments</Text>
                  <View>
                      <Image
                          style={styles.profImage}
                          source={require('../assets/images/user_avatar.png')}
                      />
                  </View>
              </View>
              <ListView

                  dataSource={this.state.dataSource}

                  // renderSeparator={this.ListViewItemSeparator}

                  renderRow={(rowData) =>

                      <View style={ styles.single_section } >

                          {/*<Image source={ require('../assets/images/horse_default.png') } style={styles.imageViewContainer} />*/}
                          {this._returnHorseProfileImage(rowData.horse_details.profile_picture)}
                          <View style={ styles.horse_payment_details_container }>
                              <View style = { styles.payment_info_container}>
                                <Text style = { styles.horse_title }>{rowData.horse_details.name}</Text>
                                <View style = { { flexDirection : 'row' } }>
                                    {/*<Text>First User : </Text>
                                    <Text>Price1</Text>
                                    <Text>/</Text>
                                    <Text>Your : </Text>
                                    <Text>Price2</Text>*/}
                                    <Text style = { styles.gray_text_big }>Price : </Text>
                                    <Text style = { styles.blue_text_big } >{rowData.price} EUR</Text>
                                </View>
                                <View style = { { flexDirection : 'row' , marginTop : 10} }>
                                    <Text style = { styles.gray_text_small }>Order ID : </Text>
                                    <Text style = { styles.blue_text_small } >{rowData.order_id}</Text>
                                </View>
                                <View style = { { flexDirection : 'row' } }>
                                    <Text style = { styles.gray_text_small } >Date : </Text>
                                    <Text style = { styles.blue_text_small } >{this._returnProperDate( rowData.order_date)}</Text>
                                    {/*<Text style = { styles.gray_text_small } >10:10AM</Text>*/}
                                </View>
                                <View style = { { flexDirection : 'row' } }>
                                    <Text style = { styles.gray_text_small }>Address : </Text>
                                    <Text style = { styles.blue_text_small } ellipsizeMode = 'tail' numberOfLines={1}>{rowData.horse_details.location}</Text>
                                </View>
                              </View>
                              <View style = { styles.price_pay_button_container} >
                                <Text style = { styles.bold_price_text_blue }>{rowData.pay_amount} EUR</Text>
                                <TouchableOpacity
                                  onPress = { () => this._proceedToPayment( rowData.order_id, rowData.horse_details.id, rowData.pay_amount) }
                                  style = { styles.small_blue_button }
                                >
                                  <Text style = { styles.white_button_text } >Pay Now</Text>
                                </TouchableOpacity>
                              </View>
                          </View >
                      </View>

                  }
              />

              <View style={styles.mainFooter}>
                  <TouchableOpacity
                      style={styles.first_tabs}>
                      <Image
                          style={styles.tab_image}
                          source={require('../assets/images/home-white.png')}
                      />
                      <Text style={styles.first_text}>Home</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.sub_tabs}>
                      <Image
                          style={styles.tab_image}
                          source={require('../assets/images/search.png')}
                      />
                      <Text style={styles.tab_text}>Search</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.sub_tabs}>
                      <Image
                          style={styles.tab_image}
                          source={require('../assets/images/barn.png')}
                      />
                      <Text style={styles.tab_text}>Barn</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.sub_tabs}>
                      <Image
                          style={styles.tab_image}
                          source={require('../assets/images/user-tab.png')}
                      />
                      <Text style={styles.tab_text}>My Account</Text>
                  </TouchableOpacity>
              </View>

          </View>

    );
  }

  _getUserPendingPayments(){
    var data = new FormData();
    data.append( "user_id" , '30' );

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

            let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ dataSource : ds.cloneWithRows(response.pending_payment_details),
                            isLoading : false,
             });
        }
        else{
          // CommonTasks._displayToast( response.message );
        }
      } else {
        console.warn('error');
      }
    };
    xhr.open( "POST" , CommonTasks.ROOT_URL+"pendingOrderList" );
    xhr.send( data );
  }

  _returnHorseProfileImage( profilePicture ){

    if( profilePicture == '' ){
      profilePicture = require('../assets/images/horse_default.png');
      return ( <Image source={ require('../assets/images/horse_default.png') } style={styles.imageViewContainer} /> );
    }
    else{
      profilePicture = CommonTasks.PROFILE_PICTURE_ROOT_URL + profilePicture ;
      return ( <Image source={ { uri : profilePicture } } style={styles.imageViewContainer} /> );
    }
  }

  _proceedToPayment( orderId, horseId, payPrice){

    this.props.navigation.navigate('ConfirmPaymentSplitScreen',{
      order_id : orderId,
      horse_id : horseId,
      pay_price : payPrice,
    });
  }

  _returnProperDate( dateObj ){
    var monthsArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
      var dateActual = new Date(dateObj * 1000);
      var date =('0'+dateActual.getDate()).slice(-2);
      var month  = dateActual.getMonth();
      var year = dateActual.getFullYear();
      var properDate = date + " " + monthsArr[month] + " "+ year;
      // alert(properDate);
      return(properDate);
  }

}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#5C85D7',
    },

    menuImage: {
        paddingLeft: 10,
    },

    headerText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400',
        flex: 1,
        fontSize: 20,
        alignSelf: 'center',
        fontFamily : 'Raleway-Regular',
    },

    profImage: {
        width: 30,
        height: 30,
        borderRadius: 50
    },

    toolbarButton: {
        width: 50,
        color: '#fff',
        textAlign: 'center'
    },

    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,

    },

    imageViewContainer: {
        width: 90,
        height: 90,
        margin: 10,
        borderRadius: 50
    },

    //
    horse_payment_details_container : {
      flexDirection : 'row',
      width : Dimensions.get('window').width-90-20,//-image width- margin on rigth/left of image
      paddingRight : 10,
      paddingVertical : 10,
      borderBottomColor: '#b2b2b3',
      borderBottomWidth: 1 ,
    },
    //
    payment_info_container : {
      flexDirection : 'column',
      width : Dimensions.get('window').width-80-20-90-10-15,//-image width- margin on rigth/left of image - width of price_pay_button_container - padding right
    },
    //
    horse_title : {
      fontFamily : 'Raleway-Regular',
      color : '#000',
      fontSize : 15,
    },
    //
    gray_text_big : {
      fontFamily : 'Raleway-Regular',
      color : '#979A9A',
      fontSize : 15,
    },
    //
    gray_text_small : {
      fontFamily : 'Raleway-Regular',
      color : '#979A9A',
      fontSize : 12,
    },
    //
    blue_text_big : {
      fontFamily : 'Raleway-Regular',
      color : '#5C85D7',
      fontSize : 13,
    },
    //
    blue_text_small : {
      fontFamily : 'Raleway-Regular',
      color : '#5C85D7',
      fontSize : 12,
    },
    //
    price_pay_button_container : {
      flexDirection : 'column',
      justifyContent : 'space-between',
      width : 90,
    },
    //
    small_blue_button : {
      height :24,
      borderRadius : 12,
      backgroundColor : '#5C85D7',
      paddingHorizontal : 18,
      justifyContent : 'center',
      alignItems : 'center',
    },
    //
    bold_price_text_blue : {
      fontSize : 18,
      fontWeight : '500',
      color : '#5C85D7',
    },
    //
    white_button_text : {
      fontSize : 12,
      // fontWeight : '500',
      color : '#fff',
      fontFamily : 'Raleway-Regular',
    },

    textViewContainer: {

        fontSize: 15,
        textAlignVertical: 'center',
        width: '100%',
        padding: 10,
        top: 10


    },

    //
    single_section : {
      flex: 1,
      flexDirection: 'row',
      // borderBottomColor: '#b2b2b3',
      // borderBottomWidth: 1 ,
  },

    firstText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        width: '50%',
        padding: 10,
        top: 30
    },

    mainFooter: {
        backgroundColor: '#f9f5f4',
        flexDirection: 'row'
    },

    sub_tabs: {
        height: (((Dimensions.get('window').height) / 2) / 4),
        width: ((Dimensions.get('window').width) / 4),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    tab_image: {
        height: 35,
        width: 35,
        margin: 5,
    },

    tab_text: {
        fontSize: 12,
        fontFamily: 'Raleway-Regular',
        fontWeight : '400'
    },

    first_tabs : {
        height: (((Dimensions.get('window').height) / 2) / 4),
        width: ((Dimensions.get('window').width) / 4),
        backgroundColor: '#5C85D7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    first_text : {
        fontSize: 12,
        fontFamily: 'Raleway-Regular',
        color : '#fff',
        fontWeight : '400'
    }
});
