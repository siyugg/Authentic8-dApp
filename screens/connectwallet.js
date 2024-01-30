import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // or your navigation library

import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import Home from './HomeTab';
import HomePageNavigate from '../navigators/HomeStackNavigator';
// Add in the useWalletConnectModal hook

const projectId = '91068e323d87f3f46c7c134efcf234f6';

const providerMetadata = {
  name: 'Authentic8',
  description: 'Authentic8',
  url: 'https://authentic8.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

export default function ConnectWallet() {
  // Add in the useWalletConnectModal hook + props
  const {open, isConnected, address, provider} = useWalletConnectModal();
  const navigation = useNavigation(); // hook to get the navigation object

  useEffect(() => {
    if (isConnected) {
      // Navigate to Introtabs when connected
      navigation.navigate('Home');
    }
  }, [isConnected, navigation]); // re-run the effect when isConnected changes

  // Function to handle the
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    } else {
      open();
    }
    // return
  };

  // Main UI Render
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connect to Metamask</Text>
      <Text>{isConnected ? address : 'Not Connected'}</Text>
      <Pressable onPress={handleButtonPress} style={styles.pressableMargin}>
        <Text>{isConnected ? 'Disconnect' : 'Connect'}</Text>
      </Pressable>

      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds={'ALL'}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pressableMargin: {
    marginTop: 16,
  },
});
