import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jorge Martinez - Frontend Coding Challenge" },
    {
      name: "description",
      content: "Fun translations challenge landing page.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
