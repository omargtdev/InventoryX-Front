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
const Products = lazy(() => import("../pages/Catalogo/Products/Products"));
const Categories = lazy(() => import("../pages/Catalogo/Categories/Categories"));

const Clientes = lazy(() => import("../pages/Clientes/Clientes"));
const Empleados = lazy(() => import("../pages/Empleados/Empleados"));
const Proveedores = lazy(() => import("../pages/Proveedores/Proveedores"));

const NuevoEmpleado = lazy(() => import("../pages/Empleados/NuevoEmpleado"));
const EditarEmpleado = lazy(() => import("../pages/Empleados/EditEmpleado"));
const ViewEmpleado = lazy(() => import("../pages/Empleados/ViewEmpleado"));

const Almacenes = lazy(() => import("../pages/Almacenes/Almacenes"));

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
								<Products />
							</Suspense>
						),
					},
					{
						path: "categorias",
						element: (
							<Suspense>
								<Categories />
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
				path: "/proveedores",
				element: (
					<Suspense>
						<Proveedores />,
					</Suspense>
				),
			},
			{
				path: "/almacenes",
				element: (
					<Suspense>
						<Almacenes />,
					</Suspense>
				),
			},
		],
	},
]);
