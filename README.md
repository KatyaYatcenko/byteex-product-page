# Byteex — Product Page

A responsive marketing page for **Byteex**, a sustainable loungewear brand. The page was recreated from the provided Figma design using React and renders its editable content from a headless CMS (Contentful), with a bundled JSON file as an automatic fallback.

## Table of Contents

* [Overview](#overview)
* [Technical Decisions](#technical-decisions)
* [Page Structure](#page-structure)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Content Management (Contentful)](#content-management-contentful)
* [Content Model](#content-model)
* [Git Workflow](#git-workflow)
* [Possible Improvements](#possible-improvements)

## Overview

The page separates presentation from content, allowing editable copy to be managed through Contentful without changing the React code.

The implementation consists of two main layers:

1. **Presentation** — React components and plain CSS that reproduce the Figma design, including the hero section, customer reviews, press logos, image galleries, brand story, benefit cards, FAQ accordion, environmental impact statistics, and final call to action.
2. **Content** — a single structured content object served either from Contentful or from `src/content.json`.

If Contentful is not configured, is unreachable, or returns an error, the page automatically falls back to the local JSON content so the application can still render normally.

## Technical Decisions

| Decision                                  | Rationale                                                                                                                                                                                                              |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 18 + Vite 5**                     | Provides a fast development environment and production build with minimal configuration. The page is composed of independent sections, so no router or state management library is required.                           |
| **Contentful via plain `fetch`**          | The application only needs a single read request for the product page, so using the Contentful SDK would add unnecessary bundle size and complexity.                                                                   |
| **One Contentful entry with JSON fields** | The whole page is represented by one `productPage` entry whose fields correspond to the structure of `src/content.json`.                                                                                               |
| **Local fallback + shallow merge**        | CMS content is merged with the local fallback. If the CMS is unavailable, the complete local version remains available.                                                                                                |
| **Images referenced by name**             | Content stores image names such as `grey` or `robe`, while the application resolves them to files in `public/img`. This keeps image references simple and allows images to be reordered without storing external URLs. |
| **Inline SVG for UI icons**               | Arrows, tick marks, and similar interface icons are rendered as inline SVG and use `currentColor`, allowing them to inherit CSS colors without additional requests.                                                    |
| **Plain CSS with design tokens**          | Colors, radii, and other repeated values are stored in CSS variables. Responsive typography uses `clamp()` without requiring a CSS framework.                                                                          |
| **Image loading optimization**            | Images use lazy loading and asynchronous decoding where appropriate. Hero images are loaded eagerly to avoid delaying the main visual content.                                                                         |
| **Accessible controls**                   | Interactive icon buttons use accessible labels, decorative icons are hidden from assistive technologies, and the FAQ accordion exposes its expanded state.                                                             |
| **Secrets stay out of Git**               | Contentful credentials are stored in a git-ignored `.env` file. Only `.env.example` is committed.                                                                                                                      |

## Page Structure

| Section   | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| Promo bar | Three short announcements covering shipping, returns, and the brand tagline.                     |
| Hero      | Main headline, three benefits, call to action, featured customer review, and photo collage.      |
| Press     | "As seen in" logo strip.                                                                         |
| Features  | Four brand values alongside an interactive photo slider with thumbnails and navigation controls. |
| Story     | Brand/founder story with three supporting images.                                                |
| Comfort   | Three benefit cards with a call to action and review count.                                      |
| Fans      | Customer photo grid and horizontally scrollable review carousel.                                 |
| FAQ       | Accordion with frequently asked questions and supporting photo collage.                          |
| Impact    | Environmental statistics covering CO₂, water, and energy savings.                                |
| Find      | Final call t                                                                                     |
