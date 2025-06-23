import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { GetProducts } from '../services/ApiProduct'

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    get_products();
  }, [])

  const get_products = async () => {
    const DisplayProductData = await GetProducts();
    console.log(DisplayProductData, "yes")
    setProducts(DisplayProductData)
    console.log(products)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TextFont}>Product List</Text>
      <ScrollView>
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.divImage}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.description}>R{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
            <Pressable><Text>View</Text></Pressable>
               <Pressable><Text>Add to Cart</Text></Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  TextFont: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#23375c',
    marginTop: 15
  },
  card: {
    width: 350,
    height: 400,
    backgroundColor: 'whitesmoke',
    marginTop: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderColor: 'red',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  divImage: {
    borderColor: 'red',
    width: 300,
    height: 150,
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    color: '#23375c',
    fontWeight: 600,
    marginTop: 70,
    padding: 10,
  },
  description: {
    padding: 10
  },
  price:{
      color: '#23375c',
    fontWeight: 600,
    fontSize:15
  }
});
