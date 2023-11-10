import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineFolderView,
} from "react-icons/ai";
import providerService from "../../services/providers.service";
import {
	MODAL_TYPES,
	useGlobalModalContext,
} from "../../components/Modals/GlobalModal";
import { useUserStore } from "../../store/useUserStore";

const DataTable = ({ providers, setProviders }) => {
	const { showModal } = useGlobalModalContext();

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const [providerDeleted, setProviderDeleted] = useState(null);
	const [isAccept, setIsAccept] = useState(false);
	const token = useUserStore((state) => state.token);

	const itemsPerPage = 5;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const deleteProvider = async () => {
		if (!providerDeleted) {
			showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
				title: "Ocurrio un error",
				content:
					"Hubo un error al eliminar el Proveedor. Intentelo denuevo por favor",
			});
			return;
		}

		const { isOk, errorMessage } = await providerService.deleteProvider(
			providerDeleted.id
		);
		if (!isOk) {
			showModal(MODAL_TYPES.MESSAGE.DANGER_MODAL, {
				title: "Ocurrio un error",
				content: errorMessage,
			});
			return;
		}

		const providersMinusProviderDeleted = providers.filter(
			(provider) => provider.id != providerDeleted.id
		);
		setProviders(providersMinusProviderDeleted);
		showModal(MODAL_TYPES.MESSAGE.SUCCESS_MODAL, {
			title: "Eliminación exitosa",
			content: "El Proveedor se eliminó correctamente",
		});
		setProviderDeleted(null);
		setIsAccept(false);
	};

	const handleDeleteProvider = (providers) => {
		setProviderDeleted(providers);
		showModal(MODAL_TYPES.GENERIC.DELETE_MODAL, {
			title: "Eliminar Proveedor",
			content: `¿Está seguro de eliminar al Proveedor ${providers.businessName}?`,
			btnText: "Aceptar",
			acceptAction: () => setIsAccept(true),
		});
	};

	useEffect(() => {
		if (providerDeleted && isAccept) {
			deleteProvider();
		}
	}, [providerDeleted, isAccept]);

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

	const filterData = providers.filter(
		(data) => data.businessName.toLowerCase().includes(search.toLowerCase())
		// data.email.toLowerCase().includes(search.toLowerCase()) ||
		// data.phone.toString().includes(search)
	);

	let filteredData;

	if (filterStatus === "Activo") {
		filteredData = filterData.filter((data) => data.is_active);
	} else if (filterStatus === "Inactivo") {
		filteredData = filterData.filter((data) => !data.is_active);
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
							placeholder="Buscar Proveedor..."
							value={search}
							onChange={handleSearchChange}
						/>
					</div>
					<div>
						<Link
							to="/nuevo-proveedor"
							className=" border-[#3a87bb] border px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out"
						>
							Nuevo Proveedor
						</Link>
					</div>
				</div>
				<div className="overflow-x-auto w-full sm:-mx-6 items-center lg:-mx-8">
					<div className="py-4 inline-block w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="w-full text-center">
								<thead className="border-b bg-gray-800">
									<tr>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-4"
										>
											Codigo
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Nombre
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Ruc
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Email
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Phone
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
												{data.businessName}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.ruc}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.contactEmail}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.contactPhone}
											</td>

											<td className="text-sm flex justify-center items-center  text-gray-900 font-bold  py-4 gap-2 whitespace-nowrap w-fit">
												<Link
													to={`/view-proveedor/${data.id}`}
													className="bg-teal-600 rounded-lg"
												>
													<AiOutlineFolderView className="text-white text-2xl p-1" />
												</Link>
												<Link
													to={`/edit-proveedor/${data.id}`}
													className="bg-blue-600 rounded-lg"
												>
													<AiOutlineEdit className="text-white text-2xl p-1 " />
												</Link>
												<button
													onClick={() => handleDeleteProvider(data)}
													className="bg-red-600 rounded-lg"
												>
													<AiOutlineDelete className="text-white text-2xl p-1 " />
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
