
import { MenuItem } from "@/types/types";

export function getUniqueCategories(items: MenuItem[]): string[] {
  const seen = new Set<string>();
  return items.reduce<string[]>((acc, item) => {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      acc.push(item.category);
    }
    return acc;
  }, []);
}
