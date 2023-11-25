import { RxDashboard } from "react-icons/rx";
import { RiCouponLine } from "react-icons/ri";
import { FaHandshakeSimple } from "react-icons/fa6";
import { LuWarehouse } from "react-icons/lu";
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
				id: "receipts",
				path: "/transacciones/compras",
				text: "Entradas",
			},
			{
				id: "issues",
				path: "/transacciones/ventas",
				text: "Salidas",
			},
		],
	},
	{
		id: 3,
		icon: <RiCouponLine />,
		text: "Catálogo",
		subItems: [
			{
				id: "products",
				path: "/catalogo/productos",
				text: "Productos",
			},
			{
				id: "categories",
				path: "/catalogo/categorias",
				text: "Categorias",
			},
		],
	},
	{
		id: 4,
		icon: <LuWarehouse />,
		path: "/almacenes",
		text: "Almacenes",
	},
	{
		id: 5,
		icon: <FaHandshakeSimple />,
		path: "/clientes",
		text: "Gestión de Clientes",
	},
	{
		id: 6,
		icon: <FiTruck />,
		path: "/proveedores",
		text: "Gestión de Proveedores",
	},
	{
		id: 7,
		icon: <GoPeople />,
		path: "/empleados",
		text: "Gestión de Empleados",
	},
	{
		id: 8,
		icon: <FiLogOut />,
		text: "Logout",
	},
];
