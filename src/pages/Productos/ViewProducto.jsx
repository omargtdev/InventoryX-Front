import React, { useEffect, useState } from "react";

import { useUserStore } from "../../store/useUserStore";
import { useParams } from "react-router-dom";
import productService from "../../services/product.service";

const ViewProducto = () => {
	const { id } = useParams(); // Get the user ID from the URL

	const [product, setProduct] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		try {
			const {
				isOk,
				product: productData,
				resultMessage,
			} = await productService.getProductById(id);
			if (!isOk) {
				alert(resultMessage);
			}
			setProduct(productData);
			//console.log("product Data:", productData); // Mueve el console.log aquí
		} catch (error) {
			console.error("Error fetching employee data: ", error);
		}
	};

	//console.log(product); // Mueve el console.log aquí

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10 font-sans-montserrat">
					Detalles del Producto
				</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<div>
							<label className="font-semibold text-lg font-sans-montserrat">
								Id:
							</label>
							<p className="text-center font-sans-montserrat">{product.id}</p>
						</div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Code:
						</label>
						<p className="text-center font-sans-montserrat">{product.code}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Nombre:
						</label>
						<p className="text-center font-sans-montserrat">{product.name}</p>
					</div>

					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Descripcion:
						</label>
						<p className="text-center font-sans-montserrat">
							{product.description}
						</p>
					</div>
				</div>
				<div className="flex flex-1 flex-col shrink-0 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Marca:
						</label>
						<p className="text-center font-sans-montserrat">{product.brand}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Categoria:
						</label>
						<p className="text-center font-sans-montserrat">
							{product.category?.name}
						</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Almacen:
						</label>
						<p className="text-center font-sans-montserrat">
							{product.warehouse?.name}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewProducto;
