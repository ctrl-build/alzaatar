"use client";

import { useParams } from "next/navigation";
import MeniuPage from "../page";

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "meniu-mezza-rece": "mezza-rece",
  "meniu-mezza-calda": "mezza-calda",
  "meniu-preparate-la-cuptor": "preparate-cuptor",
  "meniu-supe": "supe",
  "meniu-salate": "salate",
  "meniu-preparate-la-jar": "preparate-jar",
  "meniu-peste": "peste",
  "meniu-garnituri-si-sosuri": "garnituri",
  "meniu-desert": "desert",
  "mezza-rece": "mezza-rece",
  "mezza-calda": "mezza-calda",
  "preparate-cuptor": "preparate-cuptor",
  "salate": "salate",
  "preparate-jar": "preparate-jar",
  "peste": "peste",
  "garnituri": "garnituri",
  "desert": "desert",
};

export default function CategoryClient() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryId = CATEGORY_SLUG_MAP[categorySlug] || null;

  if (!categoryId) {
    return <MeniuPage />;
  }

  return <MeniuPage preSelectedCategory={categoryId} />;
}

