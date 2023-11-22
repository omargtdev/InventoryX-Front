import React, { useEffect, useState } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";
import productService from "../../services/product.service.js";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useUserStore } from "../../store/useUserStore";
import { optPermisions, optDocuments, colorStyles } from "./Selects.jsx";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";
import categoryService from "../../services/category.service.js";
import warehousesService from "../../services/warehouses.service.js";

const NuevoProducto = () => {
	const { showModal } = useGlobalModalContext();
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([null]);

	useEffect(() => {
		// Llama al servicio para obtener las categorías
		const fetchCategories = async () => {
			const {
				isOk,
				categories: fetchedCategories,
				errorMessage,
			} = await categoryService.getCategories();

			if (isOk) {
				// Formatea los datos de las categorías para ser compatibles con el Select
				const formattedCategories = fetchedCategories.map((category) => ({
					value: category.id,
					label: category.name,
				}));

				setCategories(formattedCategories);
			} else {
				console.error(`Error al obtener categorías: ${errorMessage}`);
			}
		};

		fetchCategories();
	}, []);

	const [warehouses, setWarehouses] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);

	useEffect(() => {
		const fetchWarehouses = async () => {
			const {
				isOk,
				warehouses: fetchedWarehouses,
				errorMessage,
			} = await warehousesService.getWarehouses();

			if (isOk) {
				const formattedWarehouses = fetchedWarehouses.map((warehouse) => ({
					value: warehouse.id,
					label: warehouse.name,
				}));

				setWarehouses(formattedWarehouses);
			} else {
				console.error(`Error al obtener almacenes: ${errorMessage}`);
			}
		};

		fetchWarehouses();
	}, []);

	const token = useUserStore((state) => state.token);
	const animatedComponents = makeAnimated(); //animar el select al quitar ubna selección
	const [isLegal, setIsLegal] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (productData) => {
		// Agrega los permisos seleccionados al objeto productData
		//const permissions = selectedPermission.map((option) => option.value);
		//productData.permissions = permissions;
		productData.categoryId = selectedCategory ? selectedCategory.value : null;
		productData.warehouseId = selectedWarehouse
			? selectedWarehouse.value
			: null;

		// Enviar los datos del nuevo empleado al servidor y obtener una respuesta con el nuevo empleado
		const { errorMessage, product, isOk } = await productService.addProduct(
			productData
		);
		if (isOk) {
			showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
				title: "Creación exitosa",
				content: "El Producto se agregó correctamente",
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
				<h1 className="text-3xl font-bold mb-10">Nuevo Producto</h1>
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
									name="code"
									{...register("code", { required: true })}
								/>
								<label id="label-input">Code</label>
							</div>
							{errors.code && (
								<p className="text-red-500">Ingrese Nombre del Producto</p>
							)}
						</div>
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
							{errors.name && (
								<p className="text-red-500">Ingrese Nombre del Producto</p>
							)}
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
								<p className="text-red-500">Ingrese Descripcion</p>
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
									name="brand"
									{...register("brand", { required: true })}
								/>
								<label id="label-input">Marca</label>
							</div>
							{errors.brand && (
								<p className="text-red-500">Ingrese una Marca </p>
							)}
						</div>
						<div>
							<div className="w-full flex flex-col gap-3">
								<label className="" htmlFor="categoryId">
									Categoría:
								</label>
								<Select
									className="w-full text-center"
									name="categoryId"
									id="categoryId"
									onChange={(selectedOption) =>
										setSelectedCategory(selectedOption)
									}
									options={categories}
									isSearchable={false}
									required
									placeholder="Seleccione una categoría"
								/>
							</div>
						</div>
						<div>
							<label className="" htmlFor="warehouseId">
								Almacén:
							</label>
							<Select
								className="w-full text-center"
								name="warehouseId"
								id="warehouseId"
								onChange={(selectedOption) =>
									setSelectedWarehouse(selectedOption)
								}
								options={warehouses}
								isSearchable={false}
								required
								placeholder="Seleccione un almacén"
								value={selectedWarehouse}
							/>
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Añadir Producto"} />
			</form>
		</div>
	);
};

export default NuevoProducto;
