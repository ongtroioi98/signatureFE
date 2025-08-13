import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "vi"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  const messages = {
    ...(await import(`./messages/${locale}/login.json`)).default,
    ...(await import(`./messages/${locale}/footer.json`)).default,
    ...(await import(`./messages/${locale}/home.json`)).default,
    ...(await import(`./messages/${locale}/menu.json`)).default,
    ...(await import(`./messages/${locale}/action.json`)).default,
    ...(await import(`./messages/${locale}/column.json`)).default,
  };
  return { messages };
});
