export default function Cell({ children, borderColor }) {
  const colorMap = {
    red: "border-red-500",
    grey: "border-grey-500",
    green: "border-green-500",
  };
  let border = borderColor ? `border-2 border-solid ${colorMap[borderColor]}` : "";

  return (
    <div
      className={`w-1/12 min-h-16 mx-1 my-1 bg-gray-100 hover:bg-gray-200 text-gray-900 ${border} font-bold py-2 px-4 rounded flex items-center justify-center`}
    >
      <p>{children}</p>
    </div>
  );
}
