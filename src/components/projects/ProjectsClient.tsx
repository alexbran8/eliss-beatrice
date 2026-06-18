"use client";

import {
  Badge,
  Carousel,
  Column,
  Flex,
  Grid,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import { type KeyboardEvent, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import {
  formatPaintingDimensions,
  formatPaintingPrice,
  getPaintingAvailabilityNote,
  getPaintingDescription,
  getPaintingTitle,
} from "@/resources/paintings";
import { Painting } from "@/types/painting.types";
import styles from "./Projects.module.scss";

type PaintingLabels = {
  dimensions: string;
  surface: string;
  materials: string;
  colours: string;
  status: Record<Painting["status"], string>;
};

type ProjectsClientProps = {
  paintings: Painting[];
  labels: PaintingLabels;
  locale: string;
};

function shouldNavigate(event: MouseEvent<HTMLElement>) {
  const target = event.target as HTMLElement;

  return !target.closest("button, a, input, textarea, select");
}

export function ProjectsClient({ paintings, labels, locale }: ProjectsClientProps) {
  const router = useRouter();

  const openPainting = (painting: Painting) => {
    router.push(`/paintings/${painting.slug}`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, painting: Painting) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPainting(painting);
    }
  };

  const renderDetails = (painting: Painting, title: string) => {
    const price = formatPaintingPrice(painting, locale);

    return (
      <Column className={styles.details} gap="16" padding="20">
        <Text variant="body-default-s" wrap="balance">
          {getPaintingDescription(painting, locale)}
        </Text>

        <Grid columns="2" s={{ columns: 1 }} gap="12">
          <Column gap="2">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {labels.dimensions}
            </Text>
            <Text variant="body-default-s">{formatPaintingDimensions(painting)}</Text>
          </Column>
          <Column gap="2">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {labels.surface}
            </Text>
            <Text variant="body-default-s">{painting.surface}</Text>
          </Column>
        </Grid>

        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            {labels.materials}
          </Text>
          <Row wrap gap="8">
            {painting.materials.map((material) => (
              <Tag key={material} size="s">
                {material}
              </Tag>
            ))}
          </Row>
        </Column>

        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            {labels.colours}
          </Text>
          <Row wrap gap="12">
            {painting.dominantColours.map((colour) => (
              <span
                key={colour.hex}
                aria-label={colour.name}
                title={colour.name}
                className={styles.swatch}
                style={{ background: colour.hex }}
              />
            ))}
          </Row>
        </Column>

        <Flex fillWidth gap="12" horizontal="between" vertical="end">
          <Text variant="body-default-s" onBackground="neutral-weak">
            {getPaintingAvailabilityNote(painting, locale)}
          </Text>
          {price && <Text variant="heading-strong-s">{price}</Text>}
        </Flex>

        <Text variant="label-default-s" onBackground="neutral-weak">
          {painting.series} / {painting.year} / {labels.status[painting.status]}
        </Text>
      </Column>
    );
  };

  return (
    <>
      <Grid columns="2" s={{ columns: 1 }} fillWidth gap="32" marginBottom="40" paddingX="l">
        {paintings.map((painting, index) => {
          const title = getPaintingTitle(painting, locale);

          return (
            <Column
              key={painting.id}
              className={styles.card}
              tabIndex={0}
              role="button"
              aria-label={`Open details for ${title}`}
              radius="m"
              overflow="hidden"
              border="neutral-alpha-weak"
              background="surface"
              onClick={(event) => {
                if (shouldNavigate(event)) {
                  openPainting(painting);
                }
              }}
              onKeyDown={(event) => handleCardKeyDown(event, painting)}
            >
              <Carousel
                className={styles.image}
                items={painting.images.map((image) => ({
                  slide: image,
                  alt: title,
                }))}
                priority={index < 2}
                sizes="(max-width: 960px) 100vw, 960px"
              />

              <Column className={styles.titleBar} gap="4" padding="16">
                <Flex fillWidth gap="12" horizontal="between" vertical="start">
                  <Column gap="4">
                    <Heading as="h2" variant="heading-strong-l" wrap="balance">
                      {title}
                    </Heading>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {painting.series} / {painting.year}
                    </Text>
                  </Column>
                  <Badge background="surface">{labels.status[painting.status]}</Badge>
                </Flex>
              </Column>

              {renderDetails(painting, title)}

              <Flex paddingX="20" paddingBottom="20">
                <SmartLink href={`/paintings/${painting.slug}`} suffixIcon="arrowRight">
                  <Text variant="body-default-s">View painting</Text>
                </SmartLink>
              </Flex>
            </Column>
          );
        })}
      </Grid>
    </>
  );
}
