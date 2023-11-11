import React, { useState } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useUserStore } from "../../store/useUserStore";
import { optPermisions, optDocuments, colorStyles } from "./Selects.jsx";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";
import warehousesService from "../../services/warehouses.service.js";

const NuevoAlmacen = () => {
	const { showModal } = useGlobalModalContext();

	const [selectedDocument, setSelectedDocument] = useState([]);
	const token = useUserStore((state) => state.token);
	const animatedComponents = makeAnimated(); //animar el select al quitar ubna selección
	const [isLegal, setIsLegal] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (warehouseData) => {
		// Agrega los permisos seleccionados al objeto warehouseData
		//const permissions = selectedPermission.map((option) => option.value);
		//warehouseData.permissions = permissions;

		// Enviar los datos del nuevo empleado al servidor y obtener una respuesta con el nuevo empleado
		const { errorMessage, client, isOk } = await warehousesService.addWarehouse(
			warehouseData
		);
		if (isOk) {
			showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
				title: "Creación exitosa",
				content: "El Almacen se agregó correctamente",
			});
			return;
		}

		showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
			title: "Ocurrio un error",
			content: errorMessage,
		});
	});

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Nuevo Almacen</h1>
			</div>
			<form onSubmit={onSubmit} className="flex flex-col items-center gap-20 ">
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="name"
									{...register("name", { required: true })}
								/>
								<label id="label-input">Nombre</label>
							</div>
							{errors.name && <p className="text-red-500">Ingrese un Nombre</p>}
						</div>

						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="description"
									{...register("description", { required: true })}
								/>
								<label id="label-input">Descripcion</label>
							</div>
							{errors.description && (
								<p className="text-red-500">Ingrese una Descripcion</p>
							)}
						</div>

						<div>
							<div className="relative">
								<input
									type="number"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="maxStock"
									{...register("maxStock", { required: true })}
								/>
								<label id="label-input">Stock</label>
							</div>
						</div>

						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="address"
									{...register("address", { required: true })}
								/>
								<label id="label-input">Direccion</label>
							</div>
							{errors.address && (
								<p className="text-red-500">Ingrese una Direccion</p>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="province"
									{...register("province", { required: true })}
								/>
								<label id="label-input">Provincia</label>
							</div>
							{errors.province && (
								<p className="text-red-500">Ingrese una Provincia</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="city"
									{...register("city", { required: true })}
								/>
								<label id="label-input">Ciudad</label>
							</div>
							{errors.city && (
								<p className="text-red-500">Ingrese una Ciudad</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="district"
									{...register("district", { required: true })}
								/>
								<label id="label-input">Distrito</label>
							</div>
							{errors.district && (
								<p className="text-red-500">Ingrese un Distrito</p>
							)}
						</div>


					</div>
				</div>
				<BtnAdd btnName={"Añadir Almacen"} />
			</form>
		</div>
	);
};

export default NuevoAlmacen;
