
export const GetProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
export const GetAllCarts = async () => {
    try {
        const Cart_response = await fetch('https://fakestoreapi.com/carts')
        const cart_data = await Cart_response.json();
        console.log(cart_data)
        return cart_data
    } catch (error) {
        console.error("Error fetching carts:", error);
        return [];
    }
}
export const GetAllUsers = async () => {
    try {
        const users_response = await fetch('https://fakestoreapi.com/users')
        const user_data = await users_response.json();
        console.log(user_data)
        return user_data
    } catch (error) {
        console.error("Error fetching carts:", error);
        return [];
    }
}
export const AddProductToCart = async (productArray) => {
    try {
        const AddCart = await fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1,
                products: productArray,
            }),
        });
        console.log(AddCart)
        const add_cart = await AddCart.json();
        console.log('Response:', add_cart);

        return add_cart
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}
export const AuthUser = async (username, password) => {
    console.log(email)
    try {
        const LoginUser = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        console.log(LoginUser)
        const login_user = await LoginUser.json();
        console.log('Response:', login_user);

        return login_user
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

