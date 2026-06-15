import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Badge,
  Column,
  Flex,
  Grid,
  Heading,
  IconButton,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
  Tag,
} from "@once-ui-system/core";
import {
  baseURL,
  formatPaintingDimensions,
  formatPaintingPrice,
  getContent,
  getLocalizedMetadata,
  getPaintingAvailabilityNote,
  getPaintingDescription,
  getPaintingTitle,
  paintings,
} from "@/resources";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { getLocale } from "next-intl/server";
import styles from "./page.module.scss";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "paintings", "projects"]);
  return [
    ...paintings.map((painting) => ({
      slug: painting.slug,
    })),
    ...posts.map((post) => ({
      slug: post.slug,
    })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const locale = await getLocale();
  const { work } = getContent(locale);
  const painting = paintings.find((painting) => painting.slug === slugPath);

  if (painting) {
    const title = getPaintingTitle(painting, locale);
    const description = getPaintingDescription(painting, locale);

    return Meta.generate({
      title: `${title} - Eliss Beatrice`,
      description,
      baseURL: baseURL,
      image: painting.images[0] || `/api/og/generate?title=${encodeURIComponent(title)}`,
      path: `${work.path}/${painting.slug}`,
    });
  }

  const posts = getPosts(["src", "app", "paintings", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const locale = await getLocale();
  const { about, work, person } = getContent(locale);
  const labels = getLocalizedMetadata(locale).paintings;

  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const painting = paintings.find((painting) => painting.slug === slugPath);

  if (painting) {
    const title = getPaintingTitle(painting, locale);
    const description = getPaintingDescription(painting, locale);
    const price = formatPaintingPrice(painting, locale);

    return (
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={`${work.path}/${painting.slug}`}
          title={title}
          description={description}
          image={painting.images[0] || `/api/og/generate?title=${encodeURIComponent(title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        <Column className={styles.paintingHeader} maxWidth="s" gap="16" horizontal="center" align="center">
          <Row gap="12" vertical="center" horizontal="center">
            <IconButton
              href="/paintings"
              icon="chevronLeft"
              tooltip={work.label}
              variant="secondary"
              aria-label={work.label}
            />
            <Heading variant="display-strong-m" align="center">
              {title}
            </Heading>
          </Row>
          <Badge background="surface">{labels.status[painting.status]}</Badge>
        </Column>

        <Flex className={styles.paintingPageContent} fillWidth gap="32" vertical="start" s={{ direction: "column" }}>
          <Column className={styles.paintingPageImages} flex={7} gap="16">
            {painting.images.map((image, index) => (
              <img key={image} src={image} alt={`${title} ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
            ))}
          </Column>

          <Column className={styles.paintingPageDetails} flex={5} gap="20">
            <Text variant="body-default-m" wrap="balance">
              {description}
            </Text>

            <Grid columns="2" s={{ columns: 1 }} gap="16">
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {labels.dimensions}
                </Text>
                <Text variant="body-default-s">{formatPaintingDimensions(painting)}</Text>
              </Column>
              <Column gap="4">
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

            <Column gap="8">
              <Text variant="body-default-s" onBackground="neutral-weak">
                {getPaintingAvailabilityNote(painting, locale)}
              </Text>
              {price && <Text variant="heading-strong-s">{price}</Text>}
            </Column>
          </Column>
        </Flex>

        <Column fillWidth gap="40" horizontal="center" marginTop="40">
          <Line maxWidth="40" />
          <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
            Related paintings
          </Heading>
          <Projects exclude={[painting.slug]} range={[1, 2]} />
        </Column>
      </Column>
    );
  }

  let post = getPosts(["src", "app", "paintings", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column className={styles.paintingHeader} maxWidth="s" gap="16" horizontal="center" align="center">
        <Row gap="12" vertical="center" horizontal="center">
          <IconButton
            href="/paintings"
            icon="chevronLeft"
            tooltip={work.label}
            variant="secondary"
            aria-label={work.label}
          />
          <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        </Row>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
