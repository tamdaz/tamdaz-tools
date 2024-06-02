import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Home from "./pages/Home";

import FSTab from "./pages/tools/fstab/FSTab";

const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
			}, {
				path: "/tools/fstab-generator",
				element: <FSTab />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
