import Reminder, { action as reminderAction, loader as reminiderLoader } from "./components/Reminder";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main className="bg-gray-900 font-Poppins flex  h-screen items-center justify-center">
        <Outlet />
      </main>
    ),
    children: [
      {
        path: "reminder",
        element: <Reminder />,
        action: reminderAction,
        loader: reminiderLoader,
      },
      {
        path: "*",
        element: <Navigate to="/reminder" replace={true} />,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
