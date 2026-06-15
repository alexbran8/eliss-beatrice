function isEnabled(value: string | undefined, defaultValue = false) {
  if (value === undefined) return defaultValue;

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export const features = {
  blog: isEnabled(process.env.NEXT_PUBLIC_FEATURE_BLOG, false),
  newsletter: isEnabled(process.env.NEXT_PUBLIC_FEATURE_NEWSLETTER, false),
};
