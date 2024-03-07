// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import IntroScreen from '../screens/intro';
// import Home from '../screens/home';
// const Stack = createNativeStackNavigator();

// export default function AppNavigator({initialRouteName}) {
//   return (
//     <Stack.Navigator initialRouteName={initialRouteName}>
//       <Stack.Screen
//         name="IntroScreen"
//         component={IntroScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// }

import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const IntroScreen = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      {item.showButton && (
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('ConnectWallet')}
        />
      )}
    </View>
  );
};

const introData = [
  {
    title: 'Welcome to the App',
    text: '',
    showButton: false,
  },
  {
    title: 'Explore Features',
    text: '',
    showButton: false,
  },
  {
    title: 'Get Started with Authentic8!',
    text: 'Last intro screen before you start',
    showButton: true,
  },
];

export default function AppIntro() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        data={introData}
        renderItem={({item}) => <IntroScreen item={item} />}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveIndex(index)}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.9}
      />
      <Pagination
        dotsLength={introData.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for each slide
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
