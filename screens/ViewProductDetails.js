import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AddProductToCart } from '../services/ApiProduct';

export default function ViewProductDetails({ route, navigation }) {
    const { item } = route.params;
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [id, setId] = useState();
    const [category, setCategory] = useState();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        console.log(item)
        setImage(item.image)
        setTitle(item.title)
        setPrice(item.price)
        setDescription(item.description)
        setId(item.id)
        setCategory(item.category)
    }, [])

    const AddToCart = async () => {
        console.log('Adding to cart', item)
        const ProductArray = [
            {
                id: id, title: title, price: price, description: description, category: category, image: image
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
                <Pressable onPress={() => navigation.navigate('ProductList')}><Icon name="arrow-back" size={24} color="#fff" /></Pressable>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <Text style={styles.fontTitle}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.price}>R{item.price}</Text>
                    <Pressable style={styles.Button} onPress={() => AddToCart()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={styles.icon} name="shopping-cart" size={24} />
                            <Text style={styles.CartButton} >Add To Cart</Text>
                        </View>
                    </Pressable>
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
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center',
        width: '100%',

    },
    image: {
        width: 270,
        height: 270,
        marginTop: 10,
        alignItems: 'center',
    },
    description: {
        alignItems: 'center',
        padding: 5,
        textAlign: 'center',

    },
    fontTitle: {
        fontSize: 25,
        fontWeight: 1000,
        color: '#6bc13b',
        alignItems: 'center',
        padding: 10,
        textAlign: 'center',
    },
    price: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6bc13b',
        alignItems: 'center',
        marginTop: 20
    },
    icon: {
        fontWeight: 700,
        color: '#6bc13b',
    },
    CartButton: {
        fontWeight: 700,
        color: '#6bc13b',
    },
    Button: {
        alignItems: 'center',
        marginTop: 20
    },
    content: {
        alignItems: 'center'
    },
    topBar: {
        backgroundColor: "#6bc13b",
        width: '100%',
        height: '10%'
    },
});
