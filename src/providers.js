import React from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectProvider from '@walletconnect/react-native-dapp';

const Providers = ({children}) => {
  return (
    <WalletConnectProvider
      clientMeta={{
        name: 'TC mobile Dapp',
        description: 'My dapp to TC',
        url: 'https://tc.com.br',
      }}
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'dapptc://'}
      qrcodeModalOptions={{
        mobileLinks: [
          'rainbow',
          'metamask',
          'argent',
          'trust',
          'imtoken',
          'pillar',
        ],
      }}
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      {children}
    </WalletConnectProvider>
  );
};

export default Providers;
