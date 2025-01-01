import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing";


export default createMiddleware(routing)

export const config = {
  matcher: [
    "/","/(ar|en)/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
