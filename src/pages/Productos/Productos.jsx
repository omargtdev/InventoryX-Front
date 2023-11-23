import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import productService from "../../services/product.service";
import { useUserStore } from "../../store/useUserStore";

const Productos = () => {
	const [products, setProducts] = useState([]);
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

	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Productos</h1>
			<DataTable products={products} setProducts={setProducts} />
		</div>
	);
};

export default Productos;
