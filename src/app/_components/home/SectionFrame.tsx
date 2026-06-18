import { Column, Line, Row } from "@once-ui-system/core";

type SectionFrameProps = React.ComponentProps<typeof Column> & {
  children: React.ReactNode;
};

export const SectionFrame = ({ children, ...props }: SectionFrameProps) => (
  <Column fillWidth gap="24" paddingX="l" marginY="l" {...props}>
    <Row fillWidth paddingRight="64">
      <Line maxWidth={48} />
    </Row>
    {children}
    <Row fillWidth paddingLeft="64" horizontal="end">
      <Line maxWidth={48} />
    </Row>
  </Column>
);
