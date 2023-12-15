import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modals/GetProducts/Modal";
import issueService from "../../../services/issue.service";
import Row from "./Row";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../../components/Modals/GlobalModal";

const GetProducts = ({ selectedClientId }) => {
	const { showModal } = useGlobalModalContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRowIndex, setSelectedRowIndex] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
	const [total, setTotal] = useState(0);
	const updateSelectedRowIndex = (index) => {
		setSelectedRowIndex(index);
	};

	console.log(selectedClientId);

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
				row.cantidad.trim() !== ""
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
			precio: "",
			total: "",
		};

		setTableData([...tableData, nuevaFila]);
		const lastIndex = tableData.length; // Obtén el índice de la última fila
		setSelectedRowIndex(lastIndex);
	};

	const handleCellValueChange = (index, columna, valor) => {
		if (columna === "cantidad" || columna === "precio") {
			// Verifica si el valor es un número
			if (isNaN(Number(valor))) {
				return; // Si no es un número, no actualices el estado
			}
		}

		const newData = [...tableData];
		newData[index][columna] = valor;

		// Actualiza el total basado en la multiplicación de compra y cantidad
		if (columna === "precio" || columna === "cantidad") {
			const compra = parseFloat(newData[index]["precio"]) || 0;
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
			const newData = [...tableData];
			newData[selectedRowIndex] = {
				...newData[selectedRowIndex],
				codigo: product.code,
				nombre: product.name,
				precio: product.price.lastIssuePrice,
			};

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
				row.cantidad.trim() !== ""
		);

		if (!selectedClientId) {
			showModal(MODAL_TYPES.MESSAGE.WARNING_MODAL, {
				title: "Campos faltantes",
				content: "Por favor, seleccione un Cliente.",
			});
			return;
		}

		if (!isAtLeastOneRow || !areAllFieldsFilled) {
			showModal(MODAL_TYPES.MESSAGE.WARNING_MODAL, {
				title: "Campos faltantes",
				content: "Por favor, completa todos los campos antes de crear.",
			});
			return;
		}

		if (isAtLeastOneRow && areAllFieldsFilled) {
			const client = {
				name: selectedClientId.name,
				email: selectedClientId.email,
				phone: selectedClientId.phone,
				documentType: selectedClientId.documentType,
				documentNumber: selectedClientId.documentNumber,
				address: selectedClientId.address,
				isLegal: selectedClientId.isLegal,
			};

			// Crea un array para almacenar los productos
			const products = tableData.map((fila) => ({
				Code: fila.codigo,
				Count: Number(fila.cantidad),
			}));

			// Combina el cliente y los productos en un solo objeto
			const newData = {
				Client: client,
				Products: products,
			};

			console.log(newData);
			const { errorMessage, issues, isOk } = await issueService.createIssue(
				newData
			);

			if (isOk) {
				showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
					title: "Registro exitoso",
					content: "La Entrada se guardó correctamente!",
				});
				return;
			}

			showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
				title: "Ocurrio un error",
				content: errorMessage,
			});
		}
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
										Precio
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
