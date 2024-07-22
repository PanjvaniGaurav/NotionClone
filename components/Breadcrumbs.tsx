"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

const Breadcrumbs = () => {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);
  const [documentTitle, setDocumentTitle] = useState("");

  const isHomePage = segments.length === 0;

  const [data] = useDocumentData(
    segments.length > 0 ? doc(db, "documents", segments[segments.length - 1]) : null
  );

  useEffect(() => {
    if (data && data.title) {
      setDocumentTitle(data.title);
    }
  }, [data]);

  if (isHomePage) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          let href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          if (segment === "doc"){
            href = "/"
          }
          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{documentTitle || segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;