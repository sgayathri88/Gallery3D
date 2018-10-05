import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import Gallery from './components/Gallery';
import GalleryConstruction from './components/GalleryConstruction';
import GalleryGyro from './components/GalleryGyro';
import GalleryGyro3D from './components/GalleryGyro3D';
import store from './redux';

const Stack = createStackNavigator(
  {
    Landing: Landing,
    Gallery: Gallery,
    GalleryConstruction: GalleryConstruction,
    GalleryGyro: GalleryGyro,
    GalleryGyro3D: GalleryGyro3D,
  },
  {
    initialRouteName: 'Landing',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitle: 'Gallery3D',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
