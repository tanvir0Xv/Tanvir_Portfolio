import { createBrowserRouter } from "react-router";
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import("../Components/HomeComponents/Home/Home"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Home />
            </Suspense>
        ),
		errorElement: <p>404</p>
	}
])