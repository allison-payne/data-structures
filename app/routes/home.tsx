import { Welcome } from "../components/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Structures | Home" },
    { name: "description", content: "Welcome to Data Structures" },
  ];
}

export default function Home() {
  return <Welcome />;
}
