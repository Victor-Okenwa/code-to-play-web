import { Footer } from "@/components/footer";
import { StaticHeader } from "@/components/navigations/static/header";

export default function StaticLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <StaticHeader />
      {children}
      <Footer />
    </>
  );
}
