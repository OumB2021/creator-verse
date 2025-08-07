import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreatorsProvider } from "./context/CreatorsContext";
import Layout from "./components/Layout/Layout";
import ShowCreators from "./pages/show-creators";
import AddCreator from "./pages/add-creator";
import ViewCreator from "./pages/view-creator";
import EditCreator from "./pages/edit-creator";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

function App() {
  return (
    <CreatorsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="creators" element={<ShowCreators />} />
            <Route path="creators/:id" element={<ViewCreator />} />
            <Route path="creators/:id/edit" element={<EditCreator />} />
            <Route path="add-creator" element={<AddCreator />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </CreatorsProvider>
  );
}

export default App;
