import React from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectProvider from '@walletconnect/react-native-dapp';

const Providers = ({children}) => {
  return (
    <WalletConnectProvider
        redirectUrl={Platform.OS === 'web' ? window.location.origin : 'wmw://app'}
        storageOptions={{
            asyncStorage: AsyncStorage
        }}
    >
        {children}
    </WalletConnectProvider>
  )
}

export default Providers