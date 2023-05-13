import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHeader from "./components/admin/AdminHeader";
import Home from "./pages/home/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <AdminProvider>
          <AdminHeader />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='admin/dashboard' element={<Admin />} />
            </Route>
            <Route path='admin' element={<AdminLogin />} />
          </Routes>
        </AdminProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />}></Route>
          </Route>
          <Route path='login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
