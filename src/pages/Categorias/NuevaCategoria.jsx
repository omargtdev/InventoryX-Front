import React, { useState } from "react";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";
import categorieService from "../../services/category.service";

import { useUserStore } from "../../store/useUserStore";

import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";

const NuevaCategoria = () => {
	const { showModal } = useGlobalModalContext();
	const token = useUserStore((state) => state.token);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (categorieData) => {
		// Enviar los datos de la nueva categoria al servidor y obtener una respuesta con el nuevo empleado
		const { errorMessage, categorie, isOk } =
			await categorieService.addCategorie(categorieData);
		if (isOk) {
			showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
				title: "Creación exitosa",
				content: "La categoria se agregó correctamente",
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
				<h1 className="text-3xl font-bold mb-10">Nueva Categoria</h1>
			</div>
			<form onSubmit={onSubmit} className="flex flex-col items-center gap-20 ">
				<div className="flex flex-col gap-5 justify-around w-full">
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
							<label id="label-input">Nombre de Categoria</label>
						</div>
						{errors.name && (
							<p className="text-red-500">Ingrese un Nombre de Categoria</p>
						)}
					</div>

					<div>
						<div className="relative">
							<textarea
								type="text"
								className="input-cal input-base"
								id="input"
								placeholder=""
								name="description"
								{...register("description", { required: true })}
							/>
							<label id="label-input">Descripción</label>
						</div>
						{errors.description && (
							<p className="text-red-500">Ingrese una descripción</p>
						)}
					</div>
				</div>

				<BtnAdd btnName={"Añadir Categoria"} />
			</form>
		</div>
	);
};

export default NuevaCategoria;
