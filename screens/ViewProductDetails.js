import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ViewProductDetails({ route, navigation }) {
    const { item } = route.params;
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        console.log(item)
        setImage(item.image)
        setTitle(item.title)
        setPrice(item.price)
        setDescription(item.description)
    }, [])
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('ProductList')}><Icon name="arrow-back" size={24} color="#6bc13b" /></Pressable>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.fontTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
            <Pressable style={styles.Button}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={styles.icon} name="shopping-cart" size={24} />
                    <Text style={styles.CartButton} >Add To Cart</Text>
                </View>
            </Pressable>
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
        alignItems: 'center',
    },
    fontTitle: {
        fontSize: 15,
        fontWeight: 700,
        color: '#6bc13b',
        alignItems: 'center',
        padding: 10
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
    }
});
