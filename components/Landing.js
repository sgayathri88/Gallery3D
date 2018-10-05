import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Gallery from './Gallery';
import GalleryGyro3D from './GalleryGyro3D';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

class Landing extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Gallery3D</Text>
        {/* Text>Shake your phone to open the developer menu.</Text> */}
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: {
    screen: Landing,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} />,
    },
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      tabBarLabel: 'Gallery',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-photos" size={24} />,
    },
  },
  GalleryIn3D: {
    screen: GalleryGyro3D,
    navigationOptions: {
      tabBarLabel: 'GalleryIn3D',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name="3d-rotation" size={24} />
      ),
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'Trebuchet MS',
  },
  button: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Trebuchet MS',
  },
});
