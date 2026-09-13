
// Component for rendering navigation links within tabs
class Links extends Component {
  /**
   * Initialise the Links component
   */
  constructor() {
    super();
  }

  /**
   * Generates icon HTML for a link
   * @param {Object} link - Link object containing icon properties
   * @returns {string} HTML string for the icon or empty string
   */
  static getIcon(link) {
    const defaultColor = CONFIG.palette.base;

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}"></i>`
      : "";
  }

  /**
   * Generates HTML for all links in a specific tab
   * @param {string} tabName - Name of the tab to render links for
   * @param {Array} tabs - Array of tab objects
   * @returns {string} HTML string containing all links
   */
  static getAll(tabName, tabs) {
    const { categories } = tabs.find((f) => f.name === tabName);

    return `
      ${categories
        .map(({ name, links }) => {
          return `
          <li>
            <h1>${name}</h1>
              <div class="links-wrapper">
              ${links
              .map(
                (link) => `
                  <div class="link-info">
                    <a href="${link.url}" target="${link.openInNewTab === false ? "_self" : "_blank"}">
                      ${Links.getIcon(link)}
                      ${link.name ? `<p class="link-name">${link.name}</p>` : ""}
                    </a>
                </div>`,
              )
              .join("")}
            </div>
          </li>`;
        })
        .join("")}
    `;
  }
}

/**
 * Component for rendering tab categories with background styling
 */
class Category extends Component {
  /**
   * Initialise the Category component
   */
  constructor() {
    super();
  }

  /**
   * Generates HTML for all tab categories
   * @param {Array} tabs - Array of tab objects
   * @returns {string} HTML string containing all categories
   */
  static getAll(tabs) {
    return `
      ${tabs
        .map(({ name, background_url }, index) => {
          return `<ul class="${name}" data-background-url="${background_url}" ${index == 0 ? "active" : ""}>
            <div class="banner"></div>
            <h1 class="tab-title">${name}</h1>
            <div class="links">${Links.getAll(name, tabs)}</div>
          </ul>`;
        })
        .join("")}
    `;
  }
}

/**
 * Main tabs component for displaying categorised links and navigation
 */
class Tabs extends Component {
  refs = {};

  /**
   * Initialise the tabs component with configuration
   */
  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  /**
   * Returns CSS import dependencies for this component
   * @returns {string[]} Array of CSS file paths
   */
  imports() {
    return [
      this.getResource('icons', 'material'),
      this.getResource('icons', 'tabler'),
      this.getResource('fonts', 'roboto'),
      this.getResource('fonts', 'raleway'),
      this.getResource('libs', 'awoo'),
    ];
  }

