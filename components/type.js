import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    AppRegistry,
    ActivityIndicator,
    ListView,
    Alert,
    Platform,
    Dimensions
} from 'react-native';


export default class Type extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    GetItem(flower_name) {

        Alert.alert(flower_name);

    }

    componentDidMount() {
        return fetch('https://reactnativecode.000webhostapp.com/FlowersList.php')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // ListViewItemSeparator = () => {
    //     return (
    //         <View
    //             style={{
    //                 height: .5,
    //                 width: "100%",
    //                 backgroundColor: "#000",
    //             }}
    //         />
    //     );
    // }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.menuImage}>
                            <Image
                                source={require('../assets/images/menu.png')}
                            />
                        </View>
                        <Text style={styles.headerText}>Tag Number</Text>
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
                    <Text style={styles.headerText}>Tag Number</Text>
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

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#b2b2b3', borderBottomWidth: 1 }} onPress={this.GetItem.bind(this, rowData.flower_name)}>

                            <Image source={{ uri: rowData.flower_image_url }} style={styles.imageViewContainer} />
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.firstText}>id: {rowData.id}</Text>

                                <Text style={styles.textViewContainer} >{rowData.flower_name}</Text>
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
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#5C85D7',
    },

    menuImage: {
        paddingLeft: 10
    },

    headerText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400',
        flex: 1,
        fontSize: 20,
        alignSelf: 'center'

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
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50

    },

    textViewContainer: {

        fontSize: 15,
        textAlignVertical: 'center',
        width: '100%',
        padding: 10,
        top: 10


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
