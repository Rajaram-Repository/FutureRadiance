import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  const [appRouter, setAppRouter] = useState(null);

  useEffect(() => {
    const initializeRouter = async () => {
      const generatedRouter = await router();
      setAppRouter(generatedRouter);
    };

    initializeRouter();
  }, []);

  if (!appRouter) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={appRouter} />;
}

export default App;
