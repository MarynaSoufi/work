import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import color from '../config/colors';

export default function ActivityIndicator({visible = false, size = 200}) {
  if(!visible) return null;
  const animation = useRef();

  useEffect(() => {
    animation.current.play(); 
  }, []);
  return (
    <View style={styles.container}>
      <LottieView style={{width: size, height: size}} ref={animation} autoPlay={true} source={require('../assets/animations/lf30_editor_hdxk5nui.json')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: "100%",
    width: "100%",
    backgroundColor: color.white,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1

  }
})
