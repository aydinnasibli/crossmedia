import { getCategories } from "@/app/actions";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const categories = await getCategories();

  return <HeaderClient categories={categories} />;
}
