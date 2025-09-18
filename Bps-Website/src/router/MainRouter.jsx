import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRouter from "./routes/PublicRouter";

// Public Pages
import Home from "../page/public/Home";
import About from "../page/public/About";
import Career from "../page/public/Career";
import Contact from "../page/public/Contact";
import Employer from "../page/public/Employer";
import Ites from "../page/public/Ites";
import Services from "../page/public/Services";
import ServiceDetails from "../page/public/ServiceDetails";
import Login from "../components/Login";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <PublicRouter />,
    children: [
      { path: "", index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "career", element: <Career /> },
      { path: "contact", element: <Contact /> },
      { path: "employer", element: <Employer /> },
      { path: "ites", element: <Ites /> },
      { path: "login", element: <Login /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServiceDetails /> },
    ],
  },
]);

// Export Router Provider
export default function MainRouter() {
  return <RouterProvider router={routers} />;
}
