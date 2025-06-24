
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
export const AddProductToCart = async (productArray) => {
    try {
        const AddCart = await fetch('https://fakestoreapi.com/carts/1', {
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


