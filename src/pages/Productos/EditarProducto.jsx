import React, { useState, useEffect } from "react";
import BtnAdd from "../../components/BtnAdd.jsx";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/useUserStore.js";
import makeAnimated from "react-select/animated";
import { optDocuments, colorStyles } from "./Selects.jsx"; // Asegúrate de importar optDocuments u opciones similares
import productService from "../../services/product.service.js";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal.jsx";
import categoryService from "../../services/category.service.js";
import warehousesService from "../../services/warehouses.service.js";

const EditarProducto = () => {
	const { showModal } = useGlobalModalContext();
	const animatedComponents = makeAnimated();
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();

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

	const { id } = useParams(); // Obtén el ID del producto desde la URL
	const [product, setProduct] = useState({
		code: "",
		name: "",
		description: "",
		brand: "",
		categoryId: "",
		warehouseId: "",
	});

	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const token = useUserStore((state) => state.token);

	const fetchData = async (id) => {
		try {
			const {
				isOk,
				product: productData,
				resultMessage,
			} = await productService.getProductById(id);

			if (isOk) {
				setProduct(productData);
			} else {
				alert(resultMessage);
			}
		} catch (error) {
			console.error("Error al obtener datos del producto: ", error);
		}
	};

	useEffect(() => {
		fetchData(id);
	}, [id]);

	useEffect(() => {
		if (product) {
			setValue("code", product.code);
			setValue("name", product.name);
			setValue("description", product.description);
			setValue("brand", product.brand);
			setValue("categoryId", product.category?.id); // Usar la ID directamente
			setValue("warehouseId", product.warehouse?.id); // Usar la ID directamente

			// Configura el valor de setSelectedCategory con la ID de la categoría
			setSelectedCategory({
				value: product.category?.id || "",
				label: product.category?.name || "",
			});

			// Configura el valor de setSelectedWarehouse con la ID del almacén
			setSelectedWarehouse({
				value: product.warehouse?.id || "",
				label: product.warehouse?.name || "",
			});
		}
	}, [product, setValue]);

	const handleUpdateProduct = async (productData) => {
		productData.categoryId = selectedCategory ? selectedCategory.value : null;
		productData.warehouseId = selectedWarehouse
			? selectedWarehouse.value
			: null;
		try {
			const response = await productService.updateProductById(id, productData);

			if (response.isOk) {
				showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
					title: "Actualización exitosa",
					content: "El producto se actualizó correctamente",
				});
			} else {
				showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
					title: "Ocurrió un error",
					content: response.errorMessage,
				});
			}
		} catch (error) {
			console.error("Error al actualizar el producto: ", error);
		}
	};

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Editar producto</h1>
			</div>
			<form
				onSubmit={handleSubmit(handleUpdateProduct)}
				className="flex flex-col items-center gap-20 "
			>
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="code"
							>
								Code
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg "
								id="code"
								type="text"
								placeholder=""
								name="code"
								{...register("code", {
									required: true,
								})}
							/>
							{errors.code && <p className="text-red-500">Ingrese su code</p>}
						</div>
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
								<p className="text-red-500">Ingrese Descripcion</p>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div className="flex flex-col gap-2">
							<label
								className="font-semibold text-lg font-sans-montserrat"
								htmlFor="brand"
							>
								Marca
							</label>
							<input
								className="text-center font-sans-montserrat py-1 rounded-lg  "
								id="brand"
								type="text"
								placeholder=""
								name="brand"
								{...register("brand", { required: true })}
							/>
							{errors.description && (
								<p className="text-red-500">Ingrese Descripcion</p>
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
									value={selectedCategory}
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
				<BtnAdd btnName={"Actualizar producto"} />
			</form>
		</div>
	);
};

export default EditarProducto;
