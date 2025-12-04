import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="text-center px-5 md:px-10 flex gap-5 flex-col h-screen justify-center items-center">
      <h2 className="md:text-4xl text-sm"><strong>404 ERROR  |</strong> Page not Found</h2>
      
      <Link
        href="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-sm md:text-lg text-white shadow-indigo-500/50 btn cursor-pointer"
      >
        Return
      </Link>
    </div>
  );
}
