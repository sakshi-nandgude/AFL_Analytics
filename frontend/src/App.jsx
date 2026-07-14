import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/teams" element={<Teams />} />

                <Route path="/players" element={<Players />} />

                <Route path="*" element={<NotFound />} />

            </Routes>

            <Footer />
            
        </BrowserRouter>
    );
}

export default App;