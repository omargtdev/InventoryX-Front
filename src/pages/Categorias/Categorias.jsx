import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import categorieService from "../../services/category.service";
import { useUserStore } from "../../store/useUserStore";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		const { isOk, categories, resultMessage } =
			await categorieService.getCategories(token);
		if (!isOk) alert(resultMessage);

		setCategories(categories);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="flex flex-col py-10 w-full ">
			<h1 className="text-3xl font-bold">Categorias</h1>
			<DataTable categories={categories} setCategories={setCategories} />
		</div>
	);
};
export default Categories;
