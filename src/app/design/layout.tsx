import DesignNavbar from "./components/DesignNavbar";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesignNavbar />
      {children}
    </>
  );
}
