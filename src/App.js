import { useRoutes } from "react-router-dom";
import routeConfig from "./routes";

function App() {
  const routes = useRoutes(routeConfig);
  return <>
    {routes}
  </>;
}

export default App;
