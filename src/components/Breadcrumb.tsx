"use client";

import { HEADER } from "@/utils/constants";
import { BreadcrumbItem } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ name: "Home", href: "/", isLast: false }];

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Convert segment to readable name
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Handle specific routes
      switch (segment) {
        case HEADER.ALL_DATA:
          name = "All Data";
          break;
        case HEADER.SECTORS:
          name = "Sectors";
          break;
        case HEADER.USE_CASES:
          name = "Use Cases";
          break;
        case HEADER.PUBLISHERS:
          name = "Publishers";
          break;
        case HEADER.ABOUT_US:
          name = "About Us";
          break;
        default:
          if (segment === "") name = "All Data";
          break;
      }

      breadcrumbs.push({
        name,
        href: currentPath,
        isLast: index === segments.length - 1,
      });
    });

    // Default to "All Data" if we're on the home page
    if (pathname === "/") {
      breadcrumbs.push({ name: "All Data", href: "/", isLast: true });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  console.log(breadcrumbs);

  return (
    <div className="bg-[#fdb557] py-2 px-4 md:px-8">
      <nav className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <span className="text-gray-500 mx-2">›</span>}
            {crumb.isLast ? (
              <span className="text-gray-900 font-bold">{crumb.name}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-700 font-normal hover:text-gray-900 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
