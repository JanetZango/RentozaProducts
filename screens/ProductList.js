import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { GetProducts, GetAllCarts, AddProductToCart } from '../services/ApiProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertLogout, setShowAlertLogout] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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

  const LogoutHandle = async () => {
    try {
      await AsyncStorage.removeItem('UserLogin');
      navigation.replace('Login');
      //  showAlertLogout(true);

    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const ShowAlert = () => {
    console.log('yes sir')
    setShowAlertLogout(true)
  }


  const GetCarts = async () => {
    const displayCarts = await GetAllCarts();
    console.log(displayCarts)
    setCartCount(displayCarts.length);
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
        <View style={styles.leftButtons}>
          <Pressable style={styles.IconButtonLoginOut} onPress={ShowAlert}>
            <Icon name="logout" size={24} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.TextFont}>Product List</Text>

        <View style={styles.rightButtons}>
          <Pressable style={styles.IconButton}>
            <Icon name="shopping-cart" size={24} color="#fff" />
          </Pressable>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
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
        confirmButtonColor="#6bc13b"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
        customView={
          <Image
            source={require("../assets/Happy2Face.jpeg")}
            style={{ width: 60, height: 60 }}
          />
        }
      />

      <AwesomeAlert
        show={showAlertLogout}
        showProgress={false}
        title="Confirmation"
        message="Are you sure you want to logOut? "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, proceed"
        confirmButtonColor="#6bc13b"
        cancelButtonColor="#6E7582"
        onCancelPressed={() => setShowAlertLogout(false)}
        onConfirmPressed={LogoutHandle}
        customView={
          <Image
            source={require("../assets/Happy2Face.jpeg")}
            style={{ width: 60, height: 60, marginBottom: 10 }}
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
  badge: {
  position: 'absolute',
  top: -4,
  right: -4,
  backgroundColor: 'red',
  borderRadius: 10,
  minWidth: 18,
  height: 18,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 4,
  zIndex: 1,
},

badgeText: {
  color: 'white',
  fontSize: 10,
  fontWeight: 'bold',
},
  IconButtonLoginOut: {
    marginLeft: 10,
    // paddingTop:20
  },
  TextFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  IconButton: {
    marginLeft: 230,
    // marginTop: 20
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6bc13b',
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '100%',

  },

  leftButtons: {
    flex: 1,
    alignItems: 'flex-start',
  },

  rightButtons: {
    flex: 1,
    alignItems: 'flex-end',
  },

  TextFont: {
    flex: 2,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  IconButtonLoginOut: {
    padding: 10,
    color: '#6bc13b',
    borderRadius: 6,
  },

  IconButton: {
    padding: 10,
    color: '#6bc13b',
    borderRadius: 6,
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
