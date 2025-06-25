import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { GetAllUsers, AuthUser } from '../services/ApiProduct';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showAlerterror, setShowAlerterror] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await GetAllUsers();
            console.log(users)
        }
        getAllUsers()
    }, [])

    const handleSubmit = async () => {
        const auth = await AuthUser(username, password)
        console.log(auth)

        if (auth === '' || auth.length === 0) {
            setShowAlert(false)
            setShowAlerterror(true)
        } else {
            setShowAlert(true)
            setShowAlerterror(false)
            AsyncStorage.setItem('UserLogin', JSON.stringify(auth));
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require('../assets/nature-product.png')} style={styles.image} />
            <Text style={styles.fontText}>Rentoza Products</Text>
            <TextInput value={username}
                onChangeText={setUsername}
                style={styles.input} placeholder="Username"
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
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Yeppi"
                message="Login..you can click ok to Login"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#6bc13b"
                onConfirmPressed={() => {
                    navigation.navigate('ProductList')
                }}
                customView={
                    <Image
                        source={require("../assets/Happy2Face.jpeg")}
                        style={{ width: 60, height: 60 }}
                    />
                }
            />
            <AwesomeAlert
                show={showAlerterror}
                showProgress={false}
                title="Oh no"
                message="You have entered incorrect data, Please try again"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#6bc13b"
                onConfirmPressed={() => {
                    setShowAlerterror(false);
                }}
                customView={
                    <Image
                        source={require("../assets/sadFace.png")}
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
