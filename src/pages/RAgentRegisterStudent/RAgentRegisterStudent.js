import RAgentAuthCheck from "../../components/RAgentAuthCheck";
import RegistrationForm from "./components/RegistrationForm";

function RAgentRegisterStudent() {
  return (
    <div className="p-4">
      <RegistrationForm />
    </div>
  );
}

const WithHOCs = function () {
  return (
    <RAgentAuthCheck>
      <RAgentRegisterStudent />
    </RAgentAuthCheck>
  );
};

export default WithHOCs;
