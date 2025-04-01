import { RouterProvider } from "react-router";
import router from "./routes";

const App = () => {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
