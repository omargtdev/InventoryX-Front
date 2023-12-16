import React, { useEffect, useState } from "react";
import receiptService from "../../../services/receipt.service";
import { useUserStore } from "../../../store/useUserStore";
import { FaFilePdf } from "react-icons/fa";

const GetEntries = () => {
	const [mostrarLista, setMostrarLista] = useState(false);
	const [receipts, setReceipts] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchReceipts = async () => {
		const { isOk, receipts, resultMessage } = await receiptService.getReceipts(
			token
		);
		if (!isOk) alert(resultMessage);

		// Sort receipts by registrationDate in descending order
		const sortedReceipts = receipts.sort(
			(a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
		);

		setReceipts(sortedReceipts);
	};

	useEffect(() => {
		fetchReceipts();
	}, []);

	const toggleLista = () => {
		setMostrarLista((prev) => !prev);
	};

	return (
		<div className="mt-5">
			<div className="p-5 rounded-2xl bg-[#cfcfcf4f] text-center">
				<h2 className="font-sans-montserrat font-bold mb-2">
					Lista de Entradas:
				</h2>
				<button
					onClick={toggleLista}
					className="bg-black py-2 px-10 rounded-2xl hover:bg-white hover:text-black duration-300 text-white mb-4"
				>
					{mostrarLista ? "Ocultar Entradas" : "Mostrar Entradas"}
				</button>
				<ul
					className={`divide-y divide-black/50 h-80 overflow-y-scroll transition-all duration-500 ${
						mostrarLista ? "max-h-80" : "max-h-0 overflow-hidden"
					}`}
				>
					{receipts.map((receipt) => (
						<li key={receipt.id} className="flex gap-3 items-center">
							<div className="flex-1">{receipt.providerName}</div>
							<div className="flex-1">
								{new Date(receipt.registrationDate).toLocaleDateString("es-ES")}
							</div>
							<a
								className="flex-1 flex justify-center"
								href={receipt.referralGuideUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaFilePdf />
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default GetEntries;