  /**
   * Generates component CSS styles
   * @returns {string} CSS styles for the tabs component
   */
  style() {
    return `
      status-bar {
          bottom: -70px;
          height: 32px;
          background: ${CONFIG.palette.base};
          border-radius: 4px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, .25);
      }

      #panels, #panels ul,
      #panels .links {
          position: absolute;
      }

      .nav {
          color: #fff;
      }

      .tab-title {
          display: none;
      }

      #panels {
          border-radius: 5px 0 0 5px;
          width: 90%;
          max-width: 1200px;
          height: 450px;
          right: 0;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
          background: ${CONFIG.palette.base};
      }

      .categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 10px 0 0 10px;
      }

      .categories ul {
          --panelbg: transparent;
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 0;
          background: ${CONFIG.palette.base};
          transform: translate3d(-100%, 0, 0);
          transition: transform .6s cubic-bezier(.22, 1, .36, 1);
          will-change: transform;
          /* animation: scroll 25s ease-in-out infinite; */
      }

      @keyframes scroll {
          50% {
              background-position-x: -240px;
          }
      }

      .categories ul:nth-child(1) {
          --flavour: ${CONFIG.palette.mauve};
      }

      .categories ul:nth-child(2) {
          --flavour: ${CONFIG.palette.pink};
      }

      .categories ul:nth-child(3) {
          --flavour: ${CONFIG.palette.red};
      }

      .categories ul:nth-child(4) {
          --flavour: ${CONFIG.palette.blue};
      }
      .categories ul:nth-child(5) {
          --flavour: ${CONFIG.palette.mauve};
      }

      .categories ul .links {
          box-shadow: inset -1px 0 var(--flavour);
      }

      .categories ul[active] {
          transform: translate3d(0, 0, 0);
          z-index: 1;
      }

      .categories .links {
          right: 0;
          width: 70%;
          height: 100%;
          background: ${CONFIG.palette.base};
          padding: 5%;
          flex-wrap: wrap;
      }

      .categories .links li {
          list-style: none;
      }

      .categories ul .links a {
          color: ${CONFIG.palette.text};
          text-decoration: none;
          font: 700 18px 'Roboto', sans-serif;
          transition: all .2s;
          display: inline-flex;
          align-items: center;
          padding: .4em .7em;
          background: ${CONFIG.palette.mantle};
          box-shadow: 0 4px ${CONFIG.palette.mantle}, 0 5px 10px rgb(0 0 0 / 20%);
          border-radius: 2px;
          margin-bottom: .7em;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info:not(:last-child) { margin-right: .5em; }

      .categories ul .links a:hover {
          transform: translate(0, 4px);
          box-shadow: 0 0 rgba(0, 0, 0, 0.25), 0 0 0 rgba(0, 0, 0, .5), 0 -0px 5px rgba(0, 0, 0, .1);
          color: var(--flavour);
      }

      .categories ul::after {
          content: attr(class);
          position: absolute;
          display: flex;
          text-transform: uppercase;
          overflow-wrap: break-word;
          width: 25px;
          height: 250px;
          padding: 1em;
          margin: auto;
          border-radius: 5px;
          box-shadow: inset 0 0 0 2px var(--flavour);
          left: calc(15% - 42.5px);
          bottom: 0;
          top: 0;
          background: linear-gradient(to top, rgb(50 48 47 / 90%), transparent);
          color: var(--flavour);
          letter-spacing: 1px;
          font: 500 30px 'Nunito', sans-serif;
          text-align: center;
          flex-wrap: wrap;
          word-break: break-all;
          align-items: center;
          backdrop-filter: blur(3px);
      }

      .categories .links li:not(:last-child) {
          box-shadow: 0 1px 0 ${CONFIG.palette.text};
          padding: 0 0 .5em 0;
          margin-bottom: 1.5em;
      }

      .categories .links li h1 {
          color: ${CONFIG.palette.text};
        opacity: 0.5;
          font-size: 13px;
          margin-bottom: 1em;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Raleway', sans-serif;
      }

      .categories .link-icon {
          font-size: 27px;
          color: ${CONFIG.palette.text};
      }

      .categories .link-icon + .link-name {
          margin-left: 10px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
      }

      .ti {
          animation: fadeInAnimation ease .5s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          height: 27px;
          width: 27px;
      }

      @keyframes fadeInAnimation {
          0% {
              opacity: 0;
          }
          100% {
              opacity: 1;
          }
      }

      @media (max-width: 768px), (hover: none) and (pointer: coarse) {
          :host,
          #links {
              display: block;
              width: 100%;
              height: 100dvh;
          }

          #panels {
              inset: 0;
              width: 100%;
              max-width: none;
              height: 100%;
              margin: 0;
              border-radius: 0;
              box-shadow: none;
          }

          .categories {
              border-radius: 0;
          }

          .categories ul {
              box-sizing: border-box;
              overflow-x: hidden;
              overflow-y: auto;
              overscroll-behavior: contain;
              scrollbar-width: none;
              touch-action: pan-y;
              padding: calc(24px + env(safe-area-inset-top)) 20px
                  calc(24px + env(safe-area-inset-bottom));
              background-image: none !important;
              -webkit-overflow-scrolling: touch;
          }

          .categories ul::-webkit-scrollbar {
              display: none;
          }

          .categories .banner,
          .categories ul::after {
              display: none;
          }

          .tab-title {
              position: relative;
              display: block;
              margin: 0 0 28px;
              color: var(--flavour);
              font: 600 28px 'Raleway', sans-serif;
              letter-spacing: .14em;
              line-height: 1.25;
              text-align: center;
              text-transform: uppercase;
          }

          #panels .categories .links {
              position: relative;
              right: auto;
              display: block;
              width: 100%;
              height: auto;
              padding: 0;
              background: transparent;
              box-shadow: none;
          }

          .categories .links li {
              width: 100%;
          }

          .categories .links li:not(:last-child) {
              margin-bottom: 24px;
              padding-bottom: 18px;
          }

          .categories .links li h1 {
              margin-bottom: 12px;
          }

          .categories .links-wrapper {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 10px;
          }

          .categories .link-info,
          .categories .link-info:not(:last-child) {
              display: block;
              min-width: 0;
              margin: 0;
          }

          .categories ul .links a {
              box-sizing: border-box;
              width: 100%;
              min-height: 48px;
              margin: 0;
              padding: .6em .7em;
              overflow: hidden;
              border-radius: 10px;
          }

          .categories .link-name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
          }

          status-bar {
              display: none;
          }
      }

      @media (max-width: 360px) {
          .categories .links-wrapper {
              grid-template-columns: 1fr;
          }
      }
    `;
  }

  /**
   * Generates HTML template for the tabs component
   * @returns {string} HTML template with panels and categories
   */
  template() {
    return `
      <div id="links" class="-">

        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
            <search-bar></search-bar>
          </div>
          <status-bar class="!-"></status-bar>
        </div>
      </div>
    `;
  }

  /**
   * Component lifecycle callback when element is connected to DOM
   */
  connectedCallback() {
    this.render();
  }
}
/**
 * WeatherForecastClient fetches and parses weather data for a given location
 * from the OpenWeatherMap API
 */
