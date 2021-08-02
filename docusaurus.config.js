const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  //plugins: ["@docusaurus/plugin-google-gtag"],
  title: "Lithium JS",
  tagline: "A microframework for building CLIs",
  url: "https://lithum.js.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  //   favicon: 'img/favicon.ico',
  organizationName: "ranjithrd", // Usually your GitHub org/user name.
  projectName: "lithium", // Usually your repo name.
  themeConfig: {
    gtag: {
      trackingID: "UA-154616238-4",
      anonymizeIP: false, 
    },
    navbar: {
      title: "Lithium JS",
      //   logo: {
      //     alt: 'My Site Logo',
      //     src: 'img/logo.svg',
      //   },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://github.com/ranjithrd/lithium",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://npmjs.com/package/lithium-cli",
          label: "NPM",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
      copyright: `Copyright © ${new Date().getFullYear()} Ranjith RD. Documentation built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/ranjithrd/lithium/edit/gh-pages/docs/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/ranjithrd/lithium/edit/gh-pages/blog/',
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
