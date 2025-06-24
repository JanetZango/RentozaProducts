import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GetAllCarts } from '../services/ApiProduct'

export default function Cart() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AllCarts = await GetAllCarts();
        console.log(AllCarts)
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData()
  }, [])



  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});