class WeatherForecastClient {
  /**
   * Create a new WeatherForecastClient instance
   * @param {string} location - The location to fetch weather data for
   * @param {string} appId - OpenWeatherMap API key (optional)
   */
  constructor(location, appId) {
    this.appId = appId;
    this.location = location;
    // Construct API URL with location and metric units (only if we have a key)
    this.url = appId
      ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(location)}&units=metric&appid=${appId}`
      : null;
  }

  /**
   * Fetch and return the current weather for the configured location
   * Resolves to null when no API key is configured.
   * @returns {Promise<{temperature: number, condition: string} | null>}
   */
  async getWeather() {
    if (!this.url) return null;

    return await fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        // Round temperature to nearest whole number
        const temperature = Math.round(data.main.temp);
        // Extract and normalise weather condition
        const condition = data.weather[0].main.toLowerCase();

        return {
          temperature,
          condition,
        };
      })
      .catch((err) => {
        console.warn("Weather API returned an error:", err);
        return null;
      });
  }
}

// Weather component, shows the current temperature and a condition icon
class Weather extends Component {
  refs = {
    temperature: ".weather-temperature-value",
    condition: ".weather-condition-icon",
    scale: ".weather-temperature-scale",
  };

  // Weather condition mappings to Material Design icons and colours
  forecasts = [
    {
      conditions: ["clouds", "mist", "haze", "smoke"],
      icon: "cloud_queue",
      color: "cloudy",
    },
    {
      conditions: ["drizzle", "snow", "rain"],
      icon: "opacity",
      color: "cloudy",
    },
    {
      conditions: ["clear"],
      icon: "wb_sunny",
      color: "sunny",
    },
    {
      conditions: ["thunderstorm"],
      icon: "bolt",
      color: "cloudy",
    },
  ];

  location;

  /**
   * Initialise the weather component
   */
  constructor() {
    super();

    this.setDependencies();
    this.setEvents();
  }

  /**
   * Set up event handlers for the component
   */
  setEvents() {
    this.onclick = this.swapScale;
  }

  /**
   * Configure component dependencies and initial state
   */
  setDependencies() {
    this.location = CONFIG.temperature.location;
    this.temperatureScale = CONFIG.temperature.scale;
    this.weatherForecast = new WeatherForecastClient(this.location, CONFIG.temperature.appId);
  }

  /**
   * Define required external resources
   * @returns {Array} Array of resource imports
   */
  imports() {
    return [this.getResource('icons', 'material'), this.getResource('fonts', 'roboto')];
  }

  /**
   * Generate CSS styles for the weather component
   * @returns {string} CSS style definitions
   */
  style() {
    return `
      .weather-icon {
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .weather-temperature {
          font: 300 9pt 'Roboto', sans-serif;
          color: ${CONFIG.palette.text};
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
      }

      .weather-temperature:hover .weather-temperature-location {
          display: inline-block;
      }

      .weather-temperature-location {
          display: none;
          margin-right: 10px;
      }

      .weather-temperature-location {
          font-weight: 500;
      }

      .weather-temperature-value
      {
          font-weight: bold;
      }

      .weather-condition-icon {
          font-size: 14pt;
          line-height: 0;
      }

      .weather-condition-icon.sunny {
          color: ${CONFIG.palette.yellow};
      }

      .weather-condition-icon.cloudy {
          color: ${CONFIG.palette.blue};
      }
    `;
  }

  /**
   * Generate the HTML template for the weather component
   * @returns {Promise<string>} HTML template string
   */
  async template() {
    return `
        <p class="+ weather-temperature">
            <span class="weather-icon" class="+"><i class="material-icons weather-condition-icon sunny">wb_sunny</i></span>
            <span class="weather-temperature-location">${this.location}</span>
            <span class="weather-temperature-value">1</span>
            º<span class="weather-temperature-scale">${this.temperatureScale}</span>
        </p>`;
  }

  /**
   * Convert Fahrenheit to Celsius
   * @param {number} f Temperature in Fahrenheit
   * @returns {number} Temperature in Celsius
   */
  toC(f) {
    return Math.round(((f - 32) * 5) / 9);
  }

  /**
   * Convert Celsius to Fahrenheit
   * @param {number} c Temperature in Celsius
   * @returns {number} Temperature in Fahrenheit
   */
  toF(c) {
    return Math.round((c * 9) / 5 + 32);
  }

  /**
   * Toggle temperature scale between Celsius and Fahrenheit
   */
  swapScale() {
    this.temperatureScale = this.temperatureScale === "C" ? "F" : "C";

    CONFIG.temperature = {
      ...CONFIG.temperature,
      scale: this.temperatureScale,
    };

    this.setTemperature();
  }

  /**
   * Convert temperature to the currently selected scale
   * @param {number} temperature Temperature value in Celsius
   * @returns {number} Temperature in selected scale
   */
  convertScale(temperature) {
    if (this.temperatureScale === "F") return this.toF(temperature);

    return temperature;
  }

  /**
   * Fetch weather data and update display
   */
  async setWeather() {
    this.weather = await this.weatherForecast.getWeather();
    if (!this.weather) return;
    this.setTemperature();
  }

  /**
   * Update temperature and condition display elements
   */
  setTemperature() {
    const { temperature, condition } = this.weather;
    const { icon, color } = this.getForecast(condition);

    this.refs.temperature = this.convertScale(temperature);
    this.refs.condition = icon;
    this.refs.scale = this.temperatureScale;
    this.refs.condition.classList.add(color);
  }

  /**
   * Find matching forecast configuration for weather condition
   * @param {string} condition Weather condition from API
   * @returns {Object} Forecast configuration with icon and colour
   */
  getForecast(condition) {
    // Find matching forecast or fall back to first (cloudy)
    for (const forecast of this.forecasts) if (forecast.conditions.includes(condition)) return forecast;

    return this.forecasts[0];
  }

  /**
   * Component lifecycle method called when element is connected to DOM
   */
  async connectedCallback() {
    await this.render();
    await this.setWeather();
  }
}
// Clock component for displaying main time and additional timezone clocks
class Clock extends Component {
  refs = {
    clockContainer: ".clock-container",
    icon: ".clock-icon",
    mainClockTime: "#main-clock .clock-time",
  };

  /**
   * Initialise the clock component
   */
  constructor() {
    super();
  }

  /**
   * Import required fonts and icons for the clock display
   * @returns {Array<string>} Array of resource imports
   */
  imports() {
    return [this.getResource('icons', 'material'), this.getResource('fonts', 'roboto')];
  }

  /**
   * Define the style for the clock component using the current palette
   * @returns {string} CSS styles for the clock component
   */
  style() {
    return `
        .clock-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            height: 100%;
            min-height: 32px;
        }

