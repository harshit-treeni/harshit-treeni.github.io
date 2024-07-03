import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">Oops!</div>
        <div className="h-[36px]" />
        <div>Sorry, an unexpected error has occurred.</div>
        <div className="h-[24px]" />
        <div>
          <i style={{ color: 'gray' }}>{error.statusText || error.message}</i>
        </div>
      </div>
    </div>
  );
}