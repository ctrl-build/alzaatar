import CategoryClient from "./CategoryClient";

const CATEGORY_SLUGS = [
  "meniu-mezza-rece",
  "meniu-mezza-calda",
  "meniu-preparate-la-cuptor",
  "meniu-supe",
  "meniu-salate",
  "meniu-preparate-la-jar",
  "meniu-peste",
  "meniu-garnituri-si-sosuri",
  "meniu-desert",
  "mezza-rece",
  "mezza-calda",
  "preparate-cuptor",
  "salate",
  "preparate-jar",
  "peste",
  "garnituri",
  "desert",
];

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({
    category: slug,
  }));
}

export default function CategoryMeniuPage() {
  return <CategoryClient />;
}
