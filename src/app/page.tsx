import { Mailchimp } from "@/components";
import { baseURL, features, getContent, routes } from "@/resources";
import { Column, Heading, Meta, Text } from "@once-ui-system/core";
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

  const metadata = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `${baseURL}${home.path}`,
    },
  };
}

function ArtistSchema({
  title,
  description,
  name,
  image,
}: {
  title: string;
  description: string;
  name: string;
  image: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseURL}/#website`,
        url: baseURL,
        name: title,
        description,
        inLanguage: ["en", "es"],
        publisher: { "@id": `${baseURL}/#artist` },
      },
      {
        "@type": "Person",
        "@id": `${baseURL}/#artist`,
        name,
        url: baseURL,
        image: `${baseURL}${image}`,
        jobTitle: "Contemporary artist",
        knowsLanguage: ["English", "Spanish"],
      },
      {
        "@type": "WebPage",
        "@id": `${baseURL}/#webpage`,
        url: baseURL,
        name: title,
        description,
        isPartOf: { "@id": `${baseURL}/#website` },
        about: { "@id": `${baseURL}/#artist` },
        primaryImageOfPage: `${baseURL}/images/og/home.jpg`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from trusted site configuration and escaped above.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Home() {
  const locale = await getLocale();
  const { home, about, person, work, localized } = getContent(locale);

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <ArtistSchema
        title={home.title}
        description={home.description}
        name={person.name}
        image={person.avatar}
      />
      <HomeHero />
      <Column as="header" fillWidth maxWidth="s" gap="16" horizontal="center" align="center">
        <Heading as="h1" variant="display-strong-l" align="center" wrap="balance">
          {home.headline}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance">
          {home.subline}
        </Text>
      </Column>
      <PaintingsHeroSection work={work} />
      <AboutIntroSection about={about} showAboutLink={routes["/about"]} />
      {routes["/blog"] && <BlogPreviewSection title={localized.pages.home.blogPreviewTitle} />}
      <FeaturedProjectsSection title={work.label} />
      {features.collaborators && (
        <CollaboratorsSection
          title={home.collaborators.title}
          description={home.collaborators.description}
          logosLabel={home.collaborators.logosLabel}
        />
      )}
      {features.contact && (
        <ContactSection
          label={localized.pages.home.contactLabel}
          description={localized.pages.home.contactDescription}
          person={person}
        />
      )}
      <Mailchimp />
    </Column>
  );
}
