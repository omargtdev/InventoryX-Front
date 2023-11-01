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

//Clientes
const Clientes = lazy(() => import("../pages/Clientes/Clientes"));
const NuevoCliente = lazy(() => import("../pages/Clientes/NuevoCliente"));
const EditarCliente = lazy(() => import("../pages/Clientes/EditCliente"));
const ViewCliente = lazy(() => import("../pages/Clientes/ViewCliente"));

//Empleados
const Empleados = lazy(() => import("../pages/Empleados/Empleados"));
const NuevoEmpleado = lazy(() => import("../pages/Empleados/NuevoEmpleado"));
const EditarEmpleado = lazy(() => import("../pages/Empleados/EditEmpleado"));
const ViewEmpleado = lazy(() => import("../pages/Empleados/ViewEmpleado"));

//Proveedores
const Proveedores = lazy(() => import("../pages/Proveedores/Proveedores"));
const NuevoProveedor = lazy(() =>
	import("../pages/Proveedores/NuevoProveedor")
);
const EditarProveedor = lazy(() =>
	import("../pages/Proveedores/EditProveedor")
);
const ViewProveedor = lazy(() => import("../pages/Proveedores/ViewProveedor"));
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
				path: "/nuevo-cliente",
				element: (
					<Suspense>
						<NuevoCliente />,
					</Suspense>
				),
			},
			{
				path: "/edit-cliente/:id",
				element: (
					<Suspense>
						<EditarCliente />,
					</Suspense>
				),
			},
			{
				path: "/view-cliente/:id",
				element: (
					<Suspense>
						<ViewCliente />,
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
				index: true,
				element: (
					<Suspense>
						<Proveedores />,
					</Suspense>
				),
			},
			{
				path: "/nuevo-proveedor",
				element: (
					<Suspense>
						<NuevoProveedor />,
					</Suspense>
				),
			},
			{
				path: "/edit-proveedor/:id",
				element: (
					<Suspense>
						<EditarProveedor />,
					</Suspense>
				),
			},
			{
				path: "/view-proveedor/:id",
				element: (
					<Suspense>
						<ViewProveedor />,
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
