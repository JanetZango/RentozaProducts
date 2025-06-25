import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { GetProducts, GetAllCarts, AddProductToCart } from '../services/ApiProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get_products();
        await GetCarts();
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData()
  }, [])


  const GetCarts = async () => {
    const displayCarts = await GetAllCarts();
    console.log(displayCarts)
  }

  const get_products = async () => {
    const DisplayProductData = await GetProducts();
    console.log(DisplayProductData, "yes")
    setProducts(DisplayProductData)
    console.log(products)
  }

  const AddToCart = async (item) => {
    console.log('Adding to cart', item)
    const ProductArray = [
      {
        id: item.id, title: item.title, price: item.price, description: item.description, category: item.category, image: item.image
      }
    ]
    console.log(ProductArray)
    const post_addCart = await AddProductToCart(ProductArray);
    console.log(post_addCart)
    setShowAlert(true)

  }

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Pressable style={styles.IconButton} onPress={() => {
          navigation.navigate('Cart')
        }}><Icon name="shopping-cart" size={24} color="#fff" /></Pressable>
        <Text style={styles.TextFont}>Product List</Text>
      </View>
      <ScrollView>
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.divImage}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.description}>R{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
            <Pressable onPress={() => {
              navigation.navigate('ViewProductDetails', { item })

            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={styles.icon} name="visibility" size={15} />
                <Text style={styles.viewButton}>View</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => AddToCart(item)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={styles.icon} name="shopping-cart" size={15} />
                <Text style={styles.CartButton} >Add to Cart</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Yeppi"
        message="Product added to cart!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
        customView={
          <Image
            source={require("../assets/HappyFace.png")}
            style={{ width: 60, height: 60 }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  TextFont: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center'
  },
  IconButton: {
    marginLeft: 280,
    marginTop: 10
  },
  topBar: {
    backgroundColor: "#6bc13b",
    width: '100%'
  },
  card: {
    width: 280,
    height: 450,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
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
    color: '#6bc13b',
    fontWeight: 900,
    marginTop: 70,
    padding: 10,
  },
  description: {
    padding: 10
  },
  price: {
    color: '#6bc13b',
    fontWeight: 600,
    fontSize: 15,
    padding: 10,
  },
  viewButton: {
    color: "#6bc13b",
    fontWeight: 700,
    marginTop: 16
  },
  CartButton: {
    color: "#6bc13b",
    fontWeight: 700,
    marginTop: 17
  },
  icon: {
    marginTop: 15,
    color: "#6bc13b",
  }
});
