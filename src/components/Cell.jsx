export default function Cell({ children, borderColor }) {
  let border = borderColor ? `border-2 border-solid border-${borderColor}-500` : "";
  return (
    <div
      className={`w-1/12 min-h-16 mx-1 my-1 bg-gray-100 hover:bg-gray-200 text-gray-900 ${border} font-bold py-2 px-4 rounded inline-flex items-center`}
    >
      {children}
    </div>
  );
}
