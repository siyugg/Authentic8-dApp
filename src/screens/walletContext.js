import React, {createContext, useState} from 'react';

// Create a Context
const WalletContext = createContext();

// Provider Component
export const WalletProvider = ({children}) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  return (
    <WalletContext.Provider
      value={{walletAddress, setWalletAddress, isConnected, setIsConnected}}>
      {children}
    </WalletContext.Provider>
  );
};
