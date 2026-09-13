// Catppuccin palette definitions for startpage theming
// Each palette is a set of named colour values
const latte = {
  rosewater: "#dc8a78",
  flamingo: "#dd7878",
  pink: "#ea76cb",
  mauve: "#8839ef",
  red: "#d20f39",
  maroon: "#e64553",
  peach: "#fe640b",
  yellow: "#df8e1d",
  green: "#40a02b",
  teal: "#179299",
  sky: "#04a5e5",
  sapphire: "#209fb5",
  blue: "#1e66f5",
  lavender: "#7287fd",
  text: "#4c4f69",
  subtext1: "#5c5f77",
  subtext0: "#6c6f85",
  overlay2: "#7c7f93",
  overlay1: "#8c8fa1",
  overlay0: "#9ca0b0",
  surface2: "#acb0be",
  surface1: "#bcc0cc",
  surface0: "#ccd0da",
  base: "#eff1f5",
  mantle: "#e6e9ef",
  crust: "#dce0e8",
};

const frappe = {
  rosewater: "#f2d5cf",
  flamingo: "#eebebe",
  pink: "#f4b8e4",
  mauve: "#ca9ee6",
  red: "#e78284",
  maroon: "#ea999c",
  peach: "#ef9f76",
  yellow: "#e5c890",
  green: "#a6d189",
  teal: "#81c8be",
  sky: "#99d1db",
  sapphire: "#85c1dc",
  blue: "#8caaee",
  lavender: "#babbf1",
  text: "#c6d0f5",
  subtext1: "#b5bfe2",
  subtext0: "#a5adce",
  overlay2: "#949cbb",
  overlay1: "#838ba7",
  overlay0: "#737994",
  surface2: "#626880",
  surface1: "#51576d",
  surface0: "#414559",
  base: "#303446",
  mantle: "#292c3c",
  crust: "#232634",
};

const macchiato = {
  rosewater: "#f4dbd6",
  flamingo: "#f0c6c6",
  pink: "#f5bde6",
  mauve: "#c6a0f6",
  red: "#ed8796",
  maroon: "#ee99a0",
  peach: "#f5a97f",
  yellow: "#eed49f",
  green: "#a6da95",
  teal: "#8bd5ca",
  sky: "#91d7e3",
  sapphire: "#7dc4e4",
  blue: "#8aadf4",
  lavender: "#b7bdf8",
  text: "#cad3f5",
  subtext1: "#b8c0e0",
  subtext0: "#a5adcb",
  overlay2: "#939ab7",
  overlay1: "#8087a2",
  overlay0: "#6e738d",
  surface2: "#5b6078",
  surface1: "#494d64",
  surface0: "#363a4f",
  base: "#24273a",
  mantle: "#1e2030",
  crust: "#181926",
};

const mocha = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
};
const { parse, stringify } = JSON;

/**
 * Utility for querying DOM elements using document.querySelector(All)
 * Returns a single element or an array, depending on the options provided
 * @param {string} e - CSS selector string
 * @param {Object} options - Query options object
 * @param {boolean} options.includeAll - Whether to return all matching elements
 * @returns {HTMLElement | Array<HTMLElement>} Single element or array of elements
 */
const $ = (e, options) => {
  const elems = document.querySelectorAll(e);
  if (options?.includeAll || elems.length > 1) return elems;
  return elems[0];
};

/**
 * Storage wraps localStorage access for configuration and state
 */
class Storage {
  key;

  /**
   * Initialise storage with a specific localStorage key
   * @param {string} key - The localStorage key to use for this storage instance
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieve a property from the stored object
   * @param {string} prop - The property name to retrieve
   * @returns {*} The value of the requested property
   */
  get(prop) {
    return parse(localStorage[this.key])[prop];
  }

  /**
   * Save a value to localStorage under the configured key
   * @param {*} value - The value to store
   * @returns {void}
   */
  save(value) {
    localStorage[this.key] = value;
  }

