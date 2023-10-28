import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import { GlobalModal } from "./components/Modals/GlobalModal";

function App() {
	return (
		<GlobalModal>
			<RouterProvider router={router} />
		</GlobalModal>
	);
}

export default App;
