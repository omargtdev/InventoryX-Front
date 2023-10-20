import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import BtnAdd from "../../components/BtnAdd";
import { useForm } from "react-hook-form";

const NuevoEmpleado = () => {
	const [selectedImage, setSelectedImage] = useState("/src/assets/perfil.jpg");
	console.log(selectedImage);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageURL = URL.createObjectURL(file);
			setSelectedImage(imageURL);
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit((employeeData) => {
		console.log(employeeData);
	});

	return (
		<div className="w-full p-10 mt-10">
			<div>
				<h1 className="text-3xl font-bold mb-10">Nuevo Empleado</h1>
			</div>
			<form onSubmit={onSubmit} className="flex flex-col items-center gap-20 ">
				<div className="flex gap-3 justify-around w-full">
					<div className="flex flex-col flex-1 gap-4">
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

								<label id="label-input">Nombre</label>
							</div>
							{errors.name && <p className="text-red-500">Ingrese un Nombre</p>}
						</div>
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="lastName"
									{...register("lastName", { required: true })}
								/>

								<label id="label-input">Apellido</label>
							</div>
							{errors.lastName && (
								<p className="text-red-500">Ingrese un Apellido</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="user"
									{...register("user", { required: true })}
								/>
								<label id="label-input">Usuario</label>
							</div>
							{errors.user && (
								<p className="text-red-500">Ingrese un Usuario</p>
							)}
						</div>
						<div>
							<div className="w-full flex justify-between gap-3">
								<label className="">Tipo de Documento:</label>
								<select
									className="flex-1 text-center rounded-2xl"
									name="typeDocument"
									id="estado"
									{...register("typeDocument", { required: true })}
								>
									<option value="">Seleccione un documento</option>
									<option value="DNI">DNI</option>
									<option value="RUC">RUC</option>
								</select>
							</div>
							{errors.typeDocument && (
								<p className="text-red-500">Seleccione un documento</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="number"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="documento"
									{...register("documento", {
										required: true,
										minLength: 8,
										maxLength: 11,
									})}
								/>
								<label id="label-input">Nº Documento</label>
							</div>
							{errors.documento && (
								<p className="text-red-500">
									Documento debe tener como minimo 8 y maximo 11 digitos
								</p>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col shrink-0 gap-4 ">
						<div>
							<div className="relative">
								<input
									type="email"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="email"
									{...register("email", {
										required: true,
										pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									})}
								/>
								<label id="label-input">Correo</label>
							</div>
							{errors.email && (
								<p className="text-red-500">Ingrese un correo electronico</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="number"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="phone"
									{...register("phone", {
										required: true,
										minLength: 9,
										maxLength: 9,
									})}
								/>
								<label id="label-input">Celular</label>
							</div>
							{errors.phone?.type === "required" && (
								<p className="text-red-500">Ingrese un numero de celular</p>
							)}
							{errors.phone?.type === "minLength" && (
								<p className="text-red-500">El número debe tener 9 digitos</p>
							)}
							{errors.phone?.type === "maxLength" && (
								<p className="text-red-500">El número debe tener 9 digitos</p>
							)}
						</div>
						<div>
							<div className="relative">
								<input
									type="text"
									className="input-cal input-base"
									id="input"
									placeholder=""
									name="addrees"
									{...register("addrees", { required: true })}
								/>
								<label id="label-input">Dirección</label>
							</div>
							{errors.addrees && (
								<p className="text-red-500">
									Ingrese una dirección de residencia
								</p>
							)}
						</div>
						<div>
							<div className="w-full flex justify-between gap-3">
								<label className="" htmlFor="estado">
									Estado:
								</label>
								<select
									className="flex-1 text-center rounded-2xl"
									name="estado"
									id="estado"
									{...register("estado", { required: true })}
								>
									<option value="">Seleccione estado</option>
									<option value="activo">Activo</option>
									<option value="inactivo">Inactivo</option>
								</select>
							</div>
							{errors.estado && (
								<p className="text-red-500">Seleccione un estado de empleado</p>
							)}
						</div>
					</div>
					<div className="flex flex-col items-center flex-1 gap-4 bg-[#0000001c] p-3 rounded-xl">
						<label htmlFor="foto">Ingrese foto Perfil</label>
						<input
							type="file"
							id="foto"
							name="profileImage"
							onChange={handleImageChange}
						/>

						{selectedImage && (
							<img
								src={selectedImage}
								alt="Imagen seleccionada"
								className="rounded-3xl w-[350px] h-[350px] object-cover"
							/>
						)}
					</div>
				</div>
				<BtnAdd btnName={"Añadir Empleado"} />
			</form>
		</div>
	);
};

export default NuevoEmpleado;
