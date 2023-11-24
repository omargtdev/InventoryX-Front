import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineFolderView,
} from "react-icons/ai";
import productService from "../../services/product.service";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";
import { useUserStore } from "../../store/useUserStore";

const DataTable = ({ products, setProducts }) => {
	const { showModal } = useGlobalModalContext();

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const token = useUserStore((state) => state.token);

	const itemsPerPage = 5;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const [productDeleted, setProductDeleted] = useState(null);
	const [isAccept, setIsAccept] = useState(false);

	const handleDeleteProduct = (product) => {
		// Esperar a que productDeleted se haya actualizado
		showModal(MODAL_TYPES.GENERIC.DELETE_MODAL, {
			title: "Eliminar producto",
			content: `¿Está seguro de eliminar al producto ${product.name}?`,
			btnText: "Aceptar",
			acceptAction: () => setIsAccept(true),
		});
		setProductDeleted(product);
	};

	useEffect(() => {
		if (productDeleted && isAccept) {
			deleteProduct();
		}
	}, [productDeleted, isAccept]);

	const deleteProduct = async () => {
		if (!productDeleted) {
			showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
				title: "Ocurrio un error",
				content:
					"Hubo un error al eliminar el producto. Intentelo denuevo por favor",
			});
			return;
		}

		// Ahora puedes realizar la eliminación aquí
		const { isOk, errorMessage } = await productService.deleteProduct(
			productDeleted.id
		);
		if (!isOk) {
			showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
				title: "Ocurrio un error",
				content: errorMessage,
			});
			return;
		}
		const productsMinusproductDeleted = products.filter(
			(product) => product.id !== productDeleted.id
		);
		setProducts(productsMinusproductDeleted);
		showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
			title: "Eliminación exitosa",
			content: "El producto se eliminó correctamente",
		});

		// Reiniciar el estado productDeleted después de eliminar
		setProductDeleted(null);
		setIsAccept(false);
	};

	const maxVisiblePages = 3;

	const renderPageNumbers = () => {
		const pageNumbers = [];
		let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
		let end = Math.min(start + maxVisiblePages - 1, totalPages);

		if (end - start + 1 < maxVisiblePages) {
			start = Math.max(end - maxVisiblePages + 1, 1);
		}

		if (start > 1) {
			pageNumbers.push(1);
			if (start > 2) {
				pageNumbers.push("...");
			}
		}

		for (let i = start; i <= end; i++) {
			pageNumbers.push(i);
		}

		if (end < totalPages) {
			if (end < totalPages - 1) {
				pageNumbers.push("...");
			}
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	const filterData = products.filter((data) =>
		data.name.toLowerCase().includes(search.toLowerCase())
	);

	let filteredData;

	if (filterStatus === "Activo") {
		filteredData = filterData.filter((data) => data.isLegal);
	} else if (filterStatus === "Inactivo") {
		filteredData = filterData.filter((data) => !data.isLegal);
	} else {
		filteredData = filterData;
	}

	const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		setCurrentPage(1); // Reset page to 1 when a new search is performed
	};

	const handleFilter = (status) => {
		setFilterStatus(status);
	};

	return (
		<>
			<div className="flex flex-col w-full">
				<div className="my-2 flex gap-3 justify-start items-center">
					<div className="relative ">
						<input
							type="text"
							className="px-2 py-2 text-gray-600 border border-gray-300 rounded outline-[#3a87bb]"
							placeholder="Buscar producto..."
							value={search}
							onChange={handleSearchChange}
						/>
					</div>

					<div>
						<Link
							to="nuevo-producto"
							className=" border-[#3a87bb] border px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out"
						>
							Nuevo producto
						</Link>
					</div>
				</div>
				<div className="overflow-x-auto w-full sm:-mx-6 items-center lg:-mx-8">
					<div className="py-4 inline-block w-full sm:px-4 lg:px-6">
						<div className="overflow-hidden">
							<table className="w-full text-center">
								<thead className="border-b bg-gray-800">
									<tr>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-4"
										>
											#
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Nombre Producto
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Descripcion Producto
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Marca
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Tipo Producto
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Almacen
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										></th>
									</tr>
								</thead>
								<tbody className="border-black border-b-2">
									{currentData.map((data, index) => (
										<tr
											key={index}
											className="bg-white border-b-2 border-black"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
												{index + 1}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.name}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.description}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.brand}
											</td>

											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.category.name}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.warehouse.name}
											</td>

											<td className="text-sm flex justify-center items-center  text-gray-900 font-bold  py-4 gap-2 whitespace-nowrap w-fit">
												<Link
													to={`view-producto/${data.id}`}
													className="bg-teal-600 rounded-lg"
												>
													<AiOutlineFolderView className="text-white text-2xl p-1" />
												</Link>
												<Link
													to={`edit-producto/${data.id}`}
													className="bg-blue-600 rounded-lg"
												>
													<AiOutlineEdit className="text-white text-2xl p-1 " />
												</Link>
												<button
													onClick={() => handleDeleteProduct(data)}
													className="bg-red-600 rounded-lg"
												>
													<AiOutlineDelete className="text-white text-2xl p-1" />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="pagination">
					<ul className="flex justify-center space-x-2">
						{renderPageNumbers().map((pageNumber, index) => (
							<li key={index}>
								{pageNumber === "..." ? (
									<span className="px-3 py-2">...</span>
								) : (
									<button
										className={`${
											pageNumber === currentPage
												? "bg-[#3a87bb] text-white"
												: "bg-white"
										} px-3 py-2 rounded-lg`}
										onClick={() => {
											if (pageNumber !== "...") {
												handlePageChange(pageNumber);
											}
										}}
									>
										{pageNumber}
									</button>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
export default DataTable;
