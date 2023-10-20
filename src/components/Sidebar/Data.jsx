import { RxDashboard } from "react-icons/rx";
import { RiCouponLine } from "react-icons/ri";
import { FaHandshakeSimple } from "react-icons/fa6";
import { LuWarehouse } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { MdInsights } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export const datas = [
	{
		id: 1,
		icon: <RxDashboard />,
		text: "Inicio",
	},
	{
		id: 2,
		icon: <MdInsights />,
		text: "Transacciones",
		subItems: [
			{
				id: "receipts",
				text: "Entradas",
			},
			{
				id: "issues",
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
				text: "Productos",
			},
			{
				id: "categories",
				text: "Categorias",
			}
		],
	},
	{
		id: 4,
		icon: <LuWarehouse />,
		text: "Almacenes",
	},
	{
		id: 5,
		icon: <FaHandshakeSimple />,
		text: "Gestión de Clientes",
	},
	{
		id: 6,
		icon: <FiTruck />,
		text: "Gestión de Proveedores",
	},
	{
		id: 7,
		icon: <FiLogOut />,
		text: "Logout",
	}
];