  /**
   * Check if a value exists in the stored object
   * @param {string} value - The property name to check for existence
   * @returns {boolean} Whether the property exists in storage
   */
  hasValue(value) {
    if (!localStorage[this.key]) return false;
    return value in parse(localStorage[this.key]);
  }
}
class Actions {
  /**
   * Activate a registered component by its name
   * @param {string} componentName
   * @returns {*}
   */
  static activate(componentName) {
    return RenderedComponents[componentName].activate();
  }
}
class Config {
  // Default configuration values for the startpage - these can be overridden by user configuration or local storage
  defaults = {
    overrideStorage: false,
    temperature: {
      location: "London",
      // Temperature scale: C for Celsius, F for Fahrenheit
      scale: "C",
      // OpenWeatherMap API key, leave empty to disable the weather widget
      appId: "",
    },
    clock: {
      // 12-hour format with AM/PM
      format: "k:i p",
    },
    additionalClocks: [
      {
        label: "UA",
        // IANA timezone name (handles DST automatically)
        timezone: "Europe/Kyiv",
        // 24-hour format
        format: "h:i",
      },
      {
        label: "Tokyo",
        timezone: "Asia/Tokyo",
        // 24-hour format without leading zero
        format: "H:i",
        locale: "ja-JP",
      }
    ],
    search: {
      engines: {
        p: ["https://www.perplexity.ai/search/?q=", "PerplexityAI"],
        d: ["https://duckduckgo.com/?q=", "DuckDuckGo"],
        g: ["https://google.com/search?q=", "Google"],
      }
    },
    // List of disabled components
    disabled: [],
    // URL to open when clicking the fastlink button in the statusbar
    fastlink: "",
    // Whether to use local fonts instead of Google Fonts CDN
    localFonts: false,
    openLastVisitedTab: false,
    // User-defined bookmark tabs
    tabs: [],
    keybindings: {
      "s": "search-bar",
    }
  };

  config;

  /**
   * Initialise the configuration with user settings and palette
   * @param {Object} configuration - User configuration object
   * @param {Object} palette - Colour palette for the startpage
   */
  constructor(configuration, palette) {
    this.config = configuration;
    this.palette = palette;
    this.storage = new Storage("configuration");

    this.autoConfig();
    this.setKeybindings();
    this.save();

    // Use a Proxy to automatically persist configuration changes
    return new Proxy(this, {
      ...this,
      __proto__: this.__proto__,
      set: (target, prop, value) => this.settingUpdatedCallback(target, prop, value),
    });
  }

  /**
   * Automatically save whenever a configuration property is updated
   * @param {Object} target - The proxy target object
   * @param {string} prop - The property being set
   * @param {*} val - The new value for the property
   * @returns {boolean} Whether the operation was successful
   */
  settingUpdatedCallback(target, prop, val) {
    if (!(prop in target)) return false;

    Reflect.set(target, prop, val);
    Object.assign(this, target);

    this.save();

    return true;
  }

  /**
   * Set default configuration values or load them from local storage
   * @returns {void}
   */
  autoConfig() {
    Object.keys(this.defaults).forEach((setting) => {
      if (this.canOverrideStorage(setting)) this[setting] = this.config[setting];
      else if (this.storage.hasValue(setting)) this[setting] = this.storage.get(setting);
      else this[setting] = this.defaults[setting];
    });
  }

  /**
   * Determines whether localStorage can be overridden for a given setting
   * If the setting is for the tabs section, always override
   * @param {string} setting - The setting name to check
   * @returns {boolean} Whether the setting can override storage
   */
  canOverrideStorage(setting) {
    return setting in this.config && (this.config.overrideStorage || setting === "tabs");
  }

  /**
   * Serialise the configuration object for export or storage
   * @returns {Object} Serialised configuration object
   */
  toJSON() {
    return {
      ...this,
      defaults: undefined,
    };
  }

  /**
   * Set up keybinding actions for the startpage
   * @returns {void}
   */
  setKeybindings() {
    document.addEventListener("keydown", ({ key }) => {
      if (document.activeElement !== document.body) return;

      if (key in this.config.keybindings) Actions.activate(this.config.keybindings[key]);
    });
  }

  /**
   * Persist the current configuration to local storage
   * @returns {void}
   */
  save() {
    this.storage.save(stringify(this));
  }

  /**
   * Export the current configuration as a downloadable file
   * @returns {void}
   */
  exportSettings() {
    const anchor = document.createElement('a');
    const filename = 'dawn.configuration.json';
    const mimeType = 'data:text/plain;charset=utf-8,';

    anchor.href = mimeType + encodeURIComponent(stringify(this, null, 2));
    anchor.download = filename;

    anchor.click();
  }
}
/*
+----------+
| STRFTIME |
+----------+
Author: https://github.com/b-coimbra
Description:
A simple strftime function implementation in JavaScript, without the percentage notation
Based on https://strftime.org

USAGE:
new Date().strftime("H:M p - A") => 21:32 AM - Thursday
new Date().strftime("m/b/Y")     => 1/Jan/2018
new Date().strftime("do B Y")    => 18th January 2018
new Date().strftime("h:i p")     => 09:32 PM (12-hour format)
new Date().strftime("K:i p")     => 9:32 PM (12-hour format without leading zero)

This function extends Date.prototype with the date formatting used by the startpage
*/

