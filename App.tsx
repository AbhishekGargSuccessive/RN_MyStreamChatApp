import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Routes} from './app/routes/Routes';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <Routes />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
