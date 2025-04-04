import { Navbar } from "@/components/layout";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <Navbar user='jon' />
        {children}
      </div>
  );
}
