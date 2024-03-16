import React from 'react';
import axios from 'axios';

const fetchIPFSData = async (cid, setProductInfo) => {
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

export default fetchIPFSData;
