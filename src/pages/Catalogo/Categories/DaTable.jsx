import { useState } from "react";
import { Link } from "react-router-dom";
import {
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineFolderView,
} from "react-icons/ai";
import { MODAL_TYPES, useGlobalModalContext } from "../../../components/Modals/GlobalModal";

const DataTable = ({ categories, setCategories }) => {
	const { showModal } = useGlobalModalContext();

	return (
		<h1>my title</h1>
	);
};

export default DataTable;
