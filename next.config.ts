import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // حالت Strict React فعال میشه تا باگ‌ها راحت‌تر شناسایی بشن
  swcMinify: true, // فعال‌سازی کامپایلر SWC برای build سریع‌تر

  experimental: {
    typedRoutes: true, // مسیرهای تایپ‌شده (Type-safe routes) در نسخه‌های جدید Next
    optimizePackageImports: ["lucide-react", "lodash"], // بهینه‌سازی ایمپورت‌ها
  },
  eslint: {
    ignoreDuringBuilds: false, // اگه true باشه، خطاهای ESLint موقع build نادیده گرفته می‌شن
  },
  typescript: {
    ignoreBuildErrors: false, // اگه true باشه، خطاهای TS موقع build نادیده گرفته می‌شن (بهتره false باشه)
  },
  poweredByHeader: false, // حذف هدر X-Powered-By برای امنیت بیشتر
  trailingSlash: false, // آدرس‌ها با / پایانی یا بدونش
  compress: true, // فشرده‌سازی gzip برای بهبود سرعت
};

export default nextConfig;
