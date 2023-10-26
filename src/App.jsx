import "./Common.css";
import Routes from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CountryProviderContext from "./Contexts/CountryContext/CountryProviderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CountryProviderContext>
          <Routes />
        </CountryProviderContext>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
