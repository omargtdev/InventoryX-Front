import React, { useState } from "react";
import Modal from "../../../components/Modals/GetProducts/Modal";

import {
	AiOutlineSearch,
	AiOutlineCloseCircle,
	AiOutlineLock,
	AiOutlineUnlock,
} from "react-icons/ai";

const GetProducts = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [tableData, setTableData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isUnlocked, setIsUnlocked] = useState(true);

	const handleClick = () => {
		setIsUnlocked(!isUnlocked);
	};

	const handleAgregarRegistro = () => {
		const nuevaFila = {
			codigo: "",
			nombre: "",
			cantidad: "",
			compra: "",
			venta: "",
			fecha: "",
			total: "",
		};

		setTableData([...tableData, nuevaFila]);
	};

	const handleCellValueChange = (index, columna, valor) => {
		const newData = [...tableData];
		newData[index][columna] = valor;
		setTableData(newData);
	};

	const handleEliminarFila = (index) => {
		const newData = [...tableData];
		newData.splice(index, 1);
		setTableData(newData);
	};

	const handleSearch = () => {
		// Lógica para realizar la búsqueda
		console.log("Realizando búsqueda...");
	};

	const handleClear = () => {
		setSearchTerm("");
		// Lógica para limpiar datos
		console.log("Limpiando datos...");
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<div className="flex justify-between items-center mt-10">
				<h2 className="flex-0 font-sans-montserrat  font-bold">Productos</h2>
				<button
					className="border-[#3a87bb] border px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out"
					onClick={handleAgregarRegistro}
				>
					Agregar Registro
				</button>
			</div>
			<div className="overflow-x-auto w-full  items-center ">
				<div className="py-4 inline-block w-full ">
					<div className="overflow-hidden">
						<table className="w-full text-center">
							<thead className="border-b bg-gray-800">
								<tr>
									<th
										scope="col"
										className="text-sm font-medium text-white px-6 py-4"
									>
										Acciones
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										Codigo
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										Nombre
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										Cantidad
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										P.U Compra
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										P.U Venta
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										Fecha
									</th>
									<th
										scope="col"
										className="text-sm font-lg text-white px-6 py-4"
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody className="border-black border-b-2 ">
								{tableData.map((fila, index) => (
									<tr key={index} className="bg-white border-b-2 border-black ">
										<td className="text-sm flex justify-center items-center  text-gray-900 font-bold  py-4 gap-2 whitespace-nowrap ">
											<button
												className="bg-teal-600 rounded-lg"
												onClick={openModal}
											>
												<AiOutlineSearch className="text-white text-2xl p-1" />
											</button>
											{isUnlocked ? (
												<div className="flex items-center">
													<button
														onClick={handleClick}
														className="bg-blue-600 rounded-lg hover:bg-blue-500 duration-300"
													>
														<AiOutlineUnlock className="text-white text-2xl p-1" />
													</button>
												</div>
											) : (
												<div className="flex items-center">
													<button
														onClick={handleClick}
														className="bg-blue-600 hover:bg-blue-500 duration-300 rounded-lg"
													>
														<AiOutlineLock className="text-white text-2xl p-1" />
													</button>
												</div>
											)}
											<button className="bg-red-600 hover:bg-red-500 duration-300 rounded-lg">
												<AiOutlineCloseCircle
													className="text-white text-2xl p-1 "
													onClick={() => handleEliminarFila(index)}
												/>
											</button>
										</td>

										<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
											{fila.codigo}
										</td>
										<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
											{fila.nombre}
										</td>

										<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
											{fila.cantidad}
										</td>
										<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
											{fila.compra}
										</td>
										<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
											{fila.venta}
										</td>
										<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
											{fila.venta}
										</td>
										<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
											{fila.total}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex gap-5 justify-end mt-5 items-center">
						<h2 className="font-semibold text-2xl">Total</h2>
						<span className="border border-black py-1 px-3 rounded-2xl">
							s/ 1500
						</span>
					</div>
				</div>
			</div>
			<Modal />
		</div>
	);
};

export default GetProducts;
