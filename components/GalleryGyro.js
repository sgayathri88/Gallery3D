import React from 'react';
import { StyleSheet, Image, View, Button, Text } from 'react-native';
import { Gyroscope } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

class GalleryGyro extends React.Component {
  static navigationOptions = {
    title: 'Gallery3D',
  };

  constructor() {
    super();
    this.state = {
      currentPic: null,
      gyroscopeData: {},
    };
  }

  componentDidMount() {
    this.toggle();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggle() {
    if (this.subscriptionGyro) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }

  subscribe = () => {
    this.subscriptionGyro = Gyroscope.addListener(result => {
      this.setState({ gyroscopeData: result });
      this.changePic();
    });
    Gyroscope.setUpdateInterval(500);
  };

  unsubscribe = () => {
    this.subscriptionGyro && this.subscriptionGyro.remove();
    this.subscriptionGyro = null;
  };

  changePic() {
    if (this.state.currentPic) {
      //find index of currentPic
      const idx = Number(this.state.currentPic.key);
      //set gyro movement condition
      if (this.state.gyroscopeData.y > 1) {
        this.setState({
          currentPic: this.props.pics[(idx + 1) % this.props.pics.length],
        });
      } else if (this.state.gyroscopeData.y < -1) {
        this.setState({
          currentPic: this.props.pics[(idx - 1) % this.props.pics.length],
        });
      }
    } else {
      //initialize currentPic to 0th index
      this.setState({
        currentPic: this.props.pics[0],
      });
    }
  }

  render() {
    let { x, y, z } = this.state.gyroscopeData;
    if (this.state.currentPic) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.currentPic.uri }}
            style={styles.imageStyle}
          />
          <Text>Gyroscope Data:</Text>
          <Text>x: {round(x)}</Text>
          <Text>y: {round(y)}</Text>
          <Text>z: {round(z)}</Text>
          <Ionicons name="md-log-out" size={32} />
          <Button
            title="Back To Home"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Landing')}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Gyroscope Data:</Text>
          <Text>x: {round(x)}</Text>
          <Text>y: {round(y)}</Text>
          <Text>z: {round(z)}</Text>
          <Ionicons name="md-log-out" size={32} />
          <Button
            title="Logout"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Landing')}
          />
        </View>
      );
    }
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const mapStateToProps = state => ({
  pics: state.pics,
});

export default connect(
  mapStateToProps,
  null
)(GalleryGyro);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    marginLeft: 50,
    width: 250,
    height: 320,
  },
  button: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Trebuchet MS',
  },
});
