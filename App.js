import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import ProductList from './screens/ProductList';
import Cart from './screens/Cart';
import ViewProductDetails from './screens/ViewProductDetails';
import Login from './screens/Login'


const Stack = createNativeStackNavigator();


export default function App() {
    const [initialRoute, setInitialRoute] = useState(null); // default is null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('UserLogin');
        console.log(savedUser)
        if (savedUser) {
          setInitialRoute('ProductList'); // or 'Welcome'
        } else {
          setInitialRoute('Login');
        }
      } catch (e) {
        console.error('Failed to load login state:', e);
        setInitialRoute('Login');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ViewProductDetails" component={ViewProductDetails} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


