/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Home from './src/screens/Home';
import store from './src/redux/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const persistantStore = store();

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const AppScreen: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true || false,
        }}>
        <Stack.Screen name="App" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHide();
        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // console.warn(e);
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
    // Initialize Firebase
    // if(!firebase.apps.length){
    //   firebase.initializeApp(firebaseConfig);
    // }
  }, []);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={persistantStore.store}>
        <PersistGate loading={null} persistor={persistantStore.persistor}>
          <AppScreen />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
