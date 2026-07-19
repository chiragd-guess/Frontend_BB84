import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Analytics/Analytics";
import About from "../pages/About/About";

import MainLayout from "../layouts/MainLayout";


export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/about" element={<About />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}