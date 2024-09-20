import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import ListingsPage from "./pages/ListingsPage";
import InternalListingPage from "./pages/InternalListingPage";
import AddListingPage from "./pages/AddListingPage";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listing/:id" element={<InternalListingPage />} />
        <Route path="/add-listing" element={<AddListingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
