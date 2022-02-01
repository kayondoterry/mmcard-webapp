import ComingSoon from "./pages/ComingSoon/ComingSoon";
import Dev from "./pages/Dev/Dev";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import RAgentApp from "./pages/RAgentApp/RAgentApp";
import RAgentHome from "./pages/RAgentHome/RAgentHome";
import RAgentLogin from "./pages/RAgentLogin/RAgentLogin";
import RAgentRegisterStudent from "./pages/RAgentRegisterStudent/RAgentRegisterStudent";
import SendMoney from "./pages/SendMoney/SendMoney";
import SendMoneyHistory from "./pages/SendMoneyHistory/SendMoneyHistory";
import CardReaderModal from "./terminal/components/CardReaderModal/CardReaderModal";

const routeConfig = [
  // {path: "", element: 0}
  { path: "/", element: <Home /> },
  // {path:"/", element:<CardReaderModal />},
  {
    path: "/r-agent",
    element: <RAgentApp />,
    children: [
      { element: <RAgentHome />, index: true },
      { path: "login", element: <RAgentLogin /> },
      { path: "register-student", element: <RAgentRegisterStudent /> },
    ],
  },
  { path: "/mm-agent", element: <ComingSoon /> },
  { path: "/mm-agent/login", element: <ComingSoon /> },
  { path: "/send", element: <SendMoney /> },
  { path: "/send/history", element: <SendMoneyHistory /> },
  // { path: "/send/history/:telephone", element: <SendHistoryItem /> },
  { path: "/dev", element: <Dev /> },
  { path: "*", element: <NotFound /> },
];

export default routeConfig;
