import { Button, Column, Heading, RevealFx, Row, Text } from "@once-ui-system/core";

import type { About } from "@/types";

import { SectionFrame } from "./SectionFrame";

type AboutIntroSectionProps = {
  about: About;
  showAboutLink: boolean;
};

export const AboutIntroSection = ({ about, showAboutLink }: AboutIntroSectionProps) => (
  <RevealFx translateY="16" delay={0.7}>
    <SectionFrame as="section" aria-labelledby="home-about-title">
      <Row fillWidth gap="24" s={{ direction: "column" }}>
        <Row flex={1} paddingTop="24">
          <Heading id="home-about-title" as="h2" variant="display-strong-xs" wrap="balance">
            {about.label}
          </Heading>
        </Row>
        <Column flex={3} gap="16">
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {about.intro.description}
          </Text>
          {showAboutLink && (
            <Button
              href={about.path}
              variant="secondary"
              size="m"
              arrowIcon
              aria-label={about.title}
            >
              {about.label}
            </Button>
          )}
        </Column>
      </Row>
    </SectionFrame>
  </RevealFx>
);
