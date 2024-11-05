// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ROQ Shop System Knowledge Base',
  tagline: 'Knowledge base on commercial and open-source shop systems.',
  favicon: 'img/roq.gif',

  // Set the production url of your site here
  url: 'https://shopsystems.roq.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'roqtech', // Usually your GitHub org/user name.
  projectName: 'shopsystems', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/roqtech/shopsystems/blob/main/',
        },
        gtag: {
          trackingID: 'G-CS1JFSZ5FW',
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/roqtech/shopsystems',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    'docusaurus-plugin-image-zoom',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Shop System Knowledge Base',
        logo: {
          alt: 'Shop System Knowledge Base',
          src: 'img/roq.gif',
        },
        items: [

            {
                href: 'https://www.roq.tech/',
                label: 'ROQ.tech - Consulting Boutique',
                position: 'right',
            }

        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Vendor',
            items: [
              {
                html: 'The vendor of this internet presence is in the legal sense:',
              },
              {
                html: 'ROQ Technology GmbH',
              },
              {
                html: 'Perler Str. 26 13088 Berlin',
              },
            ],
          },
          {
            title: 'Representative',
            items: [
              {
                html: 'ROQ Technology GmbH is legally represented by its founders Fabian Wesner and Tim Niemeier',
              }
            ],
          },
          {
            title: 'Content Responsibility',
            items: [
              {
                html: 'Responsible for content within the meaning of section 55 (2) RStV (Rundfunkstaatsvertrag): Tim Niemeier',
              },
              {
                href: '/privacy',
                label: '→ Privacy Policy',
              }
            ],
          },
          {
            title: 'Commercial Registry',
            items: [
              {
                html: 'Amtsgericht Charlottenburg HRB 220113',
              },
              {
                html: 'USt-ID: DE335594684',
              },
              {
                html: 'contact@roq.tech +49178-4047432',
              }
            ],
          }
        ],
        copyright: ` `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      zoom: {
        selector: '.markdown img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          margin: 80,
        }
      }
    }),

  scripts: [
    {
    src: '//static.getclicky.com/js',
        'data-id': '101467319',
    async: true
    },
  ],


};

export default config;
