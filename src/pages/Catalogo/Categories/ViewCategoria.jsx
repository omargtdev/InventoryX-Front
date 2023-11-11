import React, { useEffect, useState } from "react";
import categorieService from "../../../services/categorie.service";
import { useUserStore } from "../../../store/useUserStore";
import { useParams } from "react-router-dom";

const ViewCategoria = () => {
	const { id } = useParams(); // Get the user ID from the URL

	const [categorie, setCategorie] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		try {
			const {
				isOk,
				categorie: categorieData,
				resultMessage,
			} = await categorieService.getCategorieById(id);
			if (!isOk) {
				alert(resultMessage);
			}
			setCategorie(categorieData);
		} catch (error) {
			console.error("Error fetching categorie data: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10 font-sans-montserrat">
					Detalles de la Categoria
				</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Nombre:
						</label>
						<p className="text-center font-sans-montserrat">{categorie.name}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Descripción:
						</label>
						<p className="text-center font-sans-montserrat">
							{categorie.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewCategoria;