        .clock-time {
            white-space: nowrap;
            font: 300 9pt 'Roboto', sans-serif;
            color: ${CONFIG.palette.text};
            letter-spacing: .5px;
            margin: 0;
        }

        .clock-label {
            font: 300 9pt 'Roboto', sans-serif;
            color: ${CONFIG.palette.text};
            margin-right: 2px;
            letter-spacing: .5px;
            white-space: nowrap;
        }

        .clock-wrapper {
            display: flex;
            align-items: center;
            position: relative;
            height: 100%;
        }

        .clock-icon {
            font-size: 10pt;
            margin-right: 5px;
            transform: translateY(-0.5px);
        }

        .clock-item {
            display: flex;
            align-items: center;
            height: 100%;
        }
    `;
  }

  /**
   * Render the clock icon and time template
   * @returns {string} HTML template for the clock component
   */
  template() {
    return `
        <div class="clock-container">
            <div class="clock-wrapper">
                <span class="material-icons clock-icon">schedule</span>
                <div id="main-clock" class="clock-item">
                    <p class="clock-time"></p>
                </div>
            </div>
            ${this.renderAdditionalClocks()}
        </div>
    `;
  }

  /**
   * Render additional clocks if configured
   * @returns {string} HTML for additional timezone clocks
   */
  renderAdditionalClocks() {
    if (!CONFIG.additionalClocks || !CONFIG.additionalClocks.length) {
      return '';
    }

    return CONFIG.additionalClocks.map((clock, index) => {
      return `
        <div class="clock-wrapper">
            <span class="material-icons clock-icon additional-icon-${index}">public</span>
            <div id="additional-clock-${index}" class="clock-item">
                <span class="clock-label">${clock.label || clock.timezone}</span>
                <p class="clock-time"></p>
            </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Set the icon colour based on the configuration
   * @returns {void}
   */
  setIconColor() {
    if (this.shadow) {
      const mainIcon = this.shadow.querySelector('.clock-icon:not([class*="additional-icon"])');
      if (mainIcon) {
        mainIcon.style.color = CONFIG.clock.icon_color;
      }

      if (CONFIG.additionalClocks && CONFIG.additionalClocks.length) {
        CONFIG.additionalClocks.forEach((clock, index) => {
          const additionalIcon = this.shadow.querySelector(`.additional-icon-${index}`);
          if (additionalIcon) {
            additionalIcon.style.color = clock.icon_color || CONFIG.clock.icon_color;
          }
        });
      }
    }
  }

  /**
   * Update the displayed time using the configured format
   * @returns {void}
   */
  setTime() {
    if (this.shadow) {
      const mainClockElement = this.shadow.querySelector('#main-clock .clock-time');
      const date = new Date();
      if (mainClockElement) {
        mainClockElement.textContent = date.strftime(CONFIG.clock.format, CONFIG.clock.locale);
      }

      if (CONFIG.additionalClocks && CONFIG.additionalClocks.length) {
        CONFIG.additionalClocks.forEach((clock, index) => {
          const clockElement = this.shadow.querySelector(`#additional-clock-${index} .clock-time`);
          if (clockElement) {
            let timezoneDate;

            // Use IANA timezone name when provided; otherwise fall back to local time
            if (clock.timezone) {
              timezoneDate = Date.createWithTimezone(clock.timezone);
            } else {
              timezoneDate = new Date();
            }

            clockElement.textContent = timezoneDate.strftime(clock.format || CONFIG.clock.format, clock.locale || CONFIG.clock.locale);
          }
        });
      }
    }
  }

  /**
   * Initialise the clock and update every second
   * @returns {void}
   */
  /**
   * Schedule the next tick aligned to the start of the next full second
   * to avoid drift from setInterval slop.
   * @returns {void}
   */
  scheduleNextTick() {
    const delay = 1000 - (Date.now() % 1000);
    setTimeout(() => {
      this.setTime();
      this.scheduleNextTick();
    }, delay);
  }

