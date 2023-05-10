import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHeader from "./components/admin/AdminHeader";

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <AdminProvider>
          <AdminHeader />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/admin-dashboard' element={<Admin />} />
            </Route>
            <Route path='/admin' element={<AdminLogin />} />
          </Routes>
        </AdminProvider>
        {/* USER */}
      </AuthProvider>
    </div>
  );
}

export default App;
