import { loadStripe } from '@stripe/stripe-js';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			productDetails: {},
			cart: [],
			allProducts: [],
			orderList: [],
			dogProducts: [],
			catProducts: [],
			roedorProducts: [],
			avesProducts: [],
			pecesProducts: [],
			cartCount: 0,
			orderItems: [],
			orderStatus: {}

		},
		actions: {

			login: async (email, password) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + `/api/login`, {
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

			registro: async (email, password) => {
				try {
					// Actualiza la URL del backend para la ruta de registro
					let response = await fetch('https://bookish-guacamole-69v5vr55jj5pfpq6-3001.app.github.dev/api/registro', {
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
						console.error("Registro fallido:", response.statusText);
						return false;
					}
				} catch (error) {
					console.error("Error en el registro:", error);
					return false;
				}
			},





			// // Use getActions to call a function within a function
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try {
			// 		const resp = await fetch('https://musical-spoon-q77j9grp6w74f49px-3001.app.github.dev/api/hello');
			// 		const data = await resp.json();
			// 		setStore({ message: data.message });
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error);
			// 	}
			// },

			// changeColor: (index, color) => {
			// 	// get the store
			// 	const store = getStore();

			// 	// we have to loop the entire demo array to look for the respective index
			// 	// and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	// reset the global store
			// 	setStore({ demo: demo });
			// },

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

					if (data.result) {
						const store = getStore();
						const updatedCart = [...store.cart, product_details];
						setStore({ cart: updatedCart });
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.log("Error al añadir producto al carrito", error);
					return false;
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
					if (resp.ok) {
						const data = await resp.json();
						console.log("Fetched all products:", data.results);
						setStore({ allProducts: data.results });
					} else {
						console.log("Error fetching products", resp.statusText);
					}
				} catch (error) {
					console.error("Error fetching products", error);
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
			},

			getProductsByCategory: async (category) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products?category=${category}`);
					const data = await resp.json();
					setStore({ ...getStore(), dogProducts: data.results });
				} catch (error) {
					console.log("Error al cargar los productos por categoría", error);
				}
			},

			getAllOrders: async (token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/order-list`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					const data = await resp.json();

					setStore({ ...getStore(), orderList: data.results });
				} catch (error) {
					console.log.apply("Error al cargar la lista de pedidos", error);
				}
			},

			getProductsByCategory: async (category) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products?category=${category}`);
					const data = await resp.json();
					setStore({ ...getStore(), catProducts: data.results });
				} catch (error) {
					console.log("Error al cargar los productos por categoría", error);
				}
			},

			getProductsByCategory: async (category) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products?category=${category}`);
					const data = await resp.json();
					setStore({ ...getStore(), roedorProducts: data.results });
				} catch (error) {
					console.log("Error al cargar los productos por categoría", error);
				}
			},

			getProductsByCategory: async (category) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products?category=${category}`);
					const data = await resp.json();
					setStore({ ...getStore(), avesProducts: data.results });
				} catch (error) {
					console.log("Error al cargar los productos por categoría", error);
				}
			},

			getProductsByCategory: async (category) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/products?category=${category}`);
					const data = await resp.json();
					setStore({ ...getStore(), pecesProducts: data.results });
				} catch (error) {
					console.log("Error al cargar los productos por categoría", error);
				}
			},

			getAllItems: async (token, id_order) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/order-items/${id_order}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					const data = await resp.json();

					setStore({ ...getStore(), orderItems: data.results, orderStatus: data.status });
				} catch (error) {
					console.log("Erro al cargar los productos del pedido", error);
				}
			},

			getAllKartItems: async (token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/carrito`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					const data = await resp.json();

					setStore({ ...getStore(), orderItems: data.results, orderStatus: data.status });
				} catch (error) {
					console.log("Erro al cargar los productos del pedido", error);
				}
			},

			checkout: async (id, total) => {
				const stripePromise = loadStripe('pk_test_51Po4fAJA9bLtD1vVqtRAbDnyup43XOaOn5JIbGqQYWoF6fQsYo1kJHWUSRqliCqo7XT6ZMJV3QoOejEf4c0jDQpY00zNwrihpf');
				const stripe = await stripePromise;

				const response = await fetch(process.env.BACKEND_URL + '/api/create-checkout-session', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: 'Baxter Shop - Pedido: #' + id,
						amount: total * 100,  // en centavos (5000 centavos = 50.00 USD)
						quantity: 1,
					}),
				});

				const session = await response.json();
				console.log('Session ID:', session.id);

				const result = await stripe.redirectToCheckout({
					sessionId: session.id,
				});

				if (result.error) {
					console.error(result.error.message);
				}
			},

			removeItemKart: async (token, product_id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/quitar', {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({
							id: product_id
						})
					});
					const data = await resp.json();

					//setStore({ ...getStore(), orderItems: data.results, orderStatus: data.status });
				} catch (error) {
					console.log("Erro al cargar los productos del pedido", error);
				}
			},

			success: async (token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/success', {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({
							payed: true
						})
					});

					const data = await resp.json();
				} catch (error) {
					console.log("Error al procesar el pago de la compra!", error);
				}
			}
		}
	};
};

export default getState;
