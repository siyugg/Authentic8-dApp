import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ensure this is correctly installed
import ProductData from '../data/data';
import ProductListScreen from './AllProducts';

const ProductDetailsScreen = ({route, navigation}) => {
  // Extract the product details from route.params
  //   const route = useRoute();
  const {product} = route.params;
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productId}>Product ID: {product.id}</Text>
        <Text style={styles.productPrice}>
          {product.price} ETH ({product.usdPrice})
        </Text>
        <Text style={styles.purchaseDate}>
          Purchased on: {product.purchaseDate}
        </Text>
        <Text style={styles.creatorInfo}>Creator: {product.creator}</Text>
        <Text style={styles.creationDate}>
          Created on: {product.creationDate}
        </Text>
        {/* Add buttons or other interactive elements as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    margin: 10,
    // additional styles if needed
  },
  productImage: {
    width: '100%',
    height: 300,
    // adjust styles according to your needs
  },
  detailsContainer: {
    padding: 20,
    // additional styles if needed
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productId: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  purchaseDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  creatorInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  creationDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  // Add styles for your buttons and any other elements
});

export default ProductDetailsScreen;
