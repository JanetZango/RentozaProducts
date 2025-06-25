import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import ProductList from './screens/ProductList';
import Cart from './screens/Cart';
import ViewProductDetails from './screens/ViewProductDetails';
import Login from './screens/Login'


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ViewProductDetails" component={ViewProductDetails} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


