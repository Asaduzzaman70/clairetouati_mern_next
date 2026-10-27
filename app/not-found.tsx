import type { Metadata } from "next";
import Page404 from "@/components/shared/404Page";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Turrim",
  description: "The page you are looking for does not exist. Play the 404 Runner mini-game!",
};

export default function NotFound() {
  return <Page404 />;
}
