import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridesberry.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/cart",
          "/checkout",
          "/payment",
          "/payment/*",
          "/orders",
          "/login",
          "/signup",
          "/signin",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

