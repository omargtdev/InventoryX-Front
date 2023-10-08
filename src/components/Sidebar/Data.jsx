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
		text: "Inicio",
	},
	{
		id: 2,
		icon: <MdInsights />,
		text: "Transacciones",
		subItems: [
			{
				id: "compras",
				text: "Compras",
			},
			{
				id: "ventas",
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
				text: "Productos",
			},
			{
				id: "marcas",
				text: "Marcas",
			},
			{
				id: "categorias",
				text: "Categorias",
			},
			{
				id: "subCategorias",
				text: "SubCategorias",
			},
		],
	},
	{
		id: 4,
		icon: <GoPeople />,
		text: "Clientes",
	},
	{
		id: 5,
		icon: <GoPeople />,
		text: "Gestión de Empleados",
	},
	{
		id: 6,
		icon: <GoPeople />,
		text: "Gestión de Usuarios",
	},
	{
		id: 7,
		icon: <FiTruck />,
		text: "Gestion de Proveedores",
	},
	{
		id: 8,
		icon: <FiLogOut />,
		text: "Logout",
	},
];
