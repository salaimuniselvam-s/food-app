import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Meals from "./pages/Meals";
import Orders from "./pages/Orders";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/*" element={<Homepage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/meals?meal" element={<Meals />} />
            </Routes>
          </main>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
