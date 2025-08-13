import LoginForm from "./loginForm";
import { PageProps } from "@/types/page";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}
export default async function LoginPage({ params: { locale } }: PageProps) {
  return <LoginForm />;
}
