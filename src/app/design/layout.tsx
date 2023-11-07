import DesignNavbar from "./components/DesignNavbar";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:pt-[72px] pt-[80px]">
      <DesignNavbar />
      {children}
    </div>
  );
}
