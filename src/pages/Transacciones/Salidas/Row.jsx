import React from "react";
import {
	AiOutlineSearch,
	AiOutlineCloseCircle,
	AiOutlineLock,
	AiOutlineUnlock,
} from "react-icons/ai";

const Row = ({
	rowData,
	rowIndex,
	handleOpenModal,
	handleToggleLock,
	handleDeleteRow,
	handleCellValueChange,
}) => {
	console.log(rowData);
	return (
		<tr key={rowIndex} className="bg-white border-b-2 border-black ">
			<td className="text-sm flex justify-center items-center  text-gray-900 font-bold  py-4 gap-2 whitespace-nowrap ">
				<button className="bg-teal-600 rounded-lg">
					<AiOutlineSearch
						className="text-white text-2xl p-1"
						onClick={() => handleOpenModal(rowIndex)}
					/>
				</button>
				{rowData.isUnlocked ? (
					<div className="flex items-center">
						<button
							onClick={() => handleToggleLock(rowIndex)}
							className="bg-gray-600 rounded-lg hover:bg-blue-500 duration-300"
						>
							<AiOutlineLock className="text-white text-2xl p-1" />
						</button>
					</div>
				) : (
					<div className="flex items-center">
						<button
							onClick={() => handleToggleLock(rowIndex)}
							className="bg-blue-600 hover:bg-blue-500 duration-300 rounded-lg"
						>
							<AiOutlineUnlock className="text-white text-2xl p-1" />
						</button>
					</div>
				)}
				<button className="bg-red-600 hover:bg-red-500 duration-300 rounded-lg">
					<AiOutlineCloseCircle
						className="text-white text-2xl p-1"
						onClick={() => handleDeleteRow(rowIndex)}
					/>
				</button>
			</td>
			<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
				{rowData.codigo}
			</td>
			<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
				{rowData.nombre}
			</td>
			<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
				<input
					className="w-20 text-center font-sans-montserrat border-[#3a87bb] border rounded-lg px-2 py-1"
					type="text"
					value={rowData.cantidad}
					onChange={(e) =>
						handleCellValueChange(rowIndex, "cantidad", e.target.value)
					}
					readOnly={rowData.isUnlocked ? true : false}
				/>
			</td>
			<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
				S/{rowData.precio}
			</td>
			<td className="text-base text-gray-900 px-6 py-4 whitespace-nowrap">
				{rowData.total}
			</td>
		</tr>
	);
};

export default Row;
