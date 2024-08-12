const getState = ({ getStore, getActions, setStore }) => {
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
			cart: [],
			allProducts: [],
            dogProducts: []
		},
		actions: {

			login: async (email, password) => {
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

			// Ação para remover um item do carrinho
			removeFromCart: (productId) => {
				const store = getStore();
				const updatedCart = store.cart.filter(item => item.id !== productId);
				setStore({ cart: updatedCart });
			},

			// Ação para limpar o carrinho
			clearCart: () => {
				setStore({ cart: [] });
			},

			addToKart: async (product_details, token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/cesta`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({
							"id": product_details.id,
							"price": product_details.price
						})

					});

					const data = await resp.json();

					return data.result;
				} catch (error) {
					console.log("Error al añadir prducto al carrito", error);
				}
			},

			getProductDetails: async (product_id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products/${product_id}`);
					const data = await resp.json();

					setStore({ productDetails: data.result });
				} catch (error) {
					console.log("Error al cargar el detalle del producto", error);
				}
			},

			getAllProducts: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products`);
					const data = await resp.json();

					setStore({ ...getStore(), allProducts: data.results });
				} catch (error) {
					console.log("Error al cargar los productos", error);

				}
			},

			getProductsByCategory: async (category) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + `/api/products?category=${category}`);
                    const data = await resp.json();
                    setStore({ ...getStore(), dogProducts: data.results });
                } catch (error) {
                    console.log("Error al cargar los productos por categoría", error);
                }
            }


		}
	};
};

export default getState;
