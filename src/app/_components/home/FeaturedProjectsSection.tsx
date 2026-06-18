import { Column, Heading } from "@once-ui-system/core";

import { Projects } from "@/components/projects/Projects";

type FeaturedProjectsSectionProps = {
  title: string;
};

export const FeaturedProjectsSection = ({ title }: FeaturedProjectsSectionProps) => (
  <Column fillWidth gap="24" horizontal="center" as="section" aria-labelledby="home-projects-title">
    <Heading id="home-projects-title" as="h2" variant="heading-strong-xl" align="center">
      {title}
    </Heading>
    <Projects range={[2, 3]} />
  </Column>
);
