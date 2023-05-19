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
import Home2 from "./pages/home/Home2";
import Login from "./pages/Login";
import { ClientProvider } from "./context/ClientContext";
import Unauthorized from "./pages/Unauthorized";
import SidePanel from "./components/SidePanel";
import Payment from "./pages/main/Payment";
import Transactions from "./pages/main/Transactions";
import Card from "./pages/main/Card";
import Profile from "./pages/main/Profile";
import Settings from "./pages/main/Settings";
import CardsPanel from "./components/CardsPanel";

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
              path='/payment'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Payment />
                  <CardsPanel />
                </ClientProvider>
              }
            ></Route>

            <Route
              path='/transactions'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Transactions />
                  <CardsPanel />
                </ClientProvider>
              }
            ></Route>

            <Route
              path='/card'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Card />
                </ClientProvider>
              }
            ></Route>

            <Route
              path='/'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Profile />
                </ClientProvider>
              }
            ></Route>

            <Route
              path='/settings'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Settings />
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
