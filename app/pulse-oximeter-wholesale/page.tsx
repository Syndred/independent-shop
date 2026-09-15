import { ContentPage } from "components/b2b/content-page";
import Footer from "components/layout/footer";
import { pages } from "lib/data/pages";
import { baseUrl } from "lib/utils";
const page = pages.find((p) => p.handle === "pulse-oximeter-wholesale")!;
export const metadata = {
  title: page.title,
  description: page.bodySummary,
  alternates: { canonical: `${baseUrl}/pulse-oximeter-wholesale` },
};
export default function WholesalePage() {
  return (
    <>
      <div className="container-site section-pad py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ContentPage page={page} />
        </div>
      </div>
      <Footer />
    </>
  );
}
