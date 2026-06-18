import { Button, Column, Heading, RevealFx, Text } from "@once-ui-system/core";

import type { Work } from "@/types";

import styles from "@/app/page.module.scss";

type PaintingsHeroSectionProps = {
  work: Work;
};

export const PaintingsHeroSection = ({ work }: PaintingsHeroSectionProps) => (
  <RevealFx translateY="16" delay={0.6} fillWidth>
    <Column
      className={styles.paintingsHero}
      fillWidth
      horizontal="center"
      vertical="center"
      padding="xl"
      as="section"
      aria-labelledby="paintings-hero-title"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.58)), url(https://res.cloudinary.com/dwzlgk6oj/image/upload/v1781516472/temp3_ub0shh.jpg)",
      }}
    >
      <Column maxWidth="s" gap="20" horizontal="center" align="center">
        <Heading
          id="paintings-hero-title"
          as="h2"
          variant="display-strong-m"
          align="center"
          wrap="balance"
        >
          {work.title}
        </Heading>
        <Text variant="heading-default-m" align="center" wrap="balance">
          {work.description}
        </Text>
        <Button href={work.path} variant="primary" size="m" arrowIcon aria-label={work.title}>
          {work.label}
        </Button>
      </Column>
    </Column>
  </RevealFx>
);
