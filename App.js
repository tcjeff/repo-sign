/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import Providers from './src/providers';

const ConnectButton = () => {
  const connector = useWalletConnect();
  const handleConnect = useCallback(async () => {
    try {
      const conn = await connector.connect();
      console.log('conn: ', conn);
    } catch (error) {
      console.log('error dapp conn: ', error);
    }
  }, [connector]);

  const handleDisconnect = useCallback(async () => {
    try {
      const killSe = await connector.killSession();
      console.log('killSe: ', killSe);
    } catch (error) {
      console.log('error dapp killSe: ', error);
    }
  }, [connector]);

  return (
    <View
      style={{
        alignItems: 'flex-start',
      }}>
      {!connector.connected ? (
        <Button title="Connect" onPress={handleConnect} />
      ) : (
        <Button title="Connected" onPress={handleDisconnect} />
      )}
      <View style={{marginVertical: 10}}>
        {!!connector.accounts && <Text>{connector.accounts[0]}</Text>}
        {!!connector.rpcUrl && <Text>{connector.rpcUrl}</Text>}
      </View>
    </View>
  );
};

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Providers>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              minHeight: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 26, fontWeight: '700'}}>
              Wallet connect v.1
            </Text>
          </View>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step Zero">
              <ConnectButton />
            </Section>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.js</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </Providers>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
