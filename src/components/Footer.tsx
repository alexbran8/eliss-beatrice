"use client";

import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { getContent } from "@/resources";
import { useLocale } from "next-intl";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const locale = useLocale();
  const { localized, person, social } = getContent(locale);
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        direction="column"
        horizontal="center"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          vertical: "center",
        }}
      >
        <Text className={styles.textStack} variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear}</Text>
          <Text>{person.name}</Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            {localized.footer.attribution}{" "}
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Text>
        <Row
          className={styles.iconStack}
          gap="16"
          s={{
            direction: "column",
            horizontal: "center",
            vertical: "center",
          }}
        >
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
