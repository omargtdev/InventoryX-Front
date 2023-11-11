import React, { useState, useEffect } from "react";
import BtnAdd from "../../../components/BtnAdd";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../store/useUserStore";

import categorieService from "../../../services/categorie.service";

const EditCategoria = () => {
	const { id } = useParams(); // Obtén el ID de la categoria desde la URL

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
				categorie: categorieData,
				resultMessage,
			} = await categorieService.getCategorieById(id);

			if (isOk) {
				setCategorie(categorieData);
			} else {
				alert(resultMessage);
			}
		} catch (error) {
			console.error("Error al obtener datos de la categoria: ", error);
		}
	};

	const [categorie, setCategorie] = useState({
		// Define una estructura para almacenar los datos de la categoria
		name: "",
		description: "",
	});

	useEffect(() => {
		// Realiza una solicitud para obtener los datos de la categoria por su ID
		fetchData(id);
	}, [id]);

	useEffect(() => {
		// Cuando los datos de la categoria cambian, asigna esos valores a los campos de entrada
		if (categorie) {
			setValue("name", categorie.name);
			setValue("description", categorie.description);
		}
	}, [categorie, setValue]);

	const handleUpdateCategorie = async (updatedCategorieData) => {
		try {
			// Ensure selectedPermission is not null or undefined
			//if (!selectedPermission) {
			//	setSelectedPermission([]);
			//}

			// Realiza una solicitud para actualizar al empleado
			updatedCategorieData.enabled = categorie.isLegal;
			//updatedClientData.permissions = selectedPermission.map(
			//		(option) => option.value
			//);
			const response = await categorieService.updateCategorieById(
				id,
				updatedCategorieData
			);

			if (response.isOk) {
				alert("Categoria actualizada exitosamente");
			} else {
				alert(response.errorMessage);
			}
		} catch (error) {
			console.error("Error al actualizar la categoria: ", error);
		}
	};

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Editar Cliente</h1>
			</div>
			<form
				onSubmit={handleSubmit(handleUpdateCategorie)}
				className="flex flex-col items-center gap-20 "
			>
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
						<div className="flex flex-col gap-5">
							<div className="flex items-center gap-5">
								<label
									className="font-semibold flex-1 text-lg font-sans-montserrat"
									htmlFor="name"
								>
									Nombre de Categoria
								</label>
								<input
									className="text-center flex-1 p-3 bg-slate-200 font-sans-montserrat py-2 rounded-lg  "
									id="name"
									type="text"
									placeholder=""
									name="name"
									{...register("name", { required: true })}
								/>
								{errors.name && (
									<p className="text-red-500">Ingrese nombre de categoria</p>
								)}
							</div>
							<div className="flex items-center gap-5">
								<label
									className="font-semibold flex-1  text-lg font-sans-montserrat"
									htmlFor="name"
								>
									Descripción de Categoria
								</label>
								<textarea
									className="flex text-center p-3 flex-1 h-24 bg-slate-200 font-sans-montserrat py-2 rounded-lg "
									id="description"
									type="text"
									placeholder=""
									name="description"
									{...register("description", { required: true })}
								/>
								{errors.description && (
									<p className="text-red-500">Ingrese nueva descripción</p>
								)}
							</div>
						</div>
					</div>
				</div>
				<BtnAdd btnName={"Actualizar Categoria"} />
			</form>
		</div>
	);
};

export default EditCategoria;
