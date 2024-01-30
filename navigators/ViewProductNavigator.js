import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from '../screens/home';
import AllProducts from '../screens/AllProducts';
import ProductDetails from '../screens/ProductDetails';
import ProductListScreen from '../screens/AllProducts';
import TransferOwnership from '../screens/transferownership';
import PastTransaction from '../screens/pasttransaction';

const ProductStack = createNativeStackNavigator();

function ViewProduct(initialRouteName) {
  return (
    <ProductStack.Navigator initialRouteName="AllProducts">
      <ProductStack.Screen
        name="AllProducts"
        component={ProductListScreen}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="TransferOwnership"
        component={TransferOwnership}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="PastTransaction"
        component={PastTransaction}
        options={{headerShown: false}}
      />
    </ProductStack.Navigator>
  );
}

export default ViewProduct;
