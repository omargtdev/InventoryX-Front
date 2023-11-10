import React, { useState, useEffect } from "react";
import BtnAdd from "../../components/BtnAdd.jsx";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/useUserStore.js";
import makeAnimated from "react-select/animated";
import {
	optPermisions,
	optDocuments,
	optEstado,
	colorStyles,
} from "./Selects.jsx";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal.jsx";
import warehousesService from "../../services/warehouses.service.js";

const EditarAlmacen = () => {
	const { showModal } = useGlobalModalContext();
	const animatedComponents = makeAnimated();
	const { id } = useParams(); // Obtén el ID del empleado desde la URL
	const [selectedPermission, setSelectedPermission] = useState([]);

	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const token = useUserStore((state) => state.token);

	const fetchData = async (id) => {
		try {
			// Obtén los datos actuales del empleado por su ID
			const {
				isOk,
				warehouse: warehouseData,
				resultMessage,
			} = await warehousesService.getWarehouseById(id);

			if (isOk) {
				// Actualiza el estado con los datos del empleado obtenidos
				setWarehouse(warehouseData);
				//setSelectedPermission(warehouseData.permissions);
			} else {
				alert(resultMessage);
			}
		} catch (error) {
			console.error("Error al obtener datos del warehousee: ", error);
		}
	};

	const [warehouse, setWarehouse] = useState({
		// Define una estructura para almacenar los datos del empleado
		id: "",
		name: "",
		description: "",
		maxStock: "",
		address: "",
		province: "",
		city: "",
		district: "",
	});

	useEffect(() => {
		// Realiza una solicitud para obtener los datos del empleado por su ID
		fetchData(id);
	}, [id]);

	useEffect(() => {
		// Cuando los datos del empleado cambian, asigna esos valores a los campos de entrada
		if (warehouse) {
			setValue("name", warehouse.name);
			setValue("description", warehouse.description);
			setValue("maxStock", warehouse.maxStock);
			setValue("address", warehouse.address);
			setValue("province", warehouse.province);
			setValue("city", warehouse.city);
			setValue("district", warehouse.district);
		}
	}, [warehouse, setValue]);

	const handleUpdatewarehouse = async (updatedwarehouseData) => {
		try {
			// Ensure selectedPermission is not null or undefined
			//if (!selectedPermission) {
			//	setSelectedPermission([]);
			//}

			//updatedwarehouseData.permissions = selectedPermission.map(
			//		(option) => option.value
			//);
			const response = await warehousesService.updateWarehouseById(
				id,
				updatedwarehouseData
			);

			if (response.isOk) {
				showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
					title: "Actualización exitosa",
					content: "El almacen se actualizó correctamente",
				});
			} else {
				showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
					title: "Ocurrio un error",
					content: response.errorMessage,
				});
			}
		} catch (error) {
			console.error("Error al actualizar el almacen: ", error);
		}
	};

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Editar almacen</h1>
			</div>
			<form
				onSubmit={handleSubmit(handleUpdatewarehouse)}
				className="flex flex-col items-center gap-20 "
			>
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="name"
							>
								Nombre
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="name"
								type="text"
								placeholder=""
								name="name"
								{...register("name", { required: true })}
							/>
							{errors.name && (
								<p className="text-red-500">Ingrese sus Nombres</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="description"
							>
								Descripcion
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="description"
								type="text"
								placeholder=""
								name="description"
								{...register("description", { required: true })}
							/>
							{errors.description && (
								<p className="text-red-500">Ingrese la Descripcion</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="maxStock"
							>
								Numero de documento
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="maxStock"
								type="text"
								placeholder=""
								name="maxStock"
								{...register("maxStock", {
									required: true,
								})}
							/>
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="address"
							>
								Dirección
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="address"
								type="text"
								placeholder=""
								name="address"
								{...register("address", { required: true })}
							/>
							{errors.address && (
								<p className="text-red-500">Ingrese una Direccion</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="province"
							>
								Dirección
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="province"
								type="text"
								placeholder=""
								name="province"
								{...register("province", { required: true })}
							/>
							{errors.province && (
								<p className="text-red-500">Ingrese una Provincia</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="city"
							>
								Ciudad
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="city"
								type="text"
								placeholder=""
								name="city"
								{...register("city", { required: true })}
							/>
							{errors.city && (
								<p className="text-red-500">Ingrese una Ciudad</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="district"
							>
								Distrito
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="district"
								type="text"
								placeholder=""
								name="district"
								{...register("district", { required: true })}
							/>
							{errors.district && (
								<p className="text-red-500">Ingrese un Distrito</p>
							)}
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Actualizar Almacen"} />
			</form>
		</div>
	);
};

export default EditarAlmacen;
