import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
}

/**
 * Sets the document title and meta description for a page/component.
 */
export function usePageMeta({ title, description }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector(
      "meta[name='description']"
    ) as HTMLMetaElement | null;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, [title, description]);
}
