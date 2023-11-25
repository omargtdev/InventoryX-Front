import React, { useState, useEffect } from "react";
import productService from "../../../services/product.service";
import { useUserStore } from "../../../store/useUserStore";

const Modal = ({
	isOpen,
	onClose,
	onSelectProduct,
	updateSelectedRowIndex,
}) => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const [selectedProduct, setSelectedProduct] = useState(null);
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

	if (!isOpen) {
		return null;
	}

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectChange = (e) => {
		const productId = Number(e.target.value);
		const selected = products.find((product) => product.id === productId);

		if (selected !== undefined) {
			setSelectedProduct(selected);
		} else {
			console.error("Producto no encontrado");
		}
	};

	const handleAddToTable = () => {
		if (selectedProduct) {
			onSelectProduct(selectedProduct);
			onClose();
			updateSelectedRowIndex(null); // Actualiza el índice en GetProducts
		} else {
			alert("Selección inválida");
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal flex flex-col gap-5">
				<h2 className="flex-0 font-bold font-sans-montserrat">
					Seleccionar Producto
				</h2>
				<div className="flex gap-4">
					<select
						name="producto"
						id="producto"
						className="px-2 py-2 text-gray-600 flex-1 border border-gray-300 rounded outline-[#3a87bb]"
						onChange={handleSelectChange}
					>
						<option value="">Seleccionar Producto</option>
						{filteredProducts.map((product) => (
							<option key={product.id} value={product.id}>
								{product.name}
							</option>
						))}
					</select>
					{/* <input
						type="text"
						placeholder="Buscar por nombre"
						className="px-2 py-2 flex-1 text-gray-600 border border-gray-300 rounded outline-[#3a87bb]"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>*/}
				</div>
				<button
					className="bg-teal-600 text-white font-sans-montserrat w-fit px-6 py-1 m-auto rounded-xl"
					onClick={handleAddToTable}
				>
					Agregar a la Tabla
				</button>
				<button
					className="bg-red-600 text-white font-sans-montserrat w-fit px-6 py-1 m-auto rounded-xl"
					onClick={onClose}
				>
					Cerrar
				</button>
			</div>
		</div>
	);
};

export default Modal;