// Create a date object for a specific timezone using IANA timezone names
// Example: Date.createWithTimezone("America/New_York")
Date.createWithTimezone = function (timezone = null) {
  const date = new Date();

  if (!timezone) {
    return date;
  }

  const isoDate = date.toISOString();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const parts = formatter.formatToParts(date);

  const formatParts = {};
  parts.forEach(part => {
    formatParts[part.type] = part.value;
  });

  return new Date(
    formatParts.year,
    parseInt(formatParts.month) - 1, // Month is 0-based
    formatParts.day,
    formatParts.hour,
    formatParts.minute,
    formatParts.second
  );
};

// Create a Date with a specific timezone offset in hours (legacy method)
Date.createWithTimezoneOffset = function (timezoneOffsetHours = 0) {
  const localDate = new Date();

  // Get the local timezone offset in minutes
  const localOffset = localDate.getTimezoneOffset();

  // Calculate the target timezone offset in milliseconds
  const targetOffsetMs = (localOffset + timezoneOffsetHours * 60) * 60 * 1000;

  return new Date(localDate.getTime() + targetOffsetMs);
};

// Extend the Date prototype with strftime-style formatting
Date.prototype.strftime = function (format = "c", locale = "en-US") {
  const date = this;

  const isValid = (date) => date instanceof Date && !isNaN(date);

  if (!isValid(date)) throw date;

  Number.prototype.pad = function (n = 2) {
    return (Array(n).join("0") + this).substr(-n);
  };

  // Add ordinal suffix method to numbers (1st, 2nd, 3rd, etc.)
  Number.prototype.ord = function () {
    return (
      {
        1: "st",
        2: "nd",
        3: "rd",
      }[(num = this.toString()).length > 1 ? parseInt(num.split("")[1]) : num] || "th"
    );
  };

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    result = [],
    hours24 = date.getHours(),
    hours12 = hours24 % 12 || 12, // Convert 0 to 12 for 12 AM
    formats = {
      a: days[date.getDay()].substr(0, 3),
      A: days[date.getDay()],
      w: date.getDay(),
      q: date.getDay().pad(),
      d: date.getDate().pad(),
      e: date.getDate(),
      b: month[date.getMonth()].substr(0, 3),
      B: month[date.getMonth()],
      m: date.getMonth() + 1,
      N: (date.getMonth() + 1).pad(),
      y: date.getFullYear().pad(),
      Y: date.getFullYear(),
      // 24-hour format without leading zero
      H: hours24,
      // 24-hour format with leading zero
      h: hours24.pad(),
      // 12-hour format without leading zero
      K: hours12,
      // 12-hour format with leading zero
      k: hours12.pad(),
      p: hours24 >= 12 ? "PM" : "AM",
      // Lowercase am/pm
      P: hours24 >= 12 ? "pm" : "am",
      o: date.getDate().ord(),
      M: date.getMinutes(),
      i: date.getMinutes().pad(),
      S: date.getSeconds(),
      s: date.getSeconds().pad(),
      f: date.getMilliseconds(),
      c: date.toDateString() + " - " + date.toTimeString(),
      x: date.toLocaleDateString(locale),
      X: date.toLocaleTimeString(locale),
      // Full localised date and time
      z: date.toLocaleString(locale),
    };

  // Parse format string and replace format codes with values
  format.split(/(\w|.)/m).forEach((type) => {
    if (type) result.push(typeof formats[type] === "undefined" ? type : formats[type]);
  });

  return result.join("");
};
// Switches between the light and dark themes based on the system preference
// Exports functions to detect that preference and react when it changes

/**
 * Detects the user's system colour scheme preference
 * @param {Object} lightTheme - The theme to use when in light mode
 * @param {Object} darkTheme - The theme to use when in dark mode
 * @returns {Object} The appropriate theme based on system preference
 */
function getSystemTheme(lightTheme, darkTheme) {
  // Check if the browser supports prefers-colour-scheme media query
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return darkTheme;
  } else {
    return lightTheme;
  }
}

/**
 * Sets up a listener for system theme changes
 * @param {Object} lightTheme - The theme to use when in light mode
 * @param {Object} darkTheme - The theme to use when in dark mode
 * @param {Function} onThemeChange - Callback for when the theme changes
 * @returns {void}
 */
function initThemeListener(lightTheme, darkTheme, onThemeChange) {
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e) => {
      const newTheme = e.matches ? darkTheme : lightTheme;
      onThemeChange(newTheme);
    });
  }
}

/**
 * Initialise the theme system and keep it in sync with the system preference
 * @param {Object} lightTheme - The theme to use when in light mode
 * @param {Object} darkTheme - The theme to use when in dark mode
 * @param {Function} onThemeChange - Optional callback for when the theme changes
 * @returns {Object} The current theme based on system preference
 */
