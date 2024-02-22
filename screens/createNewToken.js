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

const CreateNewToken = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [qrValue, setQrValue] = useState(' ');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef();

  const handleGenerateQR = async () => {
    // Combine the user input into a single string
    const data = `${productName},${productId},${manufactureDate}`;

    // Secret key for AES encryption
    const secretKey = 'yourSecretKey';

    // Encrypt the data using AES
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

    setQrValue(encryptedData);
    setShowQR(true);
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
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>

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
