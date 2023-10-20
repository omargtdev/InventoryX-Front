import { RxDashboard } from "react-icons/rx";
import { RiCouponLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { FiTruck } from "react-icons/fi";
import { MdInsights } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export const datas = [
	{
		id: 1,
		icon: <RxDashboard />,
		path: "/inicio",
		text: "Inicio",
	},
	{
		id: 2,
		icon: <MdInsights />,
		text: "Transacciones",
		subItems: [
			{
				id: "compras",
				path: "/transacciones/compras",
				text: "Compras",
			},
			{
				id: "ventas",
				path: "/transacciones/ventas",
				text: "Ventas",
			},
		],
	},
	{
		id: 3,
		icon: <RiCouponLine />,
		text: "Catálogo",
		subItems: [
			{
				id: "productos",
				path: "/catalogo/productos",
				text: "Productos",
			},
			{
				id: "marcas",
				path: "/catalogo/marcas",
				text: "Marcas",
			},
			{
				id: "categorias",
				path: "/catalogo/categorias",
				text: "Categorias",
			},
			{
				id: "subCategorias",
				path: "/catalogo/subCategorias",
				text: "SubCategorias",
			},
		],
	},
	{
		id: 4,
		path: "/clientes",
		icon: <GoPeople />,
		text: "Clientes",
	},
	{
		id: 5,
		path: "/empleados",
		icon: <GoPeople />,
		text: "Gestión de Empleados",
	},
	{
		id: 6,
		path: "/usuarios",
		icon: <GoPeople />,
		text: "Gestión de Usuarios",
	},
	{
		id: 7,
		path: "/proveedores",
		icon: <FiTruck />,
		text: "Gestion de Proveedores",
	},
	{
		id: 8,
		icon: <FiLogOut />,
		text: "Logout",
	},
];
