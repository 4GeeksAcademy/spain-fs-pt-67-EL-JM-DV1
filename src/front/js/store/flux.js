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
			allAves: [
				// { id: 1, nombre: "VITAKRAFT KRÄCKER BARRITAS DE FRUTAS PARA CANARIOS", descripcion:"Snack para loros australianos Vitakraft con barritas de miel, cereales y semillas horneadas para crear una chuchería crujiente, dulce y sabrosa.", imagen: "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw5cb45609/images/snack_cotorras_vitakraft_barritas_miel_VIT21479_M.jpg?sw=780&sh=780&q=85", precio:" 3.99 €"},
				// { id: 2, nombre: "VITAKRAFT KRÄCKER ALBARICOQUE E HIGO BARRITAS PARA PERIQUITOS", descripcion: "Las barritas Kracker de Vitakraft son ideales para ofrecer a tu canario un snack saludable que ofrece un alto aporte de vitaminas y minerales.", imagen: "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw8679cbe4/images/comida_pajaros_vitakraft_barritas_miel_canario_VIT21104_M.jpg?sw=780&sh=780&q=85", precio:" 1.99 €" },
				// { id: 3, nombre: "VITAKRAFT KRÄCKER BARRITAS DE MIEL Y SÉSAMO PARA PERIQUITOS", descripcion: "Las deliciosas barras Kracker de Vitakraft ofrecen a tu periquito un delicioso snack con huevo y semillas de hierbas libres de azúcar ideales para complementar su dieta diaria.", imagen: "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw796146ae/images/snack_periquitos_vitakraft_barritas_sabores_VIT21473.jpg?sw=780&sh=780&q=85",precio:" 1.99 €" },
				// { id: 4, nombre: "VITAKRAFT KRÄCKER BARRAS DE HUEVO Y SEMILLAS DE HIERBAS PARA PERIQUITOS", descripcion: "Las barritas Kracker de Vitakraft son ideales para ofrecer a tu periquito un delicioso snack que brinda un gran aporte de vitaminas y minerales para una vida activa y saludable.", imagen: "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwbcd87887/images/snack_periquitos_vitakraft_barritas_sabores_VIT21102_M.jpg?sw=780&sh=780&q=85",precio:" 1.99 €" },
				// { id: 5, nombre: "VITAKRAFT KRÄCKER MIEL Y SÉSAMO BARRITAS PARA CANARIOS", descripcion: "Alimento en forma de barritas, ricas en proteínas y vitaminas para periquitos.", imagen: "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw9efc0c4c/images/comida_pajaros_vitakraft_barritas_frutas_periquitos_VIT21103_M.jpg?sw=780&sh=780&q=85",precio:" 1.99 €" },
				// { id: 6, nombre: "VITAKRAFT KRÄCKER MIEL Y EUCALIPTO BARIRTAS PARA COTORRAS", descripcion: "Snacks con sabor a albaricoque e higos para tus pequeños amigos de la marca Vitakraft.", imagen: "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw80b9aacd/images/snack_canarios_vitakraft_barritas_sabores_VIT21105_M.jpg?sw=780&sh=780&q=85",precio:" 1.99 €" },
			],
			allGatos:[
			    // { id: 1, nombre:"WELLNESS CORE KITTEN POLLO EN PATÉ SOBRE PARA GATITOS", descripcion:"Comida húmeda para gatitos, con una deliciosa receta de paté de pollo y atún, sin cereales y alta en proteína.", imagen:"https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwe6c590c3/images/wc_kitten_humeda_gato_WEL10845.jpg?sw=528&sh=528", precio:"1.99 Є"},
			    // { id: 2, nombre:"CATZILLA ADULT STERILISED PIENSO PARA GATOS ESTERILIZADOS", descripcion:"Pienso natural con pollo para gatos esterilizados adultos.", imagen:"https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwd4ba3c2f/images/comida_gatos_catzilla_feline_adult_sterilised_CTZ2217_M.jpg?sw=528&sh=528", precio:"18.99 Є"},
			    // { id: 3, nombre:"NATURE'S VARIETY SELECTED ADULT STERILISED POLLO PARA GATOS", descripcion:"Pienso natural sin gluten para gatos adultos, elaborado con carne de pollo deshuesada de alta calidad como ingrediente principal.", imagen:"https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwddb3d317/images/comida_gato_natures_variety_selected_pollo_gato_NTV927182.jpg?sw=528&sh=528", precio:"3.99 Є"},
			    // { id: 4, nombre:"GOURMET GOLD FONDANT SABORES VARIADOS - MULTIPACK", descripcion:"Comida húmeda para gatos adultos, textura de mousse con corazón de fondant y sabores variados.", imagen:"https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwd17ac96e/images/comida_humeda_gatos_gourmet_gold_fondant_multi_sabor_GOU12362265_M.jpg?sw=780&sh=780&q=85", precio:"8.99 Є"},
			    // { id: 5, nombre:"ADVANCE POLLO Y ARROZ PIENSO PARA GATITOS", descripcion:"Alimento completo y equilibrado para gatitos de 2 a 12 meses, y para gatas gestantes y lactantes.", imagen:"https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwf1de106e/images/comida_gatos_advance_affinity_kitten_pollo_arroz_52050_M_AB24%20(1).png?sw=780&sh=780&q=85", precio:"4.99 Є"},
			    // { id: 6, nombre:"TRUE ORIGINS PURE ADULT STERILISED SALMÓN NO GRAIN PIENSO PARA GATOS", descripcion:"Pienso para gatos adultos esterilizados sin cereales y con sabor a salmón. Apto también para gatos adultos con baja actividad, gatos seniors o con sobrepeso.", imagen:"https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwae61955e/images/comida_gatos_true_origins_pure_adult_sterilised_salmon_TRU88025_M.jpg?sw=780&sh=780&q=85", precio:"4.99 Є"},
			],
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
							"price": product_details.pricev
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
			getAllAves: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/aves`);
					const data = await resp.json();
					setStore({ ...getStore(), allAves: data.results });
				} catch (error) {
					console.log("Error al cargar las aves", error);
				}
			},
			getAllGatos: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/gatos`);
					const data = await resp.json();
					setStore({ ...getStore(), allGatos: data.results });
				} catch (error) {
					console.log("Error al cargar las gatos", error);
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
