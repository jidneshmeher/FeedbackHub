import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";
import ShowNavBar from "./ShowNavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <ShowNavBar>
          <NavBar />
        </ShowNavBar>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
