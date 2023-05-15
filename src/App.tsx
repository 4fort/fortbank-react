import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHeader from "./components/admin/AdminHeader";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import { ClientProvider } from "./context/ClientContext";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes isSuperUserRequired />}>
            <Route
              path='admin/dashboard'
              element={
                <AdminProvider>
                  <AdminHeader />
                  <Admin />
                </AdminProvider>
              }
            />
          </Route>
          <Route
            path='admin'
            element={
              <AdminProvider>
                <AdminHeader />
                <AdminLogin />
              </AdminProvider>
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path='/'
              element={
                <ClientProvider>
                  <Header />
                  <Home />
                </ClientProvider>
              }
            ></Route>
          </Route>
          <Route
            path='login'
            element={
              <ClientProvider>
                <Header />
                <Login />
              </ClientProvider>
            }
          />
          <Route path='unauthorized' element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
