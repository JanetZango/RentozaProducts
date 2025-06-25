import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/nature-product.png')} style={styles.image} />
            <Text style={styles.fontText}>Rentoza Products</Text>
            <Pressable style={styles.ButtonSignUp} onPress={() =>
                navigation.navigate('Login')
            }
            >
                <Text style={styles.textSignUp}>
                    Get Started
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    fontText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#23375c',
        textAlign: 'center'
    },
    ButtonSignUp: {
        backgroundColor: '#6bc13b',
        marginTop: 20,
        width: 250,
        height: 35,
        padding: 5,
        alignItems: 'center',
    },
    textSignUp: {
        color: '#fff',
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100
    }
});
