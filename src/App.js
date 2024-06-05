import Header from "./components/Header";
import Ticket from "./components/Ticket";
import Footer from "./components/Footer";
import Prize from "./components/Prize";
import Data from "./components/Data";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto py-4 w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Ticket/>} />
        <Route path="/data" element={<Data/>} />
        <Route path="/prize" element={<Prize/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
