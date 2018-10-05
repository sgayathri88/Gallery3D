import React from 'react';
import { StyleSheet, Image, View, FlatList, Button } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addPhoto } from '../redux';

class Gallery extends React.Component {
  constructor() {
    super();
    this.pickImage = this.pickImage.bind(this);
  }

  static navigationOptions = {
    title: 'Gallery3D',
  };
  async pickImage() {
    let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permission.status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        this.props.addAPhoto({
          key: String(this.props.pics.length),
          uri: result.uri,
        });
      }
    }
  }
  render() {
    if (this.props) {
      if (this.props.pics) {
        if (this.props.pics.length) {
          return (
            <View style={styles.container}>
              <FlatList
                horizontal
                data={this.props.pics}
                renderItem={({ item }) => {
                  return (
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.imageStyle}
                    />
                  );
                }}
              />
              <Button
                title="Get Image"
                style={styles.button}
                onPress={this.pickImage}
              />
            </View>
          );
        }
      }
    }
    return (
      <View style={styles.container}>
        <Button
          title="Get Image"
          style={styles.button}
          onPress={this.pickImage}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.pics,
});

const mapDispatchToProps = dispatch => ({
  addAPhoto: photo => dispatch(addPhoto(photo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    margin: 20,
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
