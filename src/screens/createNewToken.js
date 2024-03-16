import React, {useState, useRef, useContext, useEffect} from 'react';
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
import {useWallet} from './wallet_connection/walletContext';
import {ethers} from 'ethers';
import contractABI from '../data/contractABI.json';
import WalletConnectionManager from './connectwallet';
import pinataFileUploader from '../components/upload-file-to-pinata';
import ConnectWallet from './connectwallet';

const CreateNewToken = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [qrValue, setQrValue] = useState(' ');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef();
  const [cid, setCid] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const {address, isConnected, provider} = useWallet();
  const ganacheUrl = process.env.REACT_APP_GANACHE_URL;
  const privateKey = process.env.REACT_APP_ACCOUNT_PRIVATE_KEY;
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  if (!isConnected) {
    console.log('your app is not connected');
    return null;
  }

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

  const activateContract = async ({cid}) => {
    console.log(`Attempting to connect to Ganache at ${ganacheUrl}`);
    const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);
    // console.log('Provider instantiated:', provider);

    const signer = new ethers.Wallet(privateKey, provider);
    // console.log('signer ready: ', signer);

    // Connect to contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log('Initiating transaction');
    try {
      const transaction = await contract.safeMint(address, cid, {
        gasLimit: 285000,
        value: ethers.utils.parseEther('0.05'),
      });
      console.log('Transaction initiated: ', transaction);
      const receipt = await transaction.wait();
      console.log('receipt: ', receipt);
      balance = await contract.balanceOf(address);
      console.log('assets balance: ', balance.toString());
    } catch (error) {
      console.error('Error in initiating transaction: ', error);
    }
  };

  const handleGenerateQR = async () => {
    try {
      // 1. Upload product information to IPFS
      const productInfo = {productName, productId, manufactureDate};
      const cid = await pinataFileUploader(productInfo);
      // const cid = 'dummy';
      setCid(cid); // Update state with the returned CID
      console.log(`Upload success! IPFS hash: ${cid}`);
      // fetchIPFSData(cid);
      await activateContract({cid});

      //2. Connect to Etherum

      //   // Mint new token with the CID as tokenURI
      //   // const transaction = await contract.safeMint(
      //   //   // signer.getAddress(),
      //   //   address,
      //   //   `ipfs://${cid}`,
      //   // );
      //   // console.log('transaction:', transaction);
      //   const receipt = await transaction.wait();
      //   //Fetch tokenId
      //   const currentTokenId = await contract._tokenIdCounter();
      //   const tokenId = currentTokenId.sub(1);

      //   console.log(
      //     `Token minted succesfully with tokenId:
      //     ${tokenId.toString()}`,
      //   );
      // } catch (error) {
      //   console.log('Error connectingto web3 provider', error);
      // }
      // // } else {
      // //   console.error('Ethereum provider (e.g., MetaMask) is not available.');
      // // }

      // // Generate QR code data
      // const qrData = {
      //   tokenId: tokenId.toString(),
      //   contractAddress: contractAddress,
      //   cid: cid,
      // };
      // const qrDataString = JSON.stringify(qrData);
      // const encryptedData = CryptoJS.AES.encrypt(
      //   qrDataString,
      //   secretKey,
      // ).toString();
      // setQrValue(encryptedData);
      // setShowQR(true);
    } catch (error) {
      // console.error('Failed to generate QR code:', error);
      console.log(
        'Failed to generate QR code. Check console for details.',
        error,
      );
    }
  };
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
        {/* <WalletConnectModal /> */}

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
