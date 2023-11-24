import React from "react";

const Modal = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		const { isOk, products, resultMessage } = await productService.getProducts(
			token
		);
		if (!isOk) alert(resultMessage);

		setProducts(products);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filteredProducts = products.filter((product) =>
		product.businessName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (!isModalOpen) {
		return null;
	}

	return (
		<div className="modal">
			<h2 className="flex-0 font-sans-montserrat">Seleccionar Producto</h2>
			<select
				name="producto"
				id="producto"
				className="px-2 py-2 text-gray-600 flex-1 border border-gray-300 rounded outline-[#3a87bb]"
			>
				{filteredProducts.map((product) => (
					<option key={product.id} value={product.id}>
						{product.businessName}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Buscar por nombre"
				className="px-2 py-2 flex-1 text-gray-600 border border-gray-300 rounded outline-[#3a87bb]"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={closeModal}>Cerrar</button>
		</div>
	);
};

export default Modal;
