import { RouterProvider } from "react-router";
import router from "./routes";
import { ApiProvider } from "./context/ApiContext";
import { createApiService } from "./services/api";


const apiService = createApiService(import.meta.env.VITE_API_BASE_URL);

const App = () => {
  return (
    <div className="">
      <ApiProvider api={apiService}>
        <RouterProvider router={router} />
      </ApiProvider>
    </div>
  );
};

export default App;