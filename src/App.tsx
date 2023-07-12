import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Meals from "./pages/Meals";
import Orders from "./pages/Orders";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // redirect to homepage if not on homepage on initial render
    if (location.pathname !== "/") navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen max-w-1600 mx-auto min-h-screen flex flex-col bg-primary">
        <Header />
        <main className="mt-14  md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/meals/:meal" element={<Meals />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
