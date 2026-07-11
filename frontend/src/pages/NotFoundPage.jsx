import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex items-center flex-col gap-3">
      <h1 className="text-[#404244] text-2xl">
        <span className="text-red-500">Error: 404</span> Not Found Page!
      </h1>
      <p className="text-[#404244]">
        Go back{' '}
        <Link to="/" className="underline">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
export default NotFoundPage;
