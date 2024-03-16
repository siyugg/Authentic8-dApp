import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'; // or your navigation library
import {useRoute} from '@react-navigation/native';

// import {MaterialIcons} from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductDetails from './ProductDetails';
import 'react-native-gesture-handler';
import ProductData from '../data/data';

const Item = ({name, username, price, change, image, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.item}>
      <Image source={image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{name}</Text>

        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.change}>{change}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProductListScreen = () => {
  const navigation = useNavigation(); // hook to get the navigation object
  // const route = useRoute();
  // const {product} = route.params;

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      username={item.username}
      price={item.price}
      change={item.change}
      image={item.image}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Products</Text>
        </View>
        <FlatList
          data={ProductData} // use the imported data
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Change the color to match your theme
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border color
  },

  backButton: {
    marginLeft: 10, // Adjust as needed
    // Add any other styling for your back button
  },
  headerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  username: {
    color: 'gray',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    color: 'green',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default ProductListScreen;
