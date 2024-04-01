import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  // Split the pathname into segments and filter out empty segments (e.g., leading slash)
  const pathSegments = pathname.split("/").filter(Boolean);

  // Generate the breadcrumb paths dynamically
  const breadcrumbPaths = pathSegments.map((segment, index) => {
    // Reconstruct the path up to this segment
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { name: segment, path };
  });

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {/* Always have a home/dashboard link as the first breadcrumb */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* Dynamically generate the rest of the breadcrumbs */}
        {breadcrumbPaths.map((breadcrumb, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />
            {index === breadcrumbPaths.length - 1 ? (
              // Last item, use BreadcrumbPage
              <BreadcrumbItem>
                <BreadcrumbPage>{_.capitalize(breadcrumb.name)}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              // Not the last item, use BreadcrumbLink
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
