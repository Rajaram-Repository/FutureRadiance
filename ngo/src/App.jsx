import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { router } from "./routes";

function App() {
  const dispatch = useDispatch();
  const [appRouter, setAppRouter] = useState(null);

  useEffect(() => {
    const setupRouter = async () => {
      const generatedRouter = await router(dispatch);
      setAppRouter(generatedRouter);
    };

    setupRouter();
  }, [dispatch]);

  if (!appRouter) {
    return <div>Loading App...</div>;
  }

  return <RouterProvider router={appRouter} />;
}

export default App;
