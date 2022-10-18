import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { HomePage, DetailsPage, ErrorPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="details/:code" element={<DetailsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
