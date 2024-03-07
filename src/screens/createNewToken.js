import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CryptoJS from 'crypto-js';
import QRCode from 'react-native-qrcode-svg';

import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {ethers} from 'ethers';
import contractABI from '../data/contractABI.json';
import WalletConnectionManager from './connectwallet';
import pinataFileUploader from '../components/upload-file-to-pinata';

const CreateNewToken = ({address}) => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [qrValue, setQrValue] = useState(' ');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef();
  const {open, close, isConnected, provider} = useWalletConnectModal();
  const [cid, setCid] = useState('');
  const [productInfo, setProductInfo] = useState(null);

  const fetchIPFSData = async cid => {
    // Construct the URL using the CID
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data from IPFS');
      const data = await response.json();
      setProductInfo(data);
    } catch (error) {
      console.error('Error fetching IPFS data:', error);
      setProductInfo(null);
    }
  };

  const handleGenerateQR = async () => {
    try {
      // 1. Upload product information to IPFS
      const productInfo = {productName, productId, manufactureDate};
      const cid = await pinataFileUploader(productInfo);

      if (cid) {
        setCid(cid); // Update state with the returned CID
        console.log(`Upload success! IPFS hash: ${cid}`);
        fetchIPFSData(cid);

        // Here you can continue with the other steps like generating the QR code,
        // minting the token on the blockchain, etc.
      } else {
        console.error('Failed to upload product information to IPFS.');
      }

      //   // Step 2: Mint new token with the CID as tokenURI
      // const walletConnector = getWalletConnector(); // Placeholder to get your wallet connection
      // const provider = new ethers.providers.Web3Provider(walletConnector);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(address, contractABI, signer);
      // const transaction = await contract.safeMint(signer.getAddress(), cid);
      // const receipt = await transaction.wait();

      // // Retrieve token details (e.g., Token ID)
      // // This might require you to parse logs or have an event emitted by your contract
      // // Placeholder: tokenUri and contractAddress to be used in QR Code
      // const tokenUri = `ipfs://${cid}`;
      // const contractAddress = address;

      //   // Step 3: Generate QR code
      //   const qrData = JSON.stringify({contractAddress, tokenUri});
      //   const encryptedData = CryptoJS.AES.encrypt(qrData, secretKey).toString();
      //   setQrValue(encryptedData);
      //   setShowQR(true);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      alert('Failed to generate QR code. Check console for details.');
    }
  };

  // const handleGenerateQR = async () => {
  //   // Combine the user input into a single string
  //   const ownerAddress = address; // Assuming the first account is the owner's address

  //   const data = `${productName},${productId},${manufactureDate}, ${ownerAddress}`;

  //   // Secret key for AES encryption
  //   const secretKey = `${secretKey}`;

  //   // Encrypt the data using AES
  //   const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

  //   setQrValue(encryptedData);
  //   setShowQR(true);
  // };

  // const handleGenerateQR = async () => {
  //   if (!walletConnector.isConnected) {
  //     // Prompt the user to connect their wallet
  //     open();
  //   } else {
  //     // User's wallet is already connected
  //     // Assume you have your contract ABI and address
  //     const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

  //     const provider = new ethers.providers.Web3Provider(walletConnector);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       signer,
  //     );

  //     try {
  //       // Use the contract to mint a new token
  //       // Adjust with your contract's mint function and parameters
  //       const tx = await contract.safeMint(
  //         walletConnector.accounts[0] /* tokenURI or other parameters */,
  //       );
  //       console.log('Transaction submitted:', tx.hash);

  //       // Optionally, wait for the transaction to be mined
  //       await tx.wait();
  //       console.log('Minting completed.');
  //     } catch (error) {
  //       console.error('Transaction failed:', error);
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Mine a Token</Text>
        <View style={styles.inputContainer}>
          <Text>Product Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
          />
          <Text>Product ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Product ID"
            value={productId}
            onChangeText={setProductId}
          />
          <Text>Manufacture Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Manufacture Date"
            value={manufactureDate}
            onChangeText={setManufactureDate}
          />
          <Text>Secret Key</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={secretKey}
            onChangeText={setSecretKey}
          />
        </View>
        <WalletConnectModal />

        <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
        {cid && <Text>Uploaded CID: {cid}</Text>}
        {productInfo && (
          <View>
            <Text>Product Name: {productInfo.productName}</Text>
            <Text>Product ID: {productInfo.productId}</Text>
            <Text>Manufacture Date: {productInfo.manufactureDate}</Text>
          </View>
        )}

        {showQR && (
          <View style={styles.qrContainer} ref={qrRef}>
            <QRCode
              value={qrValue}
              size={200}
              color="black"
              backgroundColor="white"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 30,
    marginLeft: 50,
  },
});

export default CreateNewToken;
