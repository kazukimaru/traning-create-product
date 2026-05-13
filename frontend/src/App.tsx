import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  return (
    <Router>
      <div className="antialiased bg-background min-h-screen flex flex-col">
        <Header />
        <main className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
