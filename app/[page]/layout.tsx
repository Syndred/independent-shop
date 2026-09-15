import Footer from "components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container-site section-pad py-12 md:py-16">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
      <Footer />
    </>
  );
}
