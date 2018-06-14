/*
*Horse- Search page
*
*/
import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  TextInput,
  Picker,
  ListView,
  Button } from 'react-native';
import Toast from 'react-native-root-toast';
import Places from 'google-places-web';
// import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CommonTasks from '../common-tasks/common-tasks.js';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
Places.apiKey = CommonTasks.GOOGLE_API_KEY;
Places.debug = true;
var radio_props = [
  {label: 'Stallion', value: 'S' },
  {label: 'Mare', value: 'M' },
  {label: 'Gelding', value: 'G' },
];
var placesData = [];
var presentLocationName;
export default class SearchHorse extends React.Component{
    constructor(props){
      super(props);
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
          heightTo  : '',
          heightFrom : '',
          allHeightUnits : this.props.navigation.state.params.allHeightUnits,
          selectedHeightUnit : '',
          priceFrom : '',
          priceTo : '',
          horseMonth : '',
          horseYear : '',
          allHorseColors : this.props.navigation.state.params.allHorseColors,
          selectedHorseColor : '',
          allHorseType : this.props.navigation.state.params.allHorseType,
          selectedHorseType : '',
          allHorseBreeds : this.props.navigation.state.params.allHorseBreeds,
          selectedHorseBreed : '',
          selectedHorseSex : '',
          userLocation : '',
          userLat : '',
          userLng : '',
          withPicture : false,
          withVideo : true,
          //here
          dataSource : ds.cloneWithRows(placesData),
          showAutoComplete : false,
      }

    }

    static navigationOptions = {
      header : null,
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => this._getPlaceName(position));
    }


    render(){
        const { query } = this.state;
        const data = [
          {'value':'data1'},
          {'value':'data2'},
          {'value':'data3'},
          {'value':'data4'}
        ];
        let heightItems = this.state.allHeightUnits.map( (key , index) => {
          return <Picker.Item key={index} value={key.id} label={key.height_unit}/>
        });
        let colorItems = this.state.allHorseColors.map( (key, index) => {
          return <Picker.Item key={index} value={key.id} label={key.color}/>
        });
        let typeItems = this.state.allHorseType.map( (key, index) => {
          return <Picker.Item key={index} value={key.id} label={key.type_name}/>
        });
        let breedItems = this.state.allHorseBreeds.map( (key, index) => {
          return <Picker.Item key={index} value={key.id} label={key.breed}/>
        });

      return(
        <View style = { styles.container }>
            <View style = { styles.search_header}>
              <TouchableOpacity
                  onPress = {() => this.props.navigation.goBack(null) }
              >
                <Image
                    style = { styles.cancel_icon }
                    source = { require('../assets/images/cancel.png') }
                />
              </TouchableOpacity>
                <Text style = { styles.header_text } >Search</Text>
            </View>
            <KeyboardAwareScrollView style = { styles.search_form_container }>
                <Text style = { styles.simple_black_text }>Search Horses by Inserting Details</Text>
                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>Height</Text>
                </View>
                <View style = { styles.section_container}>
                    <View style = {styles.triplet_sub_section}>
                        <Text style = { styles.input_field_header }>From</Text>
                        <View style = { styles.triplet_field_container }>
                            <TextInput
                                style = { styles.text_input }
                                selectionColor = "#5C85D7"
                                returnKeyType = 'next'
                                keyboardType = 'numeric'
                                autoCorrect={false}
                                autoCapitalize = "none"
                                onSubmitEditing = {()=>this.heightFromInput.focus()}
                                placeholder = ""
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                onChangeText = {(input)=>this.setState({heightFrom : input})}
                                ref = {((input)=>this.heightToInput = input)}
                            />
                        </View>
                    </View>
                    <View style = {styles.triplet_sub_section}>
                        <Text style = { styles.input_field_header }>To</Text>
                        <View style = { styles.triplet_field_container }>
                            <TextInput
                                style = { styles.text_input }
                                selectionColor = "#5C85D7"
                                keyboardType = 'numeric'
                                returnKeyType = 'next'
                                autoCorrect={false}
                                autoCapitalize = "none"
                                onSubmitEditing = {()=> console.log()}
                                placeholder = ""
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                onChangeText = {(input)=>this.setState({heightTo : input})}
                                ref = {((input)=>this.heightToInput = input)}
                            />
                        </View>
                    </View>
                    <View style = {styles.triplet_sub_section}>
                        <Text style = { styles.input_field_header }></Text>
                        <View style = { styles.triplet_field_container }>
                        <Picker
                          style = { styles.picker_style}
                          selectedValue={(this.state && this.state.selectedHeightUnit) || ''}
                          onValueChange={(itemValue, itemIndex) => this.setState({selectedHeightUnit: itemValue})}>
                          {heightItems}
                        </Picker>
                        </View>
                    </View>

                </View>


                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>Price</Text>
                </View>
                <View style = { styles.section_container}>
                    <View style = {styles.twin_sub_section}>
                        <Text style = { styles.input_field_header }>From</Text>
                        <View style = { styles.twin_field_container }>
                            <View style = {styles.input_image_holder}>
                                <Image
                                    style = {styles.input_image}
                                    source = {require('../assets/images/dollar.png')}
                                />
                            </View>
                            <TextInput
                                style = { styles.text_input }
                                selectionColor = "#5C85D7"
                                returnKeyType = 'next'
                                keyboardType = 'numeric'
                                autoCorrect={false}
                                autoCapitalize = "none"
                                onSubmitEditing = {()=>this.priceToInput.focus()}
                                placeholder = ""
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                onChangeText = {(input)=>this.setState({priceFrom : input})}
                                ref = {((input)=>this.priceToInput = input)}
                            />
                        </View>
                    </View>
                    <View style = {styles.twin_sub_section}>
                        <Text style = { styles.input_field_header }>To</Text>
                        <View style = { styles.twin_field_container }>
                            <View style = {styles.input_image_holder}>
                                <Image
                                    style = {styles.input_image}
                                    source = {require('../assets/images/dollar.png')}
                                />
                            </View>
                            <TextInput
                                style = { styles.text_input }
                                selectionColor = "#5C85D7"
                                returnKeyType = 'next'
                                keyboardType = 'numeric'
                                autoCorrect={false}
                                autoCapitalize = "none"
                                onSubmitEditing = {()=>this.horseMonthInput.focus()}
                                placeholder = ""
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                onChangeText = {(input)=>this.setState({priceTo : input})}
                                ref = {((input)=>this.priceToInput = input)}
                            />
                        </View>
                    </View>
                </View>

                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>Age</Text>
                </View>
                <View style = { styles.section_container}>
                    <View style = {styles.twin_sub_section}>
                        <Text style = { styles.input_field_header }>Month</Text>
                        <View style = { styles.twin_field_container }>
                            <View style = {styles.input_image_holder}>
                                <Image
                                    style = {styles.input_image}
                                    source = {require('../assets/images/calendar.png')}
                                />
                            </View>
                            <TextInput
                                style = { styles.text_input }
                                selectionColor = "#5C85D7"
                                returnKeyType = 'next'
                                autoCorrect={false}
                                autoCapitalize = "none"
                                onSubmitEditing = {()=>this.horseYearInput.focus()}
                                placeholder = ""
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                onChangeText = {(input)=>this.setState({horseMonth : input})}
                                ref = {((input)=>this.horseMonthInput = input)}
                            />
                        </View>
                    </View>
                    <View style = {styles.twin_sub_section}>
                        <Text style = { styles.input_field_header }>Year</Text>
                        <View style = { styles.twin_field_container }>
                            <View style = {styles.input_image_holder}>
                                <Image
                                    style = {styles.input_image}
                                    source = {require('../assets/images/calendar.png')}
                                />
                            </View>
                            <TextInput
                                style = { styles.text_input }
                                selectionColor = "#5C85D7"
                                returnKeyType = 'next'
                                autoCorrect={false}
                                autoCapitalize = "none"
                                onSubmitEditing = {()=>console.log()}
                                placeholder = ""
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                onChangeText = {(input)=>this.setState({horseYear : input})}
                                ref = {((input)=>this.horseYearInput = input)}
                            />
                        </View>
                    </View>
                </View>

                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>Color</Text>
                </View>
                <View style = { styles.single_field_container}>
                    <Picker
                      style = { styles.picker_style}
                      selectedValue={(this.state && this.state.selectedHorseColor) || ''}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedHorseColor: itemValue})}>
                      {colorItems}
                    </Picker>
                </View>

                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>By Type</Text>
                </View>
                <View style = { styles.single_field_container}>
                    <Picker
                      style = { styles.picker_style}
                      selectedValue={(this.state && this.state.selectedHorseType) || ''}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedHorseType: itemValue})}>
                      {typeItems}
                    </Picker>
                </View>

                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>By Breed</Text>
                </View>
                <View style = { styles.single_field_container}>
                    <Picker
                      style = { styles.picker_style}
                      selectedValue={(this.state && this.state.selectedHorseBreed) || ''}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedHorseBreed: itemValue})}>
                      {breedItems}
                    </Picker>
                </View>

                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>Sex</Text>
                </View>
                <View style = { styles.section_container}>
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      onPress={(value) => {this.setState({selectedHorseSex : value})}}
                      formHorizontal = {true}
                      labelStyle = {{
                          fontFamily : 'Raleway-Regular',
                          color : '#B3B6B7',
                          paddingHorizontal : 10,
                          fontSize : 15,
                          fontWeight : '300',
                       }}
                    />
                </View>

                <View style = { styles.section_header_container }>
                    <Text style = { styles.section_header }>Location</Text>
                </View>
                <View style = {styles.autocomplete_input_holder}>
                  <TextInput
                      style = {styles.text_input_location}
                      selectionColor = "#5C85D7"
                      returnKeyType = 'next'
                      autoCorrect={false}
                      autoCapitalize = "none"
                      onSubmitEditing = {()=> console.log()}
                      placeholder = ""

                      placeholderTextColor = "#AED6F1"
                      underlineColorAndroid = 'rgba(0,0,0,0)'
                      onChangeText = {(input)=>this._getPlacePredictions(input)}
                      ref = {((input)=>this.userLocationInput = input)}
                  />

                  <TouchableOpacity
                      style = {styles.input_image_right}
                      onPress = {()=> this.userLocationInput.setNativeProps({text: presentLocationName})}
                  >
                  <Image
                      style = {{ height: 25, width: 25,}}
                      source = {require('../assets/images/location.png')}
                  />
                  </TouchableOpacity>
              </View>
              {/* CODE ADDED HERE */}
                {this._showPlacesAutoComplete()}
              {/* CODE ADDED HERE ENDS*/}
              <View style={{height:20}}></View>

              <View style={styles.section_container}>
                  <CheckBox
                      onChange = {(checked) => this.setState({withPicture : checked})}
                      label = ''
                      uncheckedImage = {require('../assets/images/blank-square-blue.png')}
                      checkedImage = {require('../assets/images/tick-blue.png')}
                  />
                  <Text  style = {styles.checkbox_label}>
                      With Picture
                  </Text>

                  <CheckBox
                      onChange = {(checked) => this.setState({withVideo : checked})}
                      label = ''
                      uncheckedImage = {require('../assets/images/blank-square-blue.png')}
                      checkedImage = {require('../assets/images/tick-blue.png')}
                  />
                  <Text  style = {styles.checkbox_label}>
                      With Video
                  </Text>
              </View>



              <TouchableOpacity style = {styles.blue_button}
                onPress = {()=>this._checkForInvalidInputs()}>
                <Text style = {styles.button_text}>Search</Text>
              </TouchableOpacity>



            </KeyboardAwareScrollView>
        </View>
      );
    }

    _showPlacesAutoComplete(){
      if(this.state.showAutoComplete){
        return (
          <View elevation={5} style={styles.autocomplete_container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style = {styles.autocomplete_option_container}>
                <Text style={{fontSize : 15}} onPress={this._selectPlace.bind(this, rowData.place_id, rowData.place_name)} >{rowData.place_name}</Text>
                </View>}
            />
          </View>
        );
      }
      else{
        return null;
      }
    }

    _selectPlace(placeId, placeName){

      Places.details({ placeid: placeId })
      .then(result => {

        var str = JSON.stringify(result);
              var requiredstring2 = str.match(new RegExp('location":'+ "(.*)" + ',"viewport'))[1];
              var latLngObj = JSON.parse(requiredstring2);
              this.setState({
                userLat : latLngObj.lat,
                userLng : latLngObj.lng,
                userLocation : placeName,
                showAutoComplete : false,
              });
              this.userLocationInput.setNativeProps({text: placeName});
              
      })
      .catch(e => console.log(e));
    }

    _getPlacePredictions(partialInput){
      if(partialInput.trim()!=''){
        Places.autocomplete({ input: partialInput })
        .then(results => {
          // results array of partial matches
          // console.log("DONE here Please HAVE A LOOK");
          // console.log(results);
          placesData=[];
          results.forEach(
            function(element, index){
              placesData.push({'place_name': element.description , 'place_id' : element.place_id});
            }
          );
          let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.setState({ dataSource : ds.cloneWithRows(placesData), showAutoComplete : true});
          // console.log("DONE here Please HAVE A LOOK in STRINGSSSSSSSSSSSSSSS");
          // console.log(JSON.stringify(results));
        })
        .catch(e => console.log(e));
      }
    }

    _checkForInvalidInputs(){
    //   if(this.state.heightFrom==''||this.state.heightFrom.trim()==''){
    //     CommonTasks._displayToast("Please provide input in 'From' field in Heights Section");
    //     return false;
    //   }
    //   else if(this.state.heightFrom==NaN){
    //       CommonTasks._displayToast("Please provide NUMERAL input in 'From' field in Heights Section");
    //       return false;
    // }
    //   else{}
    //
    //   if(this.state.heightTo==''||this.state.heightTo.trim()==''){
    //     CommonTasks._displayToast("Please provide input in 'To' field in Heights Section");
    //     return false;
    //   }
    //   else if(this.state.heightTo==NaN){
    //     CommonTasks._displayToast("Please provide NUMERAL in 'To' field in Heights Section");
    //     return false;
    //   }
    //   else{}
    //
    //   if(this.state.selectedHeightUnit=='0'){
    //     CommonTasks._displayToast("Please select Height Unit for Horse Height");
    //     return false;
    //   }
    //
    //   if(this.state.priceFrom==''||this.state.priceFrom.trim()==''){
    //     CommonTasks._displayToast("Please provide input in 'From' field in Price Section");
    //     return false;
    //   }
    //   else if(this.state.priceFrom==NaN){
    //     CommonTasks._displayToast("Please provide NUMERAL input in 'From' field in Price Section");
    //     return false;
    //   }
    //   else{}
    //
    //   if(this.state.priceTo==''||this.state.priceTo.trim()==''){
    //     CommonTasks._displayToast("Please provide input in 'To' field in Price Section");
    //     return false;
    //   }
    //   else if(this.state.priceTo==NaN){
    //     CommonTasks._displayToast("Please provide NUMERAL input in 'To' field in Price Section");
    //     return false;
    //   }
    //   else{}
    //
    //   if(this.state.horseMonth==''||this.state.horseYear.trim()==''){
    //     CommonTasks._displayToast("Please provide input in 'Month' field in Age Section");
    //     return false;
    //   }
    //   else if(this.state.horseMonth==NaN){
    //     CommonTasks._displayToast("Please provide NUMERAL input in 'Month' field in Age Section");
    //     return false;
    //   }
    //   else{}
    //
    //   if(this.state.horseYear==''||this.state.horseYear.trim()==''){
    //     CommonTasks._displayToast("Please provide input in 'Year' field in Age Section");
    //     return false;
    //   }
    //   else if(this.state.horseYear==NaN){
    //     CommonTasks._displayToast("Please provide NUMERAL input in 'Year' field in Age Section");
    //     return false;
    //   }
    //   else{}
    //
    //   if(this.state.selectedHorseColor=='0'){
    //     CommonTasks._displayToast("Please Select Horse Colour");
    //     return false;
    //   }

      if(this.state.selectedHorseType=='0'){
        CommonTasks._displayToast("Please Select Horse Type");
        return false;
      }
      // if(this.state.selectedHorseBreed=='0'){
      //   CommonTasks._displayToast("Please Select Horse Breed");
      //   return false;
      // }
      // console.log(this.state.heightFrom);
      // console.log(this.state.heightTo);
      // console.log(this.state.selectedHeightUnit);
      // console.log(this.state.priceFrom);
      // console.log(this.state.priceTo);
      // console.log(this.state.horseMonth);
      // console.log(this.state.horseYear);
      // console.log(this.state.selectedHorseColor);
      // console.log(this.state.selectedHorseType);
      // console.log(this.state.selectedHorseBreed);
      // console.log(this.state.selectedHorseSex);
      // console.log(this.state.userLat);
      // console.log(this.state.userLng);
      // console.log(this.state.withPicture);
      // console.log(this.state.withVideo);
      this._searchHorse();
    }


    _getPlaceName(position){
      this.state.userLat = position.coords.latitude ;
      this.state.userLng = position.coords.longitude ;
      return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude + ',' + position.coords.longitude + '&key='+CommonTasks.GOOGLE_API_KEY)
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              presentLocationName = responseJson.results[0].formatted_address;
              this.setState( {userLocation : presentLocationName});
              this.userLocationInput.setNativeProps({text: presentLocationName});
              console.log(this.state.userLocation);
          })
          .catch((error) => {
              console.error(error);
          });
    }

    _searchHorse(){
      // height_id, from_height, to_height, from_price, to_price, from_months, to_years, type, breed, sex(S,M,G), color_id,lat,lng,picture_status(Y,N) video_status(Y,N),
      var data = new FormData();
      data.append( "from_height" , this.state.heightFrom );
      data.append( "to_height" , this.state.heightTo );
      data.append( "height_id" , this.state.selectedHeightUnit );
      data.append( "from_price" , this.state.priceFrom );
      data.append( "to_price" , this.state.priceTo );
      data.append( "from_months" , this.state.horseMonth );
      data.append( "to_years" , this.state.horseYear );
      data.append( "color_id" , this.state.selectedHorseColor );
      data.append( "type" , this.state.selectedHorseType );
      data.append( "breed" , this.state.selectedHorseBreed );
      data.append( "sex" , this.state.selectedHorseSex );
      (this.state.withPicture==false)?data.append( "picture_status" , "N" ):data.append( "picture_status" , "Y" );
      (this.state.withVideo==false)?data.append( "video_status" , "N" ):data.append( "video_status" , "Y" );
      // if(this.state.withPicture==false){
      //   data.append( "picture_status" , "N" );
      // }
      // else{
      //   data.append( "picture_status" , "Y" );
      // }

      // if(this.state.withVideo==false){
      //   data.append( "video_status" , "N" );
      // }
      // else{
      //   data.append( "video_status" , "Y" );
      // }
      data.append( "lat" , this.state.userLat );
      data.append( "lng" , this.state.userLng );
      data.append( "order" , "" );
      data.append( "sorting_field" , "" );

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          console.log('success', xhr.responseText);
          var response = JSON.parse( xhr.responseText );
          if(response.status_code == 0){
            // this.props.navigation.navigate('HomeScreen');
          }
          else{
            CommonTasks._displayToast( response.message );
          }
        } else {
          console.warn('error');
        }
      };

      xhr.open( "POST" , CommonTasks.ROOT_URL+"searchHorse" );
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
  //header for search page
  search_header : {
    backgroundColor : '#2F55A6',
    height : 50,
    paddingTop : ( Platform.OS === 'ios' ) ? 20 : 0,
    flexDirection : 'row',
    alignItems : 'center',
  },
  //top icon on left
