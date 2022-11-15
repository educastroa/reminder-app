import Reminder, {
  action as reminderAction,
  loader as reminiderLoader,
} from "./components/Reminder";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  Route,
  Routes
} from "react-router-dom";
import { Login } from "./components/Login";
import { useEffect, Fragment } from "react";
import { useAuth } from "./auth";
import ProtectedRoute from "./components/ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <main className="bg-gray-900 font-Poppins flex  h-screen items-center justify-center">
//         <Outlet />
//       </main>
//     ),
//     children: [
//       {
//         path: "reminder",
//         element: <Reminder />,
//         action: reminderAction,
//         loader: reminiderLoader,
//       },
//       {
//         path: "*",
//         element: <Navigate to="/reminder" replace={true} />,
//       },
//     ],
//   },
// ]);

function App() {
  const { checkLogin, isChecked } = useAuth();

  useEffect(() => {
    checkLogin();
  }, []);

  return (<div className="bg-gray-900 font-Poppins flex h-screen items-center justify-center">
    {isChecked && (
      <Routes>
        <Route path="/remainder" element={<ProtectedRoute><Reminder /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/remainder" replace />} />
      </Routes>
    )}
  </div>)

  // <RouterProvider router={router} />
}

export default App;
