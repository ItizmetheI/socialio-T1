import { useEffect } from "react";

const SITE_URL = "https://socialio.io";
const SITE_NAME = "Socialio";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

interface SEOOptions {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

// ponytail: SPA client-side head management. Googlebot renders JS and reads
// this, so it's real for search indexing -- but static crawlers (Facebook,
// Twitter/X, LinkedIn preview bots) never run JS, so social share previews
// always fall back to the tags baked into index.html. Fixing that needs
// prerendering/SSR, out of scope here.
export function useSEO({ title, description, path, noindex = false }: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
  }, [title, description, path, noindex]);
}
