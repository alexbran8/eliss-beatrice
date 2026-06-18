import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { baseURL, routes, features, getContent } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/projects/Projects";
import { Posts } from "@/components/blog/Posts";
import { getLocale } from "next-intl/server";
import styles from "./page.module.scss";

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
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          {routes["/about"] && (
            <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Row>
              </Button>
            </RevealFx>
          )}
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column
          className={styles.paintingsHero}
          fillWidth
          horizontal="center"
          vertical="center"
          padding="xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.58)), url(https://res.cloudinary.com/dwzlgk6oj/image/upload/v1781516472/temp3_ub0shh.jpg)",
          }}
        >
          <Column maxWidth="s" gap="20" horizontal="center" align="center">
            <Heading as="h2" variant="display-strong-m" align="center" wrap="balance">
              {work.title}
            </Heading>
            <Text variant="heading-default-m" align="center" wrap="balance">
              {work.description}
            </Text>
            <Button href={work.path} variant="primary" size="m" arrowIcon>
              {work.label}
            </Button>
          </Column>
        </Column>
      </RevealFx>
      <RevealFx translateY="16" delay={0.7}>
        <Column fillWidth gap="24" paddingX="l" marginY="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" s={{ direction: "column" }}>
            <Row flex={1} paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {about.label}
              </Heading>
            </Row>
            <Column flex={3} gap="16">
              <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
                {about.intro.description}
              </Text>
              {routes["/about"] && (
                <Button href={about.path} variant="secondary" size="m" arrowIcon>
                  {about.label}
                </Button>
              )}
            </Column>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Column fillWidth gap="24" horizontal="center">
        <Heading as="h2" variant="heading-strong-xl" align="center">
          {work.label}
        </Heading>
        <Projects range={[2, 3]} />

      </Column>
      {features.contact && (
        <Column id="contact" fillWidth gap="24" paddingX="l" marginY="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" s={{ direction: "column" }}>
            <Row flex={1} paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {contactLabel}
              </Heading>
            </Row>
            <Column flex={3} gap="20">
              <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
                {contactDescription}
              </Text>
              <Row gap="12" wrap vertical="center">
                <Button href={`mailto:${person.email}`} variant="secondary" size="m" arrowIcon>
                  {person.email}
                </Button>
              </Row>
            </Column>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Mailchimp />
    </Column>
  );
}
