import { baseURL, paintings, routes as routesConfig } from "@/resources";
import { getPosts } from "@/utils/utils";

export default async function sitemap() {
  const blogs = routesConfig["/blog"]
    ? getPosts(["src", "app", "blog", "posts"]).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
      }))
    : [];

  const works = getPosts(["src", "app", "paintings", "projects"]).map((post) => ({
    url: `${baseURL}/paintings/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const paintingRoutes = paintings.map((painting) => ({
    url: `${baseURL}/paintings/${painting.slug}`,
    lastModified: `${painting.year}-01-01`,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
  }));

  return [...routes, ...blogs, ...works, ...paintingRoutes];
}
