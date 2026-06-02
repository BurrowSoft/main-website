import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  let locale = "en";
  if (cookieLocale === "en" || cookieLocale === "th") {
    locale = cookieLocale;
  } else {
    const headersList = await headers();
    const country =
      headersList.get("x-vercel-ip-country") ??
      headersList.get("cf-ipcountry") ??
      "";
    if (country === "TH") locale = "th";
  }

  const messages =
    locale === "th"
      ? (await import("./messages/th.json")).default
      : (await import("./messages/en.json")).default;

  return { locale, messages };
});
