import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import metadata from "./metadata.json";
import galleryImages from "./gallery.json";
import { defaultLocale, isLocale, Locale } from "@/i18n/locales";
import { getLocalizedMetadata } from "./locales";
import { features } from "./features";

function createContent(locale: string = defaultLocale) {
  const localized = getLocalizedMetadata(locale);

  const person: Person = {
  firstName: metadata.artist.firstName,
  lastName: metadata.artist.lastName,
  name: metadata.artist.name,
  role: metadata.artist.role,
  avatar: metadata.artist.avatar,
  email: metadata.artist.email,
  location: metadata.artist.location as Person["location"], // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: metadata.artist.languages, // optional: Leave the array empty if you don't want to display languages
  };

  const newsletter: Newsletter = {
  display: features.newsletter,
  title: <>{localized.newsletter.title}</>,
  description: <>{localized.newsletter.description}</>,
  };

  const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/once-ui/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  ];

  const home: Home = {
  path: "/",
  image: metadata.site.image,
  label: localized.pages.home.label,
  title: localized.site.title,
  description: localized.site.description,
  headline: <>{localized.pages.home.headline}</>,
  featured: {
    display: metadata.site.featured.display,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">{metadata.site.featured.name}</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          {localized.pages.home.featuredLabel}
        </Text>
      </Row>
    ),
    href: metadata.site.featured.href,
  },
  subline: <>{localized.pages.home.subline}</>,
  };

  const about: About = {
  path: "/about",
  label: localized.pages.about.label,
  title: localized.pages.about.title,
  description: localized.pages.about.description,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: <>{localized.pages.about.intro}</>,
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  };

  const blog: Blog = {
  path: "/blog",
  label: localized.pages.blog.label,
  title: localized.pages.blog.title,
  description: localized.pages.blog.description,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
  };

  const work: Work = {
  path: "/paintings",
  label: localized.pages.work.label,
  title: localized.pages.work.title,
  description: localized.pages.work.description,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /paintings routes
  };

  const gallery: Gallery = {
  path: "/gallery",
  label: localized.pages.gallery.label,
  title: localized.pages.gallery.title,
  description: localized.pages.gallery.description,
  images: galleryImages as Gallery["images"],
  };

  return {
    locale: (isLocale(locale) ? locale : defaultLocale) as Locale,
    localized,
    person,
    social,
    newsletter,
    home,
    about,
    blog,
    work,
    gallery,
  };
}

const { person, social, newsletter, home, about, blog, work, gallery } = createContent();

export { createContent as getContent, getLocalizedMetadata, person, social, newsletter, home, about, blog, work, gallery };
