import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashLogo from '../assets/logo.jpg'; // your added image

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Map'); // or 'Home' if you want to go to another screen
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});
