import Footer from "components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container-site section-pad py-16 md:py-20">
        <div className="mx-auto max-w-2xl">{children}</div>
      </div>
      <Footer />
    </>
  );
}
