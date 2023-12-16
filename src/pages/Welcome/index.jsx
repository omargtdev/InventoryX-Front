import React, { useEffect, useState } from "react";
import providerService from "../../services/providers.service";
import productService from "../../services/product.service";
import clientService from "../../services/client.service";
import receiptService from "../../services/receipt.service";
import { useUserStore } from "../../store/useUserStore";
import { FaFilePdf } from "react-icons/fa";

const Welcome = () => {
	const [providers, setProviders] = useState([]);
	const [products, setProducts] = useState([]);
	const [clients, setClients] = useState([]);
	const [receipts, setReceipts] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchProviders = async () => {
		const {
			isOk,
			providers: allProviders,
			resultMessage,
		} = await providerService.getProviders(token);
		if (!isOk) alert(resultMessage);

		// Obtener los últimos 5 proveedores
		const last5Providers = allProviders.slice(-5);
		setProviders(last5Providers);
	};

	const fetchProducts = async () => {
		const {
			isOk,
			products: allProducts,
			resultMessage,
		} = await productService.getProducts(token);
		if (!isOk) alert(resultMessage);

		// Obtener los últimos 5 productos
		const last5Products = allProducts.slice(-5);
		setProducts(last5Products);
	};

	const fetchClients = async () => {
		const {
			isOk,
			clients: allClients,
			resultMessage,
		} = await clientService.getClients(token);
		if (!isOk) alert(resultMessage);

		const last5Clients = allClients.slice(-5);
		setClients(last5Clients);
	};

	const fetchReceipts = async () => {
		const {
			isOk,
			receipts: allReceipts,
			resultMessage,
		} = await receiptService.getReceipts(token);
		if (!isOk) alert(resultMessage);

		const lastReceipts = allReceipts.slice(-5);
		setReceipts(lastReceipts);
	};

	useEffect(() => {
		fetchProviders();
		fetchProducts();
		fetchClients();
		fetchReceipts();
	}, []);
	return (
		<div className="w-full flex justify-around">
			<div className="flex flex-col gap-5">
				<h1 className="font-sans-montserrat text-[150px]">Inventoryx</h1>
				<div className="bg-[#cfcfcf4f] p-5 rounded-2xl h-fit">
					<h1 className="text-3xl font-bold">Bienvenido</h1>
					<p className="text-lg">
						Este es el inventario de la empresa "InventoryX".
					</p>
					<p className="text-lg">
						Puedes agregar, modificar o eliminar productos, proveedores y
						clientes.
					</p>
					<p className="text-lg">
						Puedes ver la lista de productos, proveedores y clientes.
					</p>
					<p className="text-lg">
						Puedes ver el detalle de cada producto, proveedor y cliente.
					</p>
					<p className="text-lg">
						Puedes agregar, modificar o eliminar productos, proveedores y
						clientes.
					</p>
					<p className="text-lg">
						Puedes realizar, transacciones como entradas y salidas.
					</p>
					<p className="text-lg"></p>
				</div>
				<div className="p-5 rounded-2xl bg-[#cfcfcf4f] text-center">
					<h2 className="font-sans-montserrat font-bold">
						Lista de ultimas Entradas:
					</h2>
					<ul className="divide-y divide-black/50">
						{receipts.map((receipt) => (
							<li key={receipt.id} className="flex gap-3 items-center">
								<div className="flex-1">{receipt.providerName}</div>
								<div className="flex-1">
									{new Date(receipt.registrationDate).toLocaleDateString(
										"en-US"
									)}
								</div>
								<a
									className="flex-1 flex justify-center"
									href={receipt.referralGuideUrl}
									target="_blank"
								>
									{" "}
									<FaFilePdf />
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="w-full p-5 flex justify-center ">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col justify-around p-5 rounded-2xl bg-[#cfcfcf4f] w-fit  text-center gap-6">
						<h1 className="font-bold font-sans-montserrat text-3xl ">
							Ultimos Agregados:
						</h1>
						<div className="">
							<h2 className="font-sans-montserrat font-bold">Proveedores:</h2>
							<ul className="divide-y divide-black/50">
								{providers.map((provider) => (
									<li key={provider.id} className="flex gap-3 items-center ">
										<div className="flex-1">{provider.businessName}</div>
									</li>
								))}
							</ul>
						</div>

						{/* Renderizar la lista de últimos 5 productos */}
						<div>
							<h2 className="font-sans-montserrat font-bold">Productos:</h2>
							<ul className="divide-y divide-black/50">
								{products.map((product) => (
									<li key={product.id}>{product.name}</li>
								))}
							</ul>
						</div>

						{/* Renderizar la lista de últimos 5 clientes */}
						<div>
							<h2 className="font-sans-montserrat font-bold">Clientes:</h2>
							<ul className="divide-y divide-black/50">
								{clients.map((product) => (
									<li key={product.id}>{product.name}</li>
								))}
							</ul>
						</div>
					</div>
					<div className="p-5 rounded-2xl bg-[#cfcfcf4f] text-center">
						<h2 className="font-sans-montserrat font-bold">
							Productos sin Stock:
						</h2>
						<ul className="divide-y divide-black/50">
							{products
								.filter((product) => product.stock === 0)
								.map((product) => (
									<li key={product.id}>{product.name}</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
