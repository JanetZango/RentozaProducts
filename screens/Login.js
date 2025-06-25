import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { GetAllUsers,AuthUser } from '../services/ApiProduct';

export default function Login({ navigation }) {
    const [emailaddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await GetAllUsers();
            console.log(users)
        }
        getAllUsers()
    }, [])
    
  const handleSubmit = async() =>{
    const auth = await AuthUser(emailaddress,password)
    console.log(auth)
   
  }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/nature-product.png')} style={styles.image} />
            <Text style={styles.fontText}>Rentoza Products</Text>
            <TextInput value={emailaddress}
                onChangeText={setEmailAddress}
                style={styles.input} placeholder="Email address"
            />
            <TextInput value={password}
                onChangeText={setPassword}
                style={styles.input} placeholder="password" />
            <Pressable style={styles.ButtonSignUp} 
            // onPress={() =>
            //     navigation.navigate('ProductList')
            // }
            onPress={handleSubmit}
            >
                <Text style={styles.textSignUp}>
                    Login
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
    input: {
        marginTop: 20,
        width: 250,
        backgroundColor: '#f2f2f2',
        height: 40,
        paddingLeft: 10
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