function initThemeSystem(lightTheme, darkTheme, onThemeChange = null) {
  const initialTheme = getSystemTheme(lightTheme, darkTheme);

  // Set up listener with default page reload if no callback provided
  if (onThemeChange) {
    initThemeListener(lightTheme, darkTheme, onThemeChange);
  } else {
    initThemeListener(lightTheme, darkTheme, () => {
      window.location.reload();
    });
  }

  return initialTheme;
}
const RenderedComponents = {};

// Base class for all startpage components: shadow DOM, resource management, rendering
class Component extends HTMLElement {
  refs = {};

  resources = {
    fonts: {
      roboto: '<link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700" rel="stylesheet">',
      nunito: '<link href="https://fonts.googleapis.com/css?family=Nunito:200" rel="stylesheet">',
      raleway: '<link href="https://fonts.googleapis.com/css?family=Raleway:600" rel="stylesheet">',
    },
    localFonts: {
      roboto: '<link rel="stylesheet" href="src/fonts/roboto-local.css">',
      nunito: '<link rel="stylesheet" href="src/fonts/nunito-local.css">',
      raleway: '<link rel="stylesheet" href="src/fonts/raleway-local.css">',
    },
    icons: {
      material:
        '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">',
      materialLocal: '<link rel="stylesheet" href="src/fonts/material-icons-local.css">',
      tabler: '<link rel="stylesheet" href="src/css/tabler-icons.min.css">',
    },
    libs: {
      awoo: '<link rel="stylesheet" type="text/css" href="src/css/awoo.min.css">',
      awooLocal: '<link rel="stylesheet" type="text/css" href="src/css/awoo-local.min.css">',
    },
  };

  // Map of (category, name) -> local-variant key, applied when CONFIG.localFonts is true
  static localOverrides = {
    "fonts.roboto": ["localFonts", "roboto"],
    "fonts.nunito": ["localFonts", "nunito"],
    "fonts.raleway": ["localFonts", "raleway"],
    "icons.material": ["icons", "materialLocal"],
    "libs.awoo": ["libs", "awooLocal"],
  };

  /**
   * Initialise the component with shadow DOM
   * Creates an open shadow root for style encapsulation
   */
  constructor() {
    super();

    this.shadow = this.attachShadow({
      mode: "open",
    });
  }

  /**
   * Resolve a resource link for the given category/name, honouring CONFIG.localFonts.
   * @param {string} category - One of "fonts", "icons", "libs".
   * @param {string} name - Resource name within the category.
   * @returns {string} HTML <link> tag for the resource.
   */
  getResource(category, name) {
    if (typeof CONFIG !== "undefined" && CONFIG.localFonts) {
      const override = Component.localOverrides[`${category}.${name}`];
      if (override) {
        const [cat, key] = override;
        return this.resources[cat][key];
      }
    }
    return this.resources[category][name];
  }

  /**
   * Returns custom styles for the component
   * @returns {string|null} CSS styles or null
   */
  style() {
    return null;
  }

  /**
   * Returns the HTML template for the component
   * @returns {string|null} HTML template or null
   */
  template() {
    return null;
  }

  /**
   * Returns array of external resources to import
   * @returns {Array<string>} Array of resource imports
   */
  imports() {
    return [];
  }

  /**
   * Return all the imports that a component requested
   * @returns {Array<string>} imports
   */
  get getResources() {
    return this.imports();
  }

  /**
   * Return inline style tag
   * @returns {string}
   */
  async loadStyles() {
    let html = this.getResources.join("\n");

    if (this.style()) html += `<style>${this.style()}</style>`;

    return html;
  }

  /**
   * Build the component's HTML body
   * @returns {string} html
   */
  async buildHTML() {
    return (await this.loadStyles()) + (await this.template());
  }

  /**
   * Create a reference proxy for manipulating DOM elements within the component's shadow DOM
   * @returns {Proxy<HTMLElement | boolean>}
   */
  createRef() {
    return new Proxy(this.refs, {
      get: (target, prop) => {
        const ref = target[prop];
        const elems = this.shadow.querySelectorAll(ref);

        if (elems.length > 1) return elems;

        const element = elems[0];

        if (!element) return ref;

        return element;
      },
      set: (target, prop, value) => {
        this.shadow.querySelector(target[prop]).innerHTML = value;
        return true;
      },
    });
  }

  /**
   * Render the component's HTML and update references
   * @returns {Promise<void>}
   */
  async render() {
    this.shadow.innerHTML = await this.buildHTML();
    this.refs = this.createRef();
    RenderedComponents[this.localName] = this;
  }
}
