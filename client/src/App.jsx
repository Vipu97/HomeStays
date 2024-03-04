import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Components/Layout";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./Context/userContext";
import ProfilePage from "./Pages/ProfilePage";
import SinglePlacePage from "./Pages/SinglePlacePage";
import AddPlacePage from "./Pages/AddPlacePage";
import { Slide, ToastContainer, } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/:subpage" element={<ProfilePage />} />
            <Route path="/account/:subpage/:action" element={<ProfilePage />} />
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
          transition = {Slide}
        />
      </UserContextProvider>
  );
}

export default App;
