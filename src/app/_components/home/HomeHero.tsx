import { Avatar, Badge, Button, Column, Heading, RevealFx, Row, Text } from "@once-ui-system/core";

import type { About, Home, Person } from "@/types";

type HomeHeroProps = {
  home: Home;
  about: About;
  person: Person;
  showAboutLink: boolean;
};

export const HomeHero = ({ home, about, person, showAboutLink }: HomeHeroProps) => (
  <Column fillWidth horizontal="center" gap="m" as="section">
    <Column maxWidth="s" horizontal="center" align="center">
      {home.featured.display && (
        <RevealFx fillWidth horizontal="center" paddingTop="16" paddingBottom="32" paddingLeft="12">
          <Badge
            background="brand-alpha-weak"
            paddingX="12"
            paddingY="4"
            onBackground="neutral-strong"
            textVariant="label-default-s"
            arrow={false}
            href={home.featured.href}
            aria-label={home.featured.ariaLabel}
          >
            <Row paddingY="2">{home.featured.title}</Row>
          </Badge>
        </RevealFx>
      )}
      <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
        <Heading as="h1" wrap="balance" variant="display-strong-l">
          {home.headline}
        </Heading>
      </RevealFx>
      <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
        <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
          {home.subline}
        </Text>
      </RevealFx>
      {showAboutLink && (
        <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            weight="default"
            arrowIcon
            aria-label={`Read ${about.title}`}
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
              {about.label}
            </Row>
          </Button>
        </RevealFx>
      )}
    </Column>
  </Column>
);
