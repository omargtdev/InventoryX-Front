import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modals/GetProducts/Modal";
import Row from "./Row";

const GetProducts = ({ selectedProviderId, selectedDate }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRowIndex, setSelectedRowIndex] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
	const [total, setTotal] = useState(0);
	const [selectedFile, setSelectedFile] = useState(null);
	const updateSelectedRowIndex = (index) => {
		setSelectedRowIndex(index);
	};

	const updateTotal = () => {
		const newTotal = tableData.reduce(
			(acc, row) => acc + (parseFloat(row.total) || 0),
			0
		);
		setTotal(newTotal.toFixed(2));

		// Verifica si hay al menos una fila y si todos los campos están llenos
		const isAtLeastOneRow = tableData.length > 0;
		const areAllFieldsFilled = tableData.every(
			(row) =>
				row.codigo.trim() !== "" &&
				row.nombre.trim() !== "" &&
				row.cantidad.trim() !== "" &&
				row.compra.trim() !== "" &&
				row.venta.trim() !== ""
		);

		setIsCreateButtonDisabled(!isAtLeastOneRow || !areAllFieldsFilled);
	};

	useEffect(() => {
		// Actualiza el total cada vez que cambia tableData
		updateTotal();
	}, [tableData]);

	const handleAgregarProducto = () => {
		const nuevaFila = {
			codigo: "",
			nombre: "",
			cantidad: "",
			compra: "",
			venta: "",
			total: "",
		};

		setTableData([...tableData, nuevaFila]);
		const lastIndex = tableData.length; // Obtén el índice de la última fila
		setSelectedRowIndex(lastIndex);
	};

	const handleCellValueChange = (index, columna, valor) => {
		if (columna === "compra" || columna === "cantidad" || columna === "venta") {
			// Verifica si el valor es un número
			if (isNaN(Number(valor))) {
				return; // Si no es un número, no actualices el estado
			}
		}

		const newData = [...tableData];
		newData[index][columna] = valor;

		// Actualiza el total basado en la multiplicación de compra y cantidad
		if (columna === "compra" || columna === "cantidad") {
			const compra = parseFloat(newData[index]["compra"]) || 0;
			const cantidad = parseFloat(newData[index]["cantidad"]) || 0;
			newData[index]["total"] = (compra * cantidad).toFixed(2);
		}

		setTableData(newData);
	};

	const handleOpenModal = (index) => {
		setIsModalOpen(true);
		setSelectedRowIndex(index);
	};

	const handleToggleLock = (index) => {
		// Lógica para cambiar el estado de bloqueo de la fila
		const newData = [...tableData];
		newData[index].isUnlocked = !newData[index].isUnlocked;
		setTableData(newData);
	};

	const handleDeleteRow = (index) => {
		// Lógica para eliminar la fila
		const newData = [...tableData];
		newData.splice(index, 1);
		setTableData(newData);
	};

	const handleSelectProduct = (product) => {
		if (selectedRowIndex !== null) {
			console.log("Selected Row Index:", selectedRowIndex);
			console.log("Selected Product:", product);

			const newData = [...tableData];
			newData[selectedRowIndex] = {
				...newData[selectedRowIndex],
				codigo: product.code,
				nombre: product.name,
			};

			console.log("New Data after Update:", newData);
			setTableData(newData);
			closeModal();
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleCrear = async () => {
		// Verifica si hay al menos una fila y si todos los campos están llenos
		const isAtLeastOneRow = tableData.length > 0;
		const areAllFieldsFilled = tableData.every(
			(row) =>
				row.codigo.trim() !== "" &&
				row.nombre.trim() !== "" &&
				row.cantidad.trim() !== "" &&
				row.compra.trim() !== "" &&
				row.venta.trim() !== ""
		);

		if (!isAtLeastOneRow || !areAllFieldsFilled) {
			// Muestra una alerta si faltan campos por llenar
			alert("Por favor, completa todos los campos antes de crear.");
			return;
		}

		// Verifica si se ha seleccionado un archivo
		if (!selectedFile) {
			alert("Por favor, selecciona un archivo antes de crear.");
			return;
		}
		// Lógica para crear un nuevo array de objetos con los nuevos datos ingresados
		const newData = tableData.map((fila, index) => {
			return {
				ProviderId: selectedProviderId,
				RegistrationDate: selectedDate,
				Products: [
					{
						Code: fila.codigo,
						Count: fila.cantidad,
						UnitPurchasePrice: fila.compra,
						UnitSalesPrice: fila.venta,
					},
				],
			};
		});

		// Añade lógica adicional si es necesario, como enviar newData a una API, etc.
		console.log("Nuevo Array de Objetos:", newData);

		alert("Datos enviados exitosamente.");
	};

	return (
		<div>
			<div className="flex justify-between items-center mt-10">
				<h2 className="flex-0 font-sans-montserrat  font-bold">Productos</h2>
				<button
					className="border-[#3a87bb] border px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out"
					onClick={() => {
						handleAgregarProducto();
					}}
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
										className="text-sm font-medium text-white px-6 py-4"
									>
										Codigo
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-white px-6 py-4"
									>
										Nombre
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-white px-6 py-4"
									>
										Cantidad
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-white px-6 py-4"
									>
										P.U Compra
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-white px-6 py-4"
									>
										P.U Venta
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-white px-6 py-4"
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody className="border-black border-b-2 ">
								{tableData.map((fila, index) => (
									<Row
										key={index}
										rowData={fila}
										rowIndex={index}
										handleOpenModal={handleOpenModal}
										handleToggleLock={handleToggleLock}
										handleDeleteRow={handleDeleteRow}
										handleCellValueChange={handleCellValueChange}
									/>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex gap-5 justify-end mt-5 items-center">
						<h2 className="font-semibold text-2xl">Total</h2>
						<span className="border border-black py-1 px-3 rounded-2xl">
							s/ {total}
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center mt-10 gap-10">
				<h2 className="flex-0 font-sans-montserrat  font-bold">
					Guia de Remisión
				</h2>
				<input
					type="file"
					placeholder="Sube tu Archivo"
					onChange={(e) => setSelectedFile(e.target.files[0])}
				/>
			</div>
			<div className="flex justify-end mt-10 ">
				<button
					className={`border-[#3a87bb] border cursor-pointer px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out ${
						isCreateButtonDisabled ? "hidden" : ""
					}`}
					onClick={handleCrear}
					disabled={isCreateButtonDisabled}
				>
					Crear
				</button>
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSelectProduct={handleSelectProduct}
				updateSelectedRowIndex={updateSelectedRowIndex}
			/>
		</div>
	);
};

export default GetProducts;
