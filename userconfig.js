// User configuration for the startpage - update the palette, location, and your preferred tabs, categories, and links

// Define preferred palette for light and dark mode
// Available themes: latte, frappe, mocha, macchiato
const preferredLightTheme = macchiato;
const preferredDarkTheme = macchiato;

let palette = initThemeSystem(preferredLightTheme, preferredDarkTheme);

const default_configuration = {
  overrideStorage: true,
  temperature: {
    location: "Berlin",
    scale: "C",
  },
  clock: {
    format: "k:i p",
    icon_color: palette.mauve,
  },
  additionalClocks: [
    {
      label: "DE",
      timezone: "Europe/Berlin",
      format: "h:i",
      icon_color: palette.peach,
    },
  ],
  search: {
    engines: {
      p: ["https://www.perplexity.ai/search/?q=", "PerplexityAI"],
      d: ["https://duckduckgo.com/?q=", "DuckDuckGo"],
      e: ["https://ecosia.com/search?q=", "Ecosia"],
    },
    default: "e",
  },
  keybindings: {
    "s": "search-bar",
  },
  disabled: [],
  localIcons: true,
  localFonts: true,
  fastlink: "https://chatgpt.com",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "dev ++",
      background_url: "src/img/banners/banner_20.gif",
      categories: [
        {
          name: "development",
          links: [
            {
              name: "Github",
              url: "https://github.com",
              icon: "brand-github",
              icon_color: palette.green,
            },
            {
              name: "Code Berg",
              url: "https://codeberg.org",
              icon: "mountain",
              icon_color: palette.blue,
            },
            {
              name: "Nerd Icons",
              url: "https://nerdfonts.com/cheat-sheet",
              icon: "eyeglass",
              icon_color: palette.peach,
            },
            {
              name: "Tabler Icons",
              url: "https://tabler.com/icons",
              icon: "pencil",
              icon_color: palette.green,
            },
          ],
        },
        {
          name: "workspace",
          links: [
            {
              name: "proton mail",
              url: "https://protonmail.com/",
              icon: "mail",
              icon_color: palette.mauve,
            },
            {
              name: "ChatGPT",
              url: "https://chatgpt.com",
              icon: "brand-openai",
              icon_color: palette.blue,
            },
            {
              name: "Todoist",
              url: "https://app.todoist.com/app/today",
              icon: "checkbox",
              icon_color: palette.red,
              openInNewTab: false,
            },
            {
              name: "Trello",
              url: "https://trello.com/",
              icon: "brand-trello",
              icon_color: palette.blue,
            },
            {
              name: "Ideas",
              url: "https://lilyneinhorn.atlassian.net/jira/software/projects/IDEA/boards/2",
              icon: "bulb",
              icon_color: palette.yellow,
            },
            {
              name: "Bara Labs",
              url: "https://lilyneinhorn.atlassian.net/jira/software/projects/BARA/boards/71",
              icon: "bulb",
              icon_color: palette.yellow,
            },
            {
              name: "calendar",
              url: "https://calendar.google.com",
              icon: "calendar-filled",
              icon_color: palette.blue,
            },
            {
              name: "sheets",
              url: "https://docs.google.com/spreadsheets",
              icon: "table",
              icon_color: palette.green,
            },
            {
              name: "drive",
              url: "https://drive.google.com/drive/home",
              icon: "brand-google-drive",
              icon_color: palette.yellow,
            },
          ],
        },
        {
          name: "challenges",
          links: [
            {
              name: "strikk",
              url: "https://strikk.dev/",
              icon: "prompt",
              icon_color: palette.red,
            },
            {
              name: "advent of code",
              url: "https://adventofcode.com",
              icon: "christmas-tree",
              icon_color: palette.blue,
            },
          ],
        },
      ],
    },
    {
      name: "L I L Y",
      background_url: "src/img/banners/banner_08.gif",
      categories: [
        {
          name: "Socials",
          links: [
            {
              name: "instagram",
              url: "https://www.instagram.com/direct/inbox",
              icon: "brand-instagram",
              icon_color: palette.mauve,
              openInNewTab: false,
            },
            {
              name: "youtube",
              url: "https://www.youtube.com",
              icon: "brand-youtube",
              icon_color: palette.red,
            },
            {
              name: "Enrico Tartarotti",
              url: "https://www.youtube.com/@enricotartarotti/videos",
              icon: "brand-youtube",
              icon_color: palette.red,
            },
          ],
        },
        {
          name: "reddit",
          links: [
            {
              name: "r/unixporn",
              url: "https://www.reddit.com/r/unixporn/",
              icon: "brand-reddit",
              icon_color: palette.red,
              openInNewTab: false,
            },
            {
              name: "r/Linuxmemes",
              url: "https://www.reddit.com/r/Linuxmemes/",
              icon: "brand-reddit",
              icon_color: palette.red,
              openInNewTab: false,
            },
            {
              name: "r/ADHD_Partners",
              url: "https://www.reddit.com/r/ADHD_Partners/",
              icon: "brand-reddit",
              icon_color: palette.red,
              openInNewTab: false,
            },
          ],
        },
        {
          name: "gaming",
          links: [
            {
              name: "Steam",
              url: "https://store.steampowered.com",
              icon: "brand-steam",
              icon_color: palette.blue,
            },
            {
              name: "GX Games",
              url: "https://gx.games/",
              icon: "brand-opera",
              icon_color: palette.mauve,
            },
            {
              name: "Nintendo",
              url: "https://store.nintendo.de",
              icon: "device-nintendo",
              icon_color: palette.red,
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(default_configuration, palette);

const root = document.querySelector(":root");
root.style.setProperty("--bg", palette.mantle);
root.style.setProperty("--accent", palette.green);
