import { Welcome } from "../components/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Structures | Binary Search Tree" },
    { name: "description", content: "Binary Search Tree Class" },
  ];
}

export default function BST() {
  return <Welcome />;
}
