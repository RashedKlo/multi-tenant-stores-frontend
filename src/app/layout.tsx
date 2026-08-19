import "./globals.css";
import { cookies } from "next/headers";
import {NextIntlClientProvider} from 'next-intl';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme")?.value ?? "light";
  const locale = cookieStore.get("locale")?.value ?? "en";

  const direction = locale === "ar"
    ? "rtl"
    : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={theme === "dark" ? "dark" : ""}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}