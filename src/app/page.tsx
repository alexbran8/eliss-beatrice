import { Mailchimp } from "@/components";
import { baseURL, features, getContent, routes } from "@/resources";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { getLocale } from "next-intl/server";
import {
  AboutIntroSection,
  BlogPreviewSection,
  CollaboratorsSection,
  ContactSection,
  FeaturedProjectsSection,
  HomeHero,
  PaintingsHeroSection,
} from "./_components/home";

export async function generateMetadata() {
  const { home } = getContent(await getLocale());

  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const locale = await getLocale();
  const { home, about, person, work } = getContent(locale);
  const contactLabel = locale === "es" ? "Contacto" : "Contact";
  const contactDescription =
    locale === "es"
      ? "Para consultas sobre obras disponibles, encargos o conversaciones de estudio, puedes escribir directamente."
      : "For available works, commissions, or studio conversations, you can write directly.";

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <HomeHero />
      <PaintingsHeroSection work={work} />
      <AboutIntroSection about={about} showAboutLink={routes["/about"]} />
      {routes["/blog"] && <BlogPreviewSection title="Latest from the blog" />}
      <FeaturedProjectsSection title={work.label} />
      <CollaboratorsSection
        title={home.collaborators.title}
        description={home.collaborators.description}
        logosLabel={home.collaborators.logosLabel}
      />
      {features.contact && (
        <ContactSection label={contactLabel} description={contactDescription} person={person} />
      )}
      <Mailchimp />
    </Column>
  );
}
