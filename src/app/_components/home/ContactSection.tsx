import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

import type { Person } from "@/types";

import { SectionFrame } from "./SectionFrame";

type ContactSectionProps = {
  label: string;
  description: string;
  person: Person;
};

export const ContactSection = ({ label, description, person }: ContactSectionProps) => (
  <SectionFrame id="contact" as="section" aria-labelledby="home-contact-title">
    <Row fillWidth gap="24" s={{ direction: "column" }}>
      <Row flex={1} paddingTop="24">
        <Heading id="home-contact-title" as="h2" variant="display-strong-xs" wrap="balance">
          {label}
        </Heading>
      </Row>
      <Column flex={3} gap="20">
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          {description}
        </Text>
        <Row gap="12" wrap vertical="center">
          <Button
            href={`mailto:${person.email}`}
            variant="secondary"
            size="m"
            arrowIcon
            aria-label={`Email ${person.name}`}
          >
            {person.email}
          </Button>
        </Row>
      </Column>
    </Row>
  </SectionFrame>
);
