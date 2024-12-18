import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <i>{error.statusText || error.message}</i>
    </div>
  );
}

export default ErrorPage;
