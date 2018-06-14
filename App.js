import React from 'react';
import { StyleSheet,
        Text,
        View,
        Linking,
        AsyncStorage} from 'react-native';
import {
  AppRegistry,
  Platform,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignUp from './components/sign-up.js';
import SignIn from './components/sign-in.js';
import ForgotPassword from './components/forgot-password.js';
import MyAccount from './components/my-account.js';
import UpdateProfile from './components/update-profile.js';
import UpdatePassword from './components/update-password.js';
import ResetPassword from './components/reset-password.js';
import SearchHorse from './components/search-horse.js';
import CheckOut from './components/checkout.js';
import ConfirmPayment from './components/confirm-payment.js';
import ConfirmPaymentSplit from './components/confirm-payment-split.js';
import PaymentSuccess from './components/payment-success.js';
import PendingPayments from './components/pending-payments.js';
import MyOrders from './components/my-orders.js';
import TransactionHistory from './components/transaction-history.js';
export default class App extends React.Component {
  static navigationOptions = {
    header : null
  };

  constructor(props){
    super(props);
    this.state = {
      userId : '',
      userEmailId : '',
      userFullName : '',
      userProfileImage : '',
      userFavouriteHorsesNumber : '',
      userCartItemsNumber : '',
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Please Wait</Text>
      </View>
    );
  }

  componentDidMount() {
    Linking.getInitialURL().then(url => this._handleURL(url)).catch(error=>alert(error));
  }

  doneStoring(values){
    // console.log('DONE');
    // console.log(values);
    var profileImageOfUser ;
    if(values[3][1][0]=="."){
      console.log(true);
      profileImageOfUser = require('./assets/images/user_avatar.png');
    }
    else{
      console.log(false);
      profileImageOfUser = { uri : values[3][1] }
    }
    this.props.navigation.navigate('MyAccountScreen',
    {
      userId                    : values[0][1],
      userFullName              : values[1][1] ,
      userEmailAddress          : values[2][1],
      userProfileImage          : profileImageOfUser,
      userFavouriteHorsesNumber : values[4][1],
      userCartItemsNumber       : values[5][1],
    });
  }


//FUNCTION - to handle recieved url
  _handleURL(url) {
    if(url==null){
      AsyncStorage.getItem('user_stays_signed_in').then( value => {
        if(value==="true"){
            var userEmailAddress, userFullName, userProfileImage, userFavouriteHorsesNumber, userCartItemsNumber;
            console.log("second step");
            AsyncStorage.multiGet(['user_id','user_full_name','user_email_address','user_profile_image','user_favourite_horses_number','user_cart_items_number']).then(values => this.doneStoring(values));

        }else{
          // this.props.navigation.navigate('UpdatePasswordScreen');
          this.props.navigation.navigate('SignInScreen', { accountActivationStatus : '2'});
          // this.props.navigation.navigate('SignUpScreen');
          // this.props.navigation.navigate('MyAccountScreen',
          // {
          //   userId                    : 30,
          //   userFullName              : 'DJ' ,
          //   userEmailAddress          : 'dj@yopmail.com',
          //   userProfileImage          : require('./assets/images/user_avatar.png'),
          //   userFavouriteHorsesNumber : '0' + ' Horses',
          //   userCartItemsNumber       : '0',
          // });
        }
      })
      .catch(error => this.props.navigation.navigate('SignUpScreen'));
    }else{
      console.log(url);
      var urlEssentialPart = url.split('horse/')[1];
      var urlRedirectionPart = urlEssentialPart.split("/")[0];
      console.log(urlRedirectionPart);
      if(urlRedirectionPart=='forgotpassword'){
          var userToken = urlEssentialPart.split("/")[1];
          console.log("app"+userToken);
          this.props.navigation.navigate('ResetPasswordScreen', { userResetPasswordToken : userToken});
      }
      else if(urlRedirectionPart=='account_activation'){
          var userAccountStatus = urlEssentialPart.split("/")[1];
          console.log(userAccountStatus);
          this.props.navigation.navigate('SignInScreen', {
            accountActivationStatus : userAccountStatus,
            order_id : '',
            horse_id : '',
            pay_price: '',
          });
      }
      else{
          var forBillPayment = urlEssentialPart.split('bill_payment/')[1];
          var orderId = forBillPayment.split('/')[0].split('=')[1];
          var horseId = forBillPayment.split('/')[1].split('=')[1];
          var payPrice = forBillPayment.split('/')[2].split('=')[1];
          console.log(forBillPayment, orderId, horseId, payPrice);
          this.props.navigation.navigate('SignInScreen',{
            accountActivationStatus : '',
            order_id : orderId,
            horse_id : horseId,
            pay_price: payPrice,
          });
      }
      console.log("essential"+urlEssentialPart);
    }
  }
}

const styles = StyleSheet.create({
  container        : {
    flex           : 1,
    backgroundColor: '#fff',
    alignItems     : 'center',
    justifyContent : 'center',
  },
});

const screens = StackNavigator({
    Home : { screen : App },
    SignUpScreen              : { screen : SignUp },
    SignInScreen              : { screen : SignIn },
    ForgotPasswordScreen      : { screen : ForgotPassword },
    MyAccountScreen           : { screen : MyAccount },
    UpdateProfileScreen       : { screen : UpdateProfile },
    UpdatePasswordScreen      : { screen : UpdatePassword },
    ResetPasswordScreen       : { screen : ResetPassword },
    SearchHorseScreen         : { screen : SearchHorse },
    CheckOutScreen            : { screen : CheckOut },
    ConfirmPaymentScreen      : { screen : ConfirmPayment },
    ConfirmPaymentSplitScreen : { screen : ConfirmPaymentSplit },
    PaymentSuccessScreen      : { screen : PaymentSuccess },
    PendingPaymentsScreen     : { screen : PendingPayments },
    MyOrdersScreen            : { screen : MyOrders },
    TransactionHistoryScreen  : { screen : TransactionHistory },
},{
  mode: Platform.OS === 'ios'
		? 'modal'
		: 'card',
	navigationOptions: {
		cardStack: {
			gesturesEnabled: false
		}
	}
});

AppRegistry.registerComponent('HorseApp', () => screens);
