import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

export default function Welcome({navigation}) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/rentozaImage.png')} style={styles.image} />
            <Text style={styles.fontText}>Rentoza Products</Text>
            <Pressable style={styles.ButtonSignUp} onPress={()=>
                navigation.navigate('ProductList')
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
    },
    fontText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#23375c'
    },
    ButtonSignUp: {
        backgroundColor: '#149E7E',
        marginTop: 20,
        width: 280,
        height: 35,
        padding: 5
    },
    textSignUp: {
        color: '#fff',
        textAlign: 'center',
    },
    image:{
        width:100,
        height:100
    }
});
