import { Column, Heading, Row } from "@once-ui-system/core";

import { Posts } from "@/components/blog/Posts";

import { SectionFrame } from "./SectionFrame";

type BlogPreviewSectionProps = {
  title: string;
};

export const BlogPreviewSection = ({ title }: BlogPreviewSectionProps) => (
  <SectionFrame as="section" marginBottom="l" aria-labelledby="home-blog-title">
    <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
      <Row flex={1} paddingLeft="l" paddingTop="24">
        <Heading id="home-blog-title" as="h2" variant="display-strong-xs" wrap="balance">
          {title}
        </Heading>
      </Row>
      <Row flex={3} paddingX="20">
        <Posts range={[1, 2]} columns="2" />
      </Row>
    </Row>
  </SectionFrame>
);
