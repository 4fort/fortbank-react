import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHeader from "./components/admin/AdminHeader";
import Header from "./components/Header";
import Login from "./pages/Login";
import { ClientProvider } from "./context/ClientContext";
import Unauthorized from "./pages/Unauthorized";
import SidePanel from "./components/SidePanel";

import Payment from "./pages/main/Payment/Payment";
import Pay from "./pages/main/Payment/Pay";

import Transactions from "./pages/main/Transactions/Transactions";
import Card from "./pages/main/Account/Card";
import Profile from "./pages/main/Profile";
import Settings from "./pages/main/Settings";
import CardsPanel from "./components/CardsPanel";
import Home from "./pages/main/Home";
import Receive from "./pages/main/Payment/Receive";
import AddCard from "./pages/main/Account/AddCard";
import AddFunds from "./pages/main/Account/AddFunds";

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
                  <div className='container'>
                    <AdminHeader />
                    <Admin />
                  </div>
                </AdminProvider>
              }
            />
          </Route>
          <Route
            path='admin'
            element={
              <AdminProvider>
                <div className='container'>
                  <AdminHeader />
                  <AdminLogin />
                </div>
              </AdminProvider>
            }
          />

          <Route element={<PrivateRoutes />}>
            <Route
              path='/'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Home />
                  <CardsPanel />
                </ClientProvider>
              }
            />

            <Route
              path='/payment'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Payment />
                  <CardsPanel />
                </ClientProvider>
              }
            />
            <Route
              path='/payment/pay'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Pay />
                  <CardsPanel />
                </ClientProvider>
              }
            />
            <Route
              path='/payment/receive'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Receive />
                  <CardsPanel />
                </ClientProvider>
              }
            />

            <Route
              path='/transactions'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Transactions />
                  <CardsPanel />
                </ClientProvider>
              }
            />

            <Route
              path='/card'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Card />
                </ClientProvider>
              }
            />
            <Route
              path='/card/add-funds'
              element={
                <ClientProvider>
                  <SidePanel />
                  <AddFunds />
                </ClientProvider>
              }
            />

            <Route
              path='/profile'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Profile />
                </ClientProvider>
              }
            />

            <Route
              path='/settings'
              element={
                <ClientProvider>
                  <SidePanel />
                  <Settings />
                </ClientProvider>
              }
            />
          </Route>

          <Route
            path='login'
            element={
              <ClientProvider>
                <div className='container'>
                  <Header />
                  <Login />
                </div>
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
