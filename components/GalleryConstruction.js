import Expo from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import ExpoTHREE, { THREE } from 'expo-three';
console.disableYellowBox = true;

class Gallery3D extends React.Component {
  static navigationOptions = {
    title: 'Gallery3D',
  };
  constructor() {
    super();
    this.state = {
      camera: null,
    };
  }
  _onGLContextCreate = async gl => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      140,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 9;

    const light = new THREE.PointLight(0xffffff, 0.8, 0);
    light.position.set(0, 0, 100);
    scene.add(light);

    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new THREE.PlaneGeometry(10, 10 * 0.75);
    const material1 = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.loadAsync(this.props.pics[0].uri),
    });
    const material2 = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.loadAsync(this.props.pics[1].uri),
    });
    const material3 = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.loadAsync(this.props.pics[2].uri),
    });

    const img1 = new THREE.Mesh(geometry, material1);
    const img2 = new THREE.Mesh(geometry, material2);
    const img3 = new THREE.Mesh(geometry, material3);
    img1.position.set(0, 0, 0.01);
    img2.position.set(15, 0, 0.01);
    img3.position.set(-15, 0, 0.01);
    scene.add(img1);
    scene.add(img2);
    scene.add(img3);

    frameCreate(scene);
    wallCreate(scene);
    floorCreate(scene);

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  render() {
    return (
      <Expo.GLView
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }
}

// async function imageCreate(scene) {
//   const catGeometry = new THREE.PlaneGeometry(10, 10 * 0.75);
//   const catMaterial = new THREE.MeshBasicMaterial({
//     map: await ExpoTHREE.createTextureAsync({
//       asset: Expo.Asset.fromModule(require('../images/cat.jpg')),
//     }),
//   });
//
//   const cat1 = new THREE.Mesh(catGeometry, catMaterial);
//   const cat2 = cat1.clone();
//   const cat3 = cat1.clone();
//   cat1.position.set(0, 0, 0.01);
//   cat2.position.set(15, 0, 0.01);
//   cat3.position.set(-15, 0, 0.01);
//   scene.add(cat1);
//   scene.add(cat2);
//   scene.add(cat3);
// }

async function frameCreate(scene) {
  const frameGeometry = new THREE.PlaneGeometry(12, 12 * 0.75);
  const frameMaterial = new THREE.MeshBasicMaterial({
    map: await ExpoTHREE.createTextureAsync({
      asset: Expo.Asset.fromModule(require('../images/frame.jpeg')),
    }),
  });
  const frame1 = new THREE.Mesh(frameGeometry, frameMaterial);
  const frame2 = frame1.clone();
  const frame3 = frame1.clone();
  frame1.position.set(0, 0, 0);
  frame2.position.set(15, 0, 0);
  frame3.position.set(-15, 0, 0);
  scene.add(frame1);
  scene.add(frame2);
  scene.add(frame3);
}

async function floorCreate(scene) {
  const floorTexture = await ExpoTHREE.createTextureAsync({
    asset: Expo.Asset.fromModule(require('../images/floor.jpeg')),
  });
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);
  const floorMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
  });
  const floorGeometry = new THREE.PlaneGeometry(100, 100 * 0.75, 100, 100);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.material.side = THREE.DoubleSide;
  floor.rotation.x = 90;
  floor.position.set(0, -15, 0);
  scene.add(floor);
}

async function wallCreate(scene) {
  const wallTexture = await ExpoTHREE.createTextureAsync({
    asset: Expo.Asset.fromModule(require('../images/wall3.jpeg')),
  });
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(7.5, 5);
  const wallMaterial = new THREE.MeshBasicMaterial({
    map: wallTexture,
  });
  const wallGeometry = new THREE.BoxGeometry(100, 50, 2);
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(0, 0, -2);
  scene.add(wall);
}

const mapStateToProps = state => ({
  pics: state.pics,
});

export default connect(
  mapStateToProps,
  null
)(Gallery3D);

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
