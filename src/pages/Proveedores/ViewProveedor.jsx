import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useParams } from "react-router-dom";
import providersService from "../../services/providers.service";

const ViewProveedor = () => {
	const { id } = useParams(); // Get the user ID from the URL

	const [provider, setProvider] = useState([]);
	const token = useUserStore((state) => state.token);

	const fetchData = async () => {
		try {
			const {
				isOk,
				provider: providerData,
				resultMessage,
			} = await providersService.getProviderById(id);
			if (!isOk) {
				alert(resultMessage);
			}
			setProvider(providerData);
		} catch (error) {
			console.error("Error fetching employee data: ", error);
		}
	};

	//console.log(client); // Mueve el console.log aquí

	useEffect(() => {
		fetchData();
	}, [id]);



return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10 font-sans-montserrat">
					Detalles del Proveedor
				</h1>
			</div>
			<div className="flex gap-3 justify-around w-full">
				<div className="flex flex-col flex-1 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Nombre:
						</label>
						<p className="text-center font-sans-montserrat">{provider.businessName}</p>
					</div>

					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Documento
						</label>
						<div className="flex items-center justify-center gap-3 ">
						<p className="text-center font-sans-montserrat">
								{provider.ruc}
							</p>
						</div>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Email:
						</label>
						<p className="text-center font-sans-montserrat">{provider.contactEmail}</p>
					</div>
				</div>
				<div className="flex flex-1 flex-col shrink-0 gap-4 bg-[#cfcfcf4f] p-5 rounded-3xl">
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Celular:
						</label>
						<p className="text-center font-sans-montserrat">{provider.contactPhone}</p>
					</div>
					<div>
						<label className="font-semibold text-lg font-sans-montserrat">
							Dirección:
						</label>
						<p className="text-center font-sans-montserrat">{provider.address}</p>
					</div>

				</div>
			</div>
		</div>
	);
}

export default ViewProveedor
