import React, { useState } from "react";
import { defaultData } from "./MOCK_DATA";
import { Link } from "react-router-dom";
import {
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineFolderView,
} from "react-icons/ai";

const DataTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const itemsPerPage = 8;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
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

	const filterData = defaultData.filter(
		(data) =>
			data.name.toLowerCase().includes(search.toLowerCase()) ||
			data.lastName.toLowerCase().includes(search.toLowerCase())
		// data.email.toLowerCase().includes(search.toLowerCase()) ||
		// data.phone.toString().includes(search)
	);

	let filteredData;

	if (filterStatus === "Activo") {
		filteredData = filterData.filter((data) => data.status === "Activo");
	} else if (filterStatus === "Inactivo") {
		filteredData = filterData.filter((data) => data.status === "Inactivo");
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

	const deleteUser = (id) => {
		console.log(`Deleting user with id ${id}`);
	};

	return (
		<>
			<div className="flex flex-col w-full">
				<div className="my-2 flex gap-3 justify-start items-center">
					<div className="relative ">
						<input
							type="text"
							className="px-2 py-2 text-gray-600 border border-gray-300 rounded outline-[#3a87bb]"
							placeholder="Buscar Empeado..."
							value={search}
							onChange={handleSearchChange}
						/>
					</div>
					<div className="flex gap-10">
						<button
							className="text-black-600 font-medium"
							onClick={() => handleFilter("all")}
						>
							Todo
						</button>
						<button
							className="text-teal-600"
							onClick={() => handleFilter("Activo")}
						>
							Activos
						</button>
						<button
							className="text-red-600"
							onClick={() => handleFilter("Inactivo")}
						>
							Inactivos
						</button>
					</div>
					<div>
						<Link
							to="/nuevo-empleado"
							className=" border-[#3a87bb] border px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out"
						>
							Nuevo Empleado
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
											#
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
											Apellido
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
											Celular
										</th>
										<th
											scope="col"
											className="text-sm font-lg text-white px-6 py-4"
										>
											Estado
										</th>
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
												{data.lastName}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.email}
											</td>
											<td className="text-base text-gray-900  px-6 py-4 whitespace-nowrap">
												{data.phone}
											</td>
											<td
												className={`text-base text-gray-900  px-6 py-4 whitespace-nowrap ${
													data.status === "Activo"
														? "text-green-500"
														: "text-red-500"
												}`}
											>
												{data.status}
											</td>
											<td className="text-sm flex justify-center items-center  text-gray-900 font-bold  py-4 gap-2 whitespace-nowrap w-fit">
												<Link
													to={`/view-empleado/${data.id}`}
													className="bg-teal-600 rounded-lg "
												>
													<AiOutlineFolderView className="text-white text-2xl p-1" />
												</Link>
												<Link
													to={`/edit-empleado/${data.id}`}
													className="bg-blue-600 rounded-lg "
												>
													<AiOutlineEdit className="text-white text-2xl p-1 " />
												</Link>
												<button
													onClick={() => deleteUser(data.id)}
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