cancel_icon : {
  height      : 20,
  width       : 20,
  alignSelf   : 'flex-start',
  marginLeft : 25,
},
//header text
header_text: {
    color: '#fff',
    textAlign: 'center',
    marginLeft : -20,
    fontWeight: '400',
    flex: 1,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily : 'Raleway-Regular',
},
//search form container
search_form_container : {
  padding : 20,
  // marginBottom : 30,

},
//simple black text
simple_black_text : {
  // color : '#fff',
  fontFamily : 'Raleway-Regular',
  fontWeight : '400',
  fontSize : 15,
  // alignSelf : 'center',
},
//section header container
section_header_container : {
  borderBottomWidth : 1,
  borderColor : '#D0D3D4',
},
//input image holder
input_image_holder : {
  borderRightWidth:1,
   alignItems:'center',
   borderColor:"#2F55A6" ,
   height : 50,
 },
//input image
input_image : {
  height: 20,
  width: 20,
  margin:15,
},
//section header
section_header : {
  color : '#B3B6B7',
  fontFamily : 'Raleway-Regular',
  fontSize : 20,
  fontWeight : '500',
  paddingVertical : 10,
},
//section container
section_container : {
  flexDirection : 'row',
  // alignItems : 'stretch',
  justifyContent : 'space-between',
  paddingTop : 10,
},
//single sub section
single_sub_section:{
  flexDirection : 'column',
  width : (Dimensions.get('window').width-40),

},
//twin sub section
twin_sub_section : {
  flexDirection : 'column',
  width : ((Dimensions.get('window').width)-50)/2,

},
//triplet sub section
triplet_sub_section : {
  flexDirection : 'column',
  width : ((Dimensions.get('window').width)-60)/3,

},
//input field title
input_field_header : {
  color : '#B3B6B7',
  fontFamily : 'Raleway-Regular',
  fontSize : 20,
  fontWeight : '300',
  paddingBottom : 10,
  height : 30,
},
//field container
single_field_container : {
  marginTop : 20,
  borderWidth : 1,
  height : 50,
  borderRadius : 25,
  borderColor : '#2F55A6',
  width : Dimensions.get('window').width-40,
  paddingHorizontal : 5,
  flexDirection : 'row',
  backgroundColor : '#f3f7f6',
},
//twin field container
twin_field_container : {
  borderWidth : 1,
  height : 50,
  borderRadius : 25,
  borderColor : '#2F55A6',
  width : ((Dimensions.get('window').width)-50)/2,
  paddingHorizontal : 5,
  flexDirection : 'row',
  alignItems : 'center',
  backgroundColor : '#f3f7f6',
},
//triplet field container
triplet_field_container : {
  borderWidth : 1,
  height : 50,
  borderRadius : 25,
  borderColor : '#2F55A6',
  width : ((Dimensions.get('window').width)-60)/3,
  paddingHorizontal : 5,
  flexDirection : 'row',
  backgroundColor : '#f3f7f6',
},
//input field
text_input : {
  flex : 0.75,
  textAlign : 'center',
  fontFamily : 'Raleway-Regular',
  // marginLeft : -20,
  // paddingLeft : 20,
  color : '#5C85D7',
  fontSize : 15,
  // paddingRight : 30,
},
//picker styles
picker_style  : {
  color : '#5C85D7',
  width : '100%',
},
//holder for input field and image on right side
  input_holder : {
    flexDirection : 'row',
    backgroundColor : '#fff',
    height : 50,
    borderRadius : 25,
    borderColor : '#5C85D7',
    borderWidth : 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 10,
  },
  //autocomplete input holder
  autocomplete_input_holder : {
    flexDirection : 'row',
    backgroundColor : '#fff',
    height : 50,
    borderRadius : 25,
    borderColor : '#5C85D7',
    borderWidth : 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop : 20,
    paddingLeft : 15,
    backgroundColor : '#f3f7f6',
  },
  //image with input field
  input_image_right : {
    // marginLeft: 15,
    marginRight : 5,
    paddingRight : 5,
    // resizeMode : 'stretch',
    alignItems: 'center'
  },
  //input field
  text_input_location : {
    flex : 0.90,
    textAlign : 'center',
    fontFamily : 'Raleway-SemiBold',
    // marginLeft : -20,
    // paddingLeft : 20,
    color : '#5C85D7',
    fontSize : 15,
    // paddingRight : 30,
  },

  //auto complete container
  autocomplete_container : {
      backgroundColor : '#fff',
      borderColor : '#AED6F1',
      borderWidth : 1,
      borderRadius : 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      marginTop : 10,
      paddingVertical : 10,
      paddingHorizontal : 15,
      // position: 'absolute',
       // left: 0,
       // top: 0,
       // opacity: 0.5,
       // backgroundColor: 'black',
  },
  //autocomplete option container
  autocomplete_option_container : {
    borderBottomWidth : 1,
    borderBottomColor : '#D0D3D4',
    paddingVertical : 5,
  },

  //project project Button
  blue_button : {
    alignSelf : 'stretch',
    marginHorizontal : 15,
    backgroundColor : '#5C85D7',
    borderRadius : 25,
    marginTop : 30,
    height : 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 60,
  },
  //register text in yellow button
  button_text : {
    fontFamily : 'Raleway-Regular',
    fontSize : 20,
    color : '#fff',
    textAlign : 'center',
  },
  //checkbox label
  checkbox_label : {
    fontFamily : 'Raleway-Regular',
    color : '#B3B6B7',
    fontSize : 15,
    fontWeight : '300',
    alignSelf : 'center',
  },


});
