/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Permissions,
  Platform,
  Image
} from 'react-native';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';



const App = () => {

  const camera = useRef()
  const device = useCameraDevice('back')
  const device1 = useCameraDevice('front')

  const [timer, setTimer] = useState("")
  const [cameraSide, setCameraSide] = useState(true)
  useEffect(() => {
    // console.log("AA", escpos)
    checkPermission();
  }, []);

  const timerFunc = (cb) => {
    let count = 3;
    const interval = setInterval(() => {
      if (count > -1) {
        console.log(count > 0 ? count : "Smile");
        setTimer(count > 0 ? count : "Smile")
        count--;
      }
      else {
        clearInterval(interval)
        cb(count)
      }
    }, 1000);
  }

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission()
    console.log("QQQQ", newCameraPermission)
  };

  const takePicture = async () => {
    timerFunc(async () => {
      const photo = await camera.current.takePhoto({})
      console.log("Photo", photo?.path)
      setTimer("")
    })
  }
  const format = useCameraFormat(device, [
    { photoResolution: "max" }
  ])

  return (
    // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //   <TouchableOpacity>
    //     <Text>sssss</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={{ justifyContent: "space-between", alignItems: "center", flex: 1, paddingVertical: 50 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={cameraSide == true ? device : device1}
        isActive={true}
        photo={true}
        enableHighQualityPhotos
        format={format}
      />
      <View style={{ width: '100%', flexDirection: "row", justifyContent: 'flex-end', paddingRight: 30 }}>
        <TouchableOpacity onPress={() => setCameraSide(!cameraSide)}
        // style={{ height: 40, width: 40 }}
        >
          <Image
            style={{ height: 35, width: 35, resizeMode: 'contain', padding: 10, tintColor: "white" }}

            source={require("./src/image/switch-camera.png")} />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <Text style={{ fontWeight: "900", color: 'white', fontSize: 45 }}>{timer}</Text>
      </View>
      <TouchableOpacity
        onPress={() => takePicture()}
        style={{ height: 70, width: 70, borderRadius: 35, backgroundColor: "white", }}>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
