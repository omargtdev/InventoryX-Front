import { React, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";

import { LoginUseProvider } from "../context/login/LoginUseProvider";
import env from "../config/env";

//inicio
const Welcome = lazy(() => import("../pages/Welcome"));

// Transacciones
const Ventas = lazy(() => import("../pages/Transacciones/Salidas/Ventas"));
const Compras = lazy(() => import("../pages/Transacciones/Entradas/Compras"));

// Catalogo
const Categorias = lazy(() => import("../pages/Categorias/Categorias"));
const NuevaCategoria = lazy(() => import("../pages/Categorias/NuevaCategoria"));
const EditarCategoria = lazy(() => import("../pages/Categorias/EditCategoria"));
const ViewCategoria = lazy(() => import("../pages/Categorias/ViewCategoria"));

//Productos
const Productos = lazy(() => import("../pages/Productos/Productos"));
const NuevoProducto = lazy(() => import("../pages/Productos/NuevoProducto"));
const EditarProducto = lazy(() => import("../pages/Productos/EditarProducto"));
const ViewProducto = lazy(() => import("../pages/Productos/ViewProducto"));

//Clientes
const Clientes = lazy(() => import("../pages/Clientes/Clientes"));
const NuevoCliente = lazy(() => import("../pages/Clientes/NuevoCliente"));
const EditarCliente = lazy(() => import("../pages/Clientes/EditarCliente"));
const ViewCliente = lazy(() => import("../pages/Clientes/ViewCliente"));

//Empleados
const Empleados = lazy(() => import("../pages/Empleados/Empleados"));
const NuevoEmpleado = lazy(() => import("../pages/Empleados/NuevoEmpleado"));
const EditarEmpleado = lazy(() => import("../pages/Empleados/EditarEmpleado"));
const ViewEmpleado = lazy(() => import("../pages/Empleados/ViewEmpleado"));

const Usuarios = lazy(() => import("../pages/Usuarios/Usuarios"));

//Proveedores
const Proveedores = lazy(() => import("../pages/Proveedores/Proveedores"));
const NuevoProveedor = lazy(() =>
	import("../pages/Proveedores/NuevoProveedor")
);
const EditarProveedor = lazy(() =>
	import("../pages/Proveedores/EditarProveedor")
);
const ViewProveedor = lazy(() => import("../pages/Proveedores/ViewProveedor"));

//Almacenes
const Almacenes = lazy(() => import("../pages/Almacenes/Almacenes"));
const NuevoAlmacen = lazy(() => import("../pages/Almacenes/NuevoAlmacen"));
const EditarAlmacen = lazy(() => import("../pages/Almacenes/EditarAlmacen"));
const ViewAlmacen = lazy(() => import("../pages/Almacenes/ViewAlmacen"));

console.log(env.BASE_URL);
export const router = createBrowserRouter([
	{
		path: `${env.BASE_URL}login`,
		element: (
			<LoginUseProvider>
				<Login />
			</LoginUseProvider>
		),
	},
	{
		path: `${env.BASE_URL}`,
		element: <Dashboard />,
		children: [
			{
				path: "inicio",
				index: true,
				element: (
					<Suspense>
						<Welcome />
					</Suspense>
				),
			},
			{
				path: "transacciones",
				element: <Outlet />,
				children: [
					{
						path: "compras",
						element: (
							<Suspense>
								<Compras />
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
				path: "catalogo",
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
						path: "productos/nuevo-producto",
						element: (
							<Suspense>
								<NuevoProducto />
							</Suspense>
						),
					},
					{
						path: "productos/edit-producto/:id",
						element: (
							<Suspense>
								<EditarProducto />,
							</Suspense>
						),
					},
					{
						path: "productos/view-producto/:id",
						element: (
							<Suspense>
								<ViewProducto />,
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
						path: "categorias/nueva-categoria",
						element: (
							<Suspense>
								<NuevaCategoria />
							</Suspense>
						),
					},
					{
						path: "categorias/edit-categoria/:id",
						element: (
							<Suspense>
								<EditarCategoria />
							</Suspense>
						),
					},
					{
						path: "categorias/view-categoria/:id",
						element: (
							<Suspense>
								<ViewCategoria />
							</Suspense>
						),
					},
				],
			},
			{
				path: "clientes",
				index: true,
				element: (
					<Suspense>
						<Clientes />
					</Suspense>
				),
			},
			{
				path: "nuevo-cliente",
				element: (
					<Suspense>
						<NuevoCliente />
					</Suspense>
				),
			},
			{
				path: "edit-cliente/:id",
				element: (
					<Suspense>
						<EditarCliente />
					</Suspense>
				),
			},
			{
				path: "view-cliente/:id",
				element: (
					<Suspense>
						<ViewCliente />
					</Suspense>
				),
			},

			{
				path: "empleados",
				element: (
					<Suspense>
						<Empleados />
					</Suspense>
				),
			},
			{
				path: "nuevo-empleado",
				element: (
					<Suspense>
						<NuevoEmpleado />
					</Suspense>
				),
			},
			{
				path: "edit-empleado/:id",
				element: (
					<Suspense>
						<EditarEmpleado />
					</Suspense>
				),
			},
			{
				path: "view-empleado/:id",
				element: (
					<Suspense>
						<ViewEmpleado />
					</Suspense>
				),
			},
			{
				path: "proveedores",
				index: true,
				element: (
					<Suspense>
						<Proveedores />
					</Suspense>
				),
			},
			{
				path: "nuevo-proveedor",
				element: (
					<Suspense>
						<NuevoProveedor />
					</Suspense>
				),
			},
			{
				path: "edit-proveedor/:id",
				element: (
					<Suspense>
						<EditarProveedor />
					</Suspense>
				),
			},
			{
				path: "view-proveedor/:id",
				element: (
					<Suspense>
						<ViewProveedor />
					</Suspense>
				),
			},

			{
				path: "almacenes",
				index: true,
				element: (
					<Suspense>
						<Almacenes />
					</Suspense>
				),
			},
			{
				path: "nuevo-almacen",
				element: (
					<Suspense>
						<NuevoAlmacen />
					</Suspense>
				),
			},
			{
				path: "edit-almacen/:id",
				element: (
					<Suspense>
						<EditarAlmacen />
					</Suspense>
				),
			},
			{
				path: "view-almacen/:id",
				element: (
					<Suspense>
						<ViewAlmacen />
					</Suspense>
				),
			},
		],
	},
]);
