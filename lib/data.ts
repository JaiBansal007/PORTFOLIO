import type { PortfolioData } from "@/types/portfolio";
import data from "@/data/portfolio.json";

export function getPortfolioData(): PortfolioData {
  return data as PortfolioData;
}
