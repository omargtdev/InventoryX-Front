import { React, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";

import { LoginUseProvider } from "../context/login/LoginUseProvider";

//inicio
const Welcome = lazy(() => import("../pages/Welcome"));

// Transacciones
const Ventas = lazy(() => import("../pages/Transacciones/Ventas"));
const Compras = lazy(() => import("../pages/Transacciones/Compras"));

// Catalogo
const Productos = lazy(() => import("../pages/Catalogo/Productos"));
const Categorias = lazy(() => import("../pages/Catalogo/Categorias"));
const Marcas = lazy(() => import("../pages/Catalogo/Marcas"));
const SubCategorias = lazy(() => import("../pages/Catalogo/SubCategorias"));

const Clientes = lazy(() => import("../pages/Clientes/Clientes"));
const Empleados = lazy(() => import("../pages/Empleados/Empleados"));
const Usuarios = lazy(() => import("../pages/Usuarios/Usuarios"));
const Proveedores = lazy(() => import("../pages/Proveedores/Proveedores"));

const NuevoEmpleado = lazy(() => import("../pages/Empleados/NuevoEmpleado"));
const EditarEmpleado = lazy(() => import("../pages/Empleados/EditEmpleado"));
const ViewEmpleado = lazy(() => import("../pages/Empleados/ViewEmpleado"));

export const router = createBrowserRouter([
	{
		path: "/login",
		element: (
			<LoginUseProvider>
				<Login />
			</LoginUseProvider>
		),
	},
	{
		path: "/",
		element: <Dashboard />,
		children: [
			{
				path: "/inicio",
				index: true,
				element: (
					<Suspense>
						<Welcome />,
					</Suspense>
				),
			},
			{
				path: "/transacciones",
				element: <Outlet />,
				children: [
					{
						path: "compras",
						element: (
							<Suspense>
								<Compras />,
							</Suspense>
						),
					},
					{
						path: "ventas",
						element: (
							<Suspense>
								<Ventas />
							</Suspense>
						),
					},
				],
			},
			{
				path: "/catalogo",
				element: <Outlet />,
				children: [
					{
						path: "productos",
						element: (
							<Suspense>
								<Productos />
							</Suspense>
						),
					},
					{
						path: "marcas",
						element: (
							<Suspense>
								<Marcas />
							</Suspense>
						),
					},
					{
						path: "categorias",
						element: (
							<Suspense>
								<Categorias />
							</Suspense>
						),
					},
					{
						path: "subCategorias",
						element: (
							<Suspense>
								<SubCategorias />
							</Suspense>
						),
					},
				],
			},
			{
				path: "/clientes",
				index: true,
				element: (
					<Suspense>
						<Clientes />,
					</Suspense>
				),
			},
			{
				path: "/empleados",
				element: (
					<Suspense>
						<Empleados />
					</Suspense>
				),
			},
			{
				path: "/nuevo-empleado",
				element: (
					<Suspense>
						<NuevoEmpleado />
					</Suspense>
				),
			},
			{
				path: "/edit-empleado/:id",
				element: (
					<Suspense>
						<EditarEmpleado />
					</Suspense>
				),
			},
			{
				path: "/view-empleado/:id",
				element: (
					<Suspense>
						<ViewEmpleado />
					</Suspense>
				),
			},
			{
				path: "/usuarios",
				element: (
					<Suspense>
						<Usuarios />,
					</Suspense>
				),
			},
			{
				path: "/proveedores",
				element: (
					<Suspense>
						<Proveedores />,
					</Suspense>
				),
			},
		],
	},
]);
