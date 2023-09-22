export default function SolidButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-700 focus:ring-3 focus:outline-none focus:ring-slate-500">
      {children}
    </button>
  );
}
