export default function Button({ children, ...props }) {
  return (
    <button
      className="min-w-12 min-h-14 mx-1 my-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      {...props}
    >
      {children}
    </button>
  );
}
