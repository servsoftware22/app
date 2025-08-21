import UrbanPage from "../../Urban/page";

export default async function HomePage({ params }) {
  // This will be server-side rendered, no loading states needed
  // The layout passes websiteData via data-website attribute
  return <UrbanPage />;
}
