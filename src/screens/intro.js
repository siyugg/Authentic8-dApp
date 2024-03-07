import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Button from '../../assets/common/button';
import logo from '../assets/logo/logo.png';
import Iphone from '../assets/image/Iphone.png';
const {width} = Dimensions.get('screen');

const IntroScreen = ({navigation}) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <View style={[styles.page, {backgroundColor: '#FAF5EB'}]}>
        <Image style={styles.logo} source={logo} />
      </View>
      {/* Page 1 */}
      <View style={[styles.page, {backgroundColor: '#FFFFFF'}]}>
        <Image style={styles.image} source={Iphone} />
        <Text style={styles.text}>Unlocking Transparency</Text>
        <Text>Explore the Power of Blockchain Tagging!</Text>
      </View>

      {/* Page 2 */}
      <View style={[styles.page, {backgroundColor: '#FFFFFF'}]}>
        <Text style={styles.text}>
          Tagging Revolution: Secure, Traceable, and Efficient.
        </Text>
      </View>

      {/* Page 3 */}
      <View style={[styles.page, {backgroundColor: '#FFFFFF'}]}>
        <Text style={styles.text}>
          Blockchain: Where Trust Meets Technology.
        </Text>
        <Button
          title="Get Started"
          //   onPress={() => navigation.navigate('Home')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    // fontFamily: 'Koulen_400Regular',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    width: 200,
    height: 200,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 550,
    height: 500,
  },
});

export default IntroScreen;
