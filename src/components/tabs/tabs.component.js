
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
                  calc(106px + env(safe-area-inset-bottom));
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
              position: fixed !important;
              z-index: 10;
              right: auto !important;
              bottom: calc(20px + env(safe-area-inset-bottom));
              left: 50% !important;
              width: min(calc(100% - 24px), 248px);
              height: 64px;
              margin: 0 !important;
              overflow: visible;
              border: 0;
              border-radius: 0;
              background: transparent;
              box-shadow: none;
              -webkit-backdrop-filter: none;
              backdrop-filter: none;
              transform: translateX(-50%);
          }

          status-bar::before {
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
