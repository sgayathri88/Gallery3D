import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Gallery3D',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Gallery3D</Text>
        {/* Text>Shake your phone to open the developer menu.</Text> */}
        <Button
          onPress={() => navigate('Gallery')}
          title="Lose yourself"
          style={styles.button}
        />
      </View>
    );
  }
}

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
