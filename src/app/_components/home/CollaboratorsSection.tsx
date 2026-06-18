import { Column, Heading, Row, Text } from "@once-ui-system/core";

import styles from "./CollaboratorsSection.module.scss";
import { SectionFrame } from "./SectionFrame";

type Collaborator = {
  name: string;
  initials: string;
  logo?: string;
};

const collaborators: Collaborator[] = [
  {
    name: "Studio Partner",
    initials: "SP",
  },
  {
    name: "Gallery Partner",
    initials: "GP",
  },
  {
    name: "Creative Residency",
    initials: "CR",
  },
  {
    name: "Art Collective",
    initials: "AC",
  },
];

export const CollaboratorsSection = () => (
  <SectionFrame as="section" aria-labelledby="home-collaborators-title">
    <Row fillWidth gap="24" s={{ direction: "column" }}>
      <Row flex={1} paddingTop="24">
        <Heading id="home-collaborators-title" as="h2" variant="display-strong-xs" wrap="balance">
          Collaborators
        </Heading>
      </Row>
      <Column flex={3} gap="20">
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          Creative partners, studios, and institutions connected to the work.
        </Text>
        <ul className={styles.grid} aria-label="Collaborator logos">
          {collaborators.map((collaborator) => (
            <li className={styles.item} key={collaborator.name}>
              <div className={styles.logo}>
                {collaborator.logo ? (
                  <img src={collaborator.logo} alt={`${collaborator.name} logo`} loading="lazy" />
                ) : (
                  <span className={styles.placeholder} aria-hidden="true">
                    {collaborator.initials}
                  </span>
                )}
              </div>
              <Text as="span" variant="label-default-s" align="center">
                {collaborator.name}
              </Text>
            </li>
          ))}
        </ul>
      </Column>
    </Row>
  </SectionFrame>
);
