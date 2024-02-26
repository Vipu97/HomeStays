import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPages from "./Pages/LoginPage";
import Layout from "./Components/Layout";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./Context/userContext";
import Profile from "./Pages/Profile";
import SinglePlacePage from "./Pages/SinglePlacePage";
import AddPlacePage from "./Pages/AddPlacePage";
import { ToastContainer } from "react-toastify";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPages />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/account/:subpage" element={<Profile />} />
            <Route path="/account/:subpage/:action" element={<Profile />} />
            <Route path="/account/places/new" element={<AddPlacePage />} />
            <Route path="/account/places/:id" element={<AddPlacePage />} />
            <Route path="/place/:id" element={<SinglePlacePage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition:Bounce
        />
      </UserContextProvider>
  );
}

export default App;