  connectedCallback() {
    this.render().then(() => {
      setTimeout(() => {
        this.setTime();
        this.setIconColor();
        this.scheduleNextTick();
      }, 100);
    });
  }
}

// Statusbar component for tab navigation and widgets
class Statusbar extends Component {
  externalRefs = {};

  refs = {
    categories: ".categories ul",
    tabs: "#tabs ul li",
    indicator: ".indicator",
    fastlink: ".fastlink",
  };

  currentTabIndex = 0;
  wheelNavigationLocked = false;
  wheelUnlockTimer;
  swipeStartX = null;
  swipeStartY = null;
  mobileLayoutQuery = window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)");

  /**
   * Initialise the statusbar component
   */
  constructor() {
    super();

    this.setDependencies();
  }

  /**
   * Sets up component dependencies and external references
   */
  setDependencies() {
    this.externalRefs = {
      categories: this.parentNode.querySelectorAll(this.refs.categories),
    };
  }

  /**
   * Returns CSS import dependencies for this component
   * @returns {string[]} Array of CSS file paths
   */
  imports() {
    return [this.getResource('fonts', 'roboto'), this.getResource('icons', 'material'), this.getResource('libs', 'awoo')];
  }

  /**
   * Generates component CSS styles
   * @returns {string} CSS styles for the statusbar
   */
  style() {
    return `
      *:not(:defined) { display: none; }

      #tabs,
      #tabs .widgets,
      #tabs ul li:last-child {
          position: absolute;
      }

      #tabs {
          width: 100%;
          height: 100%;
      }

      #tabs ul {
          counter-reset: tabs;
          height: 100%;
          position: relative;
          list-style: none;
          margin-left: 1em;
      }

      #tabs ul li:not(:last-child)::after {
          content: counter(tabs, cjk-ideographic);
          counter-increment: tabs;
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          align-items: center;
          text-align: center;
          justify-content: center;
      }

      #tabs ul li:not(:last-child) {
          width: 35px;
          text-align: center;
          font: 700 13px 'Yu Gothic', serif;
          color: ${CONFIG.palette.text};
          padding: 6px 0;
          transition: all .1s;
          cursor: pointer;
          line-height: 0;
          height: 100%;
      }

      #tabs ul li:not(:last-child):hover {
          background: ${CONFIG.palette.surface0};
      }

      #tabs ul li:last-child {
          --flavour: var(--accent);
          width: 35px;
          height: 3px;
          background: var(--flavour);
          bottom: 0;
          transition: all .3s;
      }

      #tabs ul li[active]:not(:last-child) {
          color: ${CONFIG.palette.text};
          font-size: 13px;
          padding: 6px 0;
      }

      #tabs ul li[active]:nth-child(2) ~ li:last-child { margin: 0 0 0 35px; }
      #tabs ul li[active]:nth-child(3) ~ li:last-child { margin: 0 0 0 70px; }
      #tabs ul li[active]:nth-child(4) ~ li:last-child { margin: 0 0 0 105px; }
      #tabs ul li[active]:nth-child(5) ~ li:last-child { margin: 0 0 0 140px; }

      #tabs ul li[active]:nth-child(1) ~ li:last-child {
          --flavour: ${CONFIG.palette.mauve};
      }

      #tabs ul li[active]:nth-child(2) ~ li:last-child {
          --flavour: ${CONFIG.palette.pink};
      }

      #tabs ul li[active]:nth-child(3) ~ li:last-child {
          --flavour: ${CONFIG.palette.red};
      }

      #tabs ul li[active]:nth-child(4) ~ li:last-child {
          --flavour: ${CONFIG.palette.blue};
      }

      #tabs ul li[active]:nth-child(5) ~ li:last-child {
          --flavour: ${CONFIG.palette.mauve};
      }

      .widgets {
          right: 0;
          margin: auto;
          height: 32px;
          color: #fff;
          font-size: 12px;
      }

      .widgets:hover .edit {
          margin: 0;
      }

      .widget {
          position: relative;
          height: 100%;
          padding: 0 1em;
      }

      .widget.time-widget {
          min-width: max-content;
      }

      .widget:first-child {
          padding-left: 2em;
      }

      .widget:last-child {
          padding-right: 2em;
      }

      .widget:hover {
          cursor: pointer;
          background: rgba(255, 255, 255, .05);
      }

      #tabs > cols {
          position: relative;
          grid-template-columns: [chat-tab] 35px [tabs] auto [widgets] auto;
      }

      #tabs .time span {
          font-weight: 400;
      }

      #tabs i {
          font-size: 14pt !important;
      }

      .widget:not(:first-child)::before {
          content: '';
          position: absolute;
          display: block;
          left: 0;
          height: calc(100% - 15px);
          width: 1px;
          background: rgb(255 255 255 / 10%);
      }

      .fastlink {
          border: 0;
          background: ${CONFIG.palette.mantle};
          color: ${CONFIG.palette.green};
          cursor: pointer;
          border-radius: 5px 15px 15px 5px;
      }

      .fastlink:hover {
          filter: brightness(1.2);
      }

      .fastlink-icon {
        width: 70%;
      }

    `;
  }

  /**
   * Generates HTML template for the statusbar component
  * @returns {string} HTML template with tabs and widgets
  */
  template() {
    const weatherWidget = String(CONFIG.temperature.appId ?? "").trim()
      ? '<weather-forecast class="+ widget weather"></weather-forecast>'
      : "";

    return `
        <div id="tabs">
            <cols>
                <button class="+ fastlink">
                  <img class="fastlink-icon" src="src/img/favicon.png"/>
                </button>
                <ul class="- indicator" role="tablist" aria-label="Tabs"></ul>
                <div class="+ widgets col-end">
                    <current-time class="+ widget time-widget"></current-time>
                    ${weatherWidget}
                </div>
            </cols>
        </div>`;
  }

  /**
   * Sets up event listeners for tab interactions and navigation
   */
  setEvents() {
    this.refs.tabs.forEach((tab) => {
      if (!tab.hasAttribute("tab-index")) return;
      tab.addEventListener("click", () => this.handleTabChange(tab));
      tab.addEventListener("keydown", (event) => {
        const { key } = event;

        if (key !== "Enter" && key !== " ") return;
        event.preventDefault();
        this.handleTabChange(tab);
      });
    });

    this.externalRefs.categories.forEach((category) => {
      category.addEventListener("pointerdown", (event) => this.handleSwipeStart(event), { passive: true });
      category.addEventListener("pointerup", (event) => this.handleSwipeEnd(event), { passive: true });
      category.addEventListener("pointercancel", () => this.resetSwipeGesture(), { passive: true });
    });

    document.onkeydown = (e) => this.handleKeyPress(e);
    document.onwheel = (e) => this.handleWheelScroll(e);
    this.refs.fastlink.onclick = () => {
      if (CONFIG.fastlink) window.location.href = CONFIG.fastlink;
    };
    this.mobileLayoutQuery.addEventListener("change", (event) => {
      if (!event.matches) this.loadBackground(this.externalRefs.categories[this.currentTabIndex]);
    });

    // Store current tab index before page unload
    if (CONFIG.openLastVisitedTab) {
      window.onbeforeunload = () => this.saveCurrentTab();
    }
  }

  /**
   * Saves the currently active tab index to localStorage
   */
  saveCurrentTab() {
    localStorage.lastVisitedTab = this.currentTabIndex;
  }

  /**
   * Opens the last visited tab from localStorage
   */
  openLastVisitedTab() {
    const storedTabIndex = Number.parseInt(localStorage.lastVisitedTab, 10);
    const initialTabIndex = CONFIG.openLastVisitedTab && Number.isInteger(storedTabIndex)
      ? storedTabIndex
      : 0;

    this.activateByKey(initialTabIndex);
  }

  /**
   * Handles tab change events
   * @param {Element} tab - The clicked tab element
   */
  handleTabChange(tab) {
    this.activateByKey(Number(tab.getAttribute("tab-index")));
  }

  /**
   * Checks whether the mobile layout is active
   * @returns {boolean} True when mobile navigation should be used
   */
  isMobileLayout() {
    return this.mobileLayoutQuery.matches;
  }

  /**
   * Loads a tab background only when the desktop layout can display it
   * @param {Element} category - The tab panel whose background should be loaded
   */
  loadBackground(category) {
    if (this.isMobileLayout() || category.style.backgroundImage || !category.dataset.backgroundUrl) return;

    category.style.backgroundImage = `url(${JSON.stringify(category.dataset.backgroundUrl)})`;
    category.style.backgroundRepeat = "no-repeat";
    category.style.backgroundSize = "contain";
  }

  /**
   * Records the beginning of a primary pointer gesture
   * @param {PointerEvent} event - Pointer start event
   */
  handleSwipeStart(event) {
    const isUnsupportedPointer = !event.isPrimary || (event.pointerType === "mouse" && event.button !== 0);

    if (!this.isMobileLayout() || isUnsupportedPointer) {
      this.resetSwipeGesture();
      return;
    }

    this.swipeStartX = event.clientX;
    this.swipeStartY = event.clientY;
  }

  /**
   * Switches tabs after a deliberate horizontal swipe
   * @param {PointerEvent} event - Pointer end event
   */
  handleSwipeEnd(event) {
    if (!this.isMobileLayout() || !event.isPrimary || this.swipeStartX === null || this.swipeStartY === null) {
      this.resetSwipeGesture();
      return;
    }

    const horizontalDistance = event.clientX - this.swipeStartX;
    const verticalDistance = event.clientY - this.swipeStartY;
    const isHorizontalSwipe = Math.abs(horizontalDistance) >= 50
      && Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.25;

    this.resetSwipeGesture();
    if (!isHorizontalSwipe) return;

    const tabsCount = this.externalRefs.categories.length;
    const nextTab = horizontalDistance < 0
      ? (this.currentTabIndex + 1) % tabsCount
      : (this.currentTabIndex - 1 + tabsCount) % tabsCount;

    this.activateByKey(nextTab);
  }

  /**
   * Clears the current swipe gesture
   */
  resetSwipeGesture() {
    this.swipeStartX = null;
    this.swipeStartY = null;
  }

  /**
   * Handles mouse wheel scrolling for tab navigation
   * @param {WheelEvent} event - The wheel event object
   */
  handleWheelScroll(event) {
    if (!event) return;
    if (this.isMobileLayout()) return;

    const { target } = event;
    const wheelDelta = event.deltaY ?? -event.wheelDelta;

    if (target.shadow && target.shadow.activeElement) return;
    if (wheelDelta === 0) return;

    clearTimeout(this.wheelUnlockTimer);
    this.wheelUnlockTimer = window.setTimeout(() => {
      this.wheelNavigationLocked = false;
    }, 75);

    if (this.wheelNavigationLocked) return;
    this.wheelNavigationLocked = true;

    let activeTab = -1;
    this.refs.tabs.forEach((tab, index) => {
      if (tab.getAttribute("active") === "") {
        activeTab = index;
      }
    });

    if (wheelDelta < 0) {
      this.activateByKey((activeTab + 1) % (this.refs.tabs.length - 1));
    } else {
      this.activateByKey(activeTab - 1 < 0 ? this.refs.tabs.length - 2 : activeTab - 1);
    }
  }

  /**
   * Handles keyboard shortcuts for tab navigation
   * @param {KeyboardEvent} event - The keyboard event object
   */
  handleKeyPress(event) {
    if (!event) return;

    let { target, key } = event;

    if (target.shadow && target.shadow.activeElement) return;

    // Activate tab by number key (1-5)
    if (Number.isInteger(parseInt(key)) && key <= this.externalRefs.categories.length) {
      this.activateByKey(key - 1);
    }
  }

  /**
   * Activates a tab by its index
   * @param {number} key - The tab index to activate
   */
  activateByKey(key) {
    const tabIndex = Number(key);
    const tabsCount = this.externalRefs.categories.length;

    if (!Number.isInteger(tabIndex) || tabIndex < 0 || tabIndex >= tabsCount) return;
    this.currentTabIndex = tabIndex;

    const category = this.externalRefs.categories[tabIndex];
    this.loadBackground(category);

    this.activate(this.refs.tabs, this.refs.tabs[tabIndex]);
    this.activate(this.externalRefs.categories, category);

    this.refs.tabs.forEach((tab, index) => {
      if (index >= tabsCount) return;

      const isActive = index === tabIndex;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  /**
   * Creates tab elements based on categories count
   */
  createTabs() {
    const categoriesCount = this.externalRefs.categories.length;

    for (let i = 0; i < categoriesCount; i++) {
      const tab = document.createElement("li");
      const tabName = CONFIG.tabs[i]?.name ?? String(i + 1);

      tab.setAttribute("role", "tab");
      tab.setAttribute("tab-index", i);
      tab.setAttribute("aria-label", `Open ${tabName} tab`);
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.setAttribute("tabindex", i === 0 ? "0" : "-1");
      if (i === 0) tab.setAttribute("active", "");

      this.refs.indicator.appendChild(tab);
    }

    const activeIndicator = document.createElement("li");
    activeIndicator.setAttribute("aria-hidden", "true");
    this.refs.indicator.appendChild(activeIndicator);
  }

  /**
   * Activates a specific item by setting active attribute
   * @param {NodeList} target - Collection of elements to process
   * @param {Element} item - The specific item to activate
   */
  activate(target, item) {
    target.forEach((i) => i.removeAttribute("active"));
    item.setAttribute("active", "");
  }

  /**
   * Component lifecycle callback when element is connected to DOM
   */
  connectedCallback() {
    this.render().then(() => {
      this.createTabs();
      this.setEvents();
      this.openLastVisitedTab();
    });
  }
}
// Search component, supports multiple search engines
class Search extends Component {
  refs = {
    search: '#search',
    input: '#search input[type="text"]',
    engines: '.search-engines',
    close: '.close',
  };

  /**
   * Initialise the search component with configured engines
   */
  constructor() {
    super();

    this.engines = CONFIG.search.engines;
  }

  /**
   * Define the style for the search component using the current palette
   * @returns {string} CSS styles for the search component
   */
  style() {
    return `
      #search {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(100% - 2px);
          height: 100%;
          background: ${CONFIG.palette.mantle}cc;
          z-index: 99;
          visibility: hidden;
          top: -100%;
          backdrop-filter: blur(5px);
          transition: all .2s ease-in-out;
      }

      #search.active {
          top: 0;
          visibility: visible;
      }

      #search div {
          position: relative;
          width: 100%;
      }

      #search input {
          border: 0;
          outline: 0;
          width: 100%;
          box-shadow: inset 0 -2px ${CONFIG.palette.crust};
          padding: .5em 0;
          background: none;
          font: 500 22px 'Roboto', sans-serif;
          letter-spacing: 1px;
          color: ${CONFIG.palette.lavender};
      }

      #search input:focus {
          box-shadow: inset 0 -2px ${CONFIG.palette.lavender};
      }

      #search input::selection {
          background: ${CONFIG.palette.overlay2};
          color: ${CONFIG.palette.base};
      }

      #search .close {
          background: 0;
          border: 0;
          outline: 0;
          color: ${CONFIG.palette.lavender};
          position: absolute;
          right: 0;
          cursor: pointer;
          top: 15px;
      }

      #search .close:hover {
          filter: opacity(.5);
      }

      .search-engines {
          list-style: none;
          color: ${CONFIG.palette.overlay1};
          display: flex;
          padding: 0;
          top: 50px;
          left: 0;
          margin: 1em 0 0 0;
      }

      .search-engines li p {
          cursor: default;
          transition: all .2s;
          font-size: 12px;
          font-family: 'Roboto', sans-serif;
      }

      .search-engines li {
          margin: 0 1em 0 0;
      }

      .search-engines li.active {
          color: ${CONFIG.palette.lavender};
          font-weight: 700;
      }
    `;
  }

  /**
   * Import required fonts and icons for the search display
   * @returns {Array<string>} Array of resource imports
   */
  imports() {
    return [
      this.getResource('fonts', 'roboto'),
      this.getResource('icons', 'material'),
    ];
  }

  /**
   * Render the search overlay template
   * @returns {string} HTML template for the search component
   */
  template() {
    return `
        <div id="search">
          <div>
            <input type="text" spellcheck="false" placeholder="search">
            <button class="close"><i class="material-icons">&#xE5CD;</i></button>
            <ul class="search-engines"></ul>
          </div>
        </div>
    `;
  }

  /**
   * Load available search engines into the interface
   * @returns {void}
   */
  loadEngines() {
    const html = Object.keys(this.engines)
      .map((key) => `<li><p title="${this.engines[key][1]}">!${key}</p></li>`)
      .join('');
    this.refs.engines.innerHTML = html;
  }

  /**
   * Activate the search overlay
   * @returns {void}
   */
  activate() {
    this.refs.search.classList.add('active');
    this.refs.input.scrollIntoView();
    setTimeout(() => this.refs.input.focus(), 100);
  }

  /**
   * Deactivate the search overlay
   * @returns {void}
   */
  deactivate() {
    this.refs.search.classList.remove('active');
  }

  /**
   * Check if the input is a valid URL
   * @param {string} input - The input string to check
   * @returns {boolean} True if the input is a valid URL
   */
  isValidUrl(input) {
    const urlPatterns = [
      // Domain with TLD (e.g., google.com, github.com)
      /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
      // Full URLs with protocol
      /^https?:\/\/.+/,
      // URLs with www prefix
      /^www\..+/,
      // IP addresses
      /^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)?$/,
      // localhost with optional port
      /^localhost(:\d+)?(\/.*)?$/
    ];

    return urlPatterns.some(pattern => pattern.test(input.trim()));
  }

  /**
   * Format URL for navigation
   * @param {string} url - The URL to format
   * @returns {string} Properly formatted URL with protocol
   */
  formatUrl(url) {
    url = url.trim();

    if (/^https?:\/\//.test(url)) {
      return url;
    }

    if (/^www\./.test(url)) {
      return `https://${url}`;
    }

    if (/^localhost/.test(url) || /^(\d{1,3}\.){3}\d{1,3}/.test(url)) {
      return `http://${url}`;
    }

    return `https://${url}`;
  }

  /**
   * Handle search input and engine selection
   * @param {KeyboardEvent} event - The keyboard event from user input
   * @returns {void}
   */
  handleSearch(event) {
    const { target, key } = event;

    let args = target.value.split(' ');
    let prefix = args[0];

    const defaultEngineKey = CONFIG.search.default || 'd';
    let engine = this.engines[defaultEngineKey]?.[0] || this.engines['d'][0];

    if (key === 'Escape') {
      this.deactivate();
      return;
    }

    // Highlight active engine based on prefix
    this.refs.engines.childNodes.forEach((node) => {
      if (prefix === node.firstChild.innerHTML)
        node.classList.add('active');
      else
        node.classList.remove('active');
    });

    if (key === 'Enter') {
      const fullInput = target.value.trim();

      if (this.isValidUrl(fullInput)) {
        window.location = this.formatUrl(fullInput);
        return;
      }

      // Check for engine prefix (e.g., !g for Google)
      if (prefix.indexOf('!') === 0) {
        engine = this.engines[prefix.substr(1)][0];
        args = args.slice(1);
      }

      window.location = engine + encodeURI(args.join(' '));
    }
  }

  /**
   * Set up event listeners for search interactions
   * @returns {void}
   */
  setEvents() {
    this.refs.search.onkeyup = (e) => this.handleSearch(e);
    this.refs.close.onclick = () => this.deactivate();
  }

  /**
   * Initialise the search component when connected to DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render().then(() => {
      this.loadEngines();
      this.setEvents();
    });
  }
}
// Registers all startpage components as custom elements
// Components listed as disabled in the configuration are skipped

const components = {
  "search-bar": Search,
  "status-bar": Statusbar,
  "current-time": Clock,
  "weather-forecast": Weather,
  "tabs-list": Tabs,
};

Object.keys(components).forEach((componentName) => {
  if (!CONFIG.disabled.includes(componentName)) customElements.define(componentName, components[componentName]);
});
