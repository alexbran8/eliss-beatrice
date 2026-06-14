import {
  Badge,
  Carousel,
  Column,
  Flex,
  Grid,
  Heading,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import { getLocale } from "next-intl/server";
import {
  formatPaintingDimensions,
  formatPaintingPrice,
  getPaintingAvailabilityNote,
  getPaintingDescription,
  getPaintingTitle,
  paintings,
  getLocalizedMetadata,
} from "@/resources";
import styles from "./Projects.module.scss";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export async function Projects({ range, exclude }: ProjectsProps) {
  const locale = await getLocale();
  const labels = getLocalizedMetadata(locale).paintings;

  let allPaintings = [...paintings].sort((a, b) => b.year - a.year);

  if (exclude && exclude.length > 0) {
    allPaintings = allPaintings.filter((painting) => !exclude.includes(painting.slug));
  }

  const displayedPaintings = range
    ? allPaintings.slice(range[0] - 1, range[1] ?? allPaintings.length)
    : allPaintings;

  return (
    <Grid columns="2" s={{ columns: 1 }} fillWidth gap="32" marginBottom="40" paddingX="l">
      {displayedPaintings.map((painting, index) => {
        const title = getPaintingTitle(painting, locale);
        const price = formatPaintingPrice(painting, locale);

        return (
          <Column
            key={painting.id}
            className={styles.card}
            tabIndex={0}
            radius="m"
            overflow="hidden"
            border="neutral-alpha-weak"
            background="surface"
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
                  {painting.materials.slice(0, 4).map((material) => (
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
            </Column>
          </Column>
        );
      })}
    </Grid>
  );
}
