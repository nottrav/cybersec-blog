// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Travis McGhee";
export const SITE_DESCRIPTION =
  "IT Graduate exploring Cybersecurity. I write about digital privacy, online safety, and the ever-evolving tech landscape.";
export const TWITTER_HANDLE = "@travismcghee";
export const MY_NAME = "Travis McGhee";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
