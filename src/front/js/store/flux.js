const getState = ({ getStore, getActions, setStore }) => {
<<<<<<< HEAD
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            cart: [] // Adicionando estado para o carrinho de compras
        },
        actions: {
            login: async (email, password) => {
=======
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			productDetails: {},
		},
		actions: {

			login: async(email, password) => {
>>>>>>> 491b94db8f72906f32034aa0660e1f52e32eadaf
                try {
                    // Atualize a URL do backend aqui
                    let response = await fetch('https://musical-spoon-q77j9grp6w74f49px-3001.app.github.dev/api/login', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem("token", data.access_token);
                        return true;
                    } else {
                        console.error("Login failed:", response.statusText);
                        return false;
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    return false;
                }
            },

            // Use getActions to call a function within a function
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch('https://musical-spoon-q77j9grp6w74f49px-3001.app.github.dev/api/hello');
                    const data = await resp.json();
                    setStore({ message: data.message });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                // get the store
                const store = getStore();

                // we have to loop the entire demo array to look for the respective index
                // and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                // reset the global store
                setStore({ demo: demo });
            },

            // Ação para adicionar um item ao carrinho
            addToCart: (product) => {
                const store = getStore();
                const updatedCart = [...store.cart, product];
                setStore({ cart: updatedCart });
            },

<<<<<<< HEAD
            // Ação para remover um item do carrinho
            removeFromCart: (productId) => {
                const store = getStore();
                const updatedCart = store.cart.filter(item => item.id !== productId);
                setStore({ cart: updatedCart });
            },

            // Ação para limpar o carrinho
            clearCart: () => {
                setStore({ cart: [] });
            }
        }
    };
=======
				//reset the global store
				setStore({ demo: demo });
			},

			getProductDetails: async (product_id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products/${product_id}`);

					const data = await resp.json();

					setStore({ productDetails: data.result });
				} catch (error) {
					console.log("Error al cargar el detalle del producto", error);
				}
			} 
		}
	};
>>>>>>> 491b94db8f72906f32034aa0660e1f52e32eadaf
};

export default getState;
