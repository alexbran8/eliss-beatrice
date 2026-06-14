function isEnabled(value: string | undefined, defaultValue = false) {
  if (value === undefined) return defaultValue;

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export const features = {
  newsletter: isEnabled(process.env.NEXT_PUBLIC_FEATURE_NEWSLETTER, false),
};
