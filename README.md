# St. Mary Catholic Church, Obe — Parish Website

A responsive parish website for **St. Mary Catholic Church, Obe Quarter, Sapele Road, Benin City, Edo State, Nigeria**, a parish of the Catholic Archdiocese of Benin City.

The website helps parishioners and visitors access parish information, Mass and sacrament schedules, catechism resources, ministries, daily homilies, and online service entry points.

**Live Website:** https://www.stmaryobe.org

## Overview

The St. Mary Catholic Church website serves as a digital information hub for the parish community.

It presents the parish's mission and contact details, shares worship and sacrament schedules, and provides navigation to information about catechism, ministries, homilies, Mass booking, and giving.

The site is designed to make important parish information easier to find for both parishioners and visitors.

## Features

### Parish Information
- Homepage introducing St. Mary Catholic Church.
- Parish location and contact information.
- Information about the parish and its Catholic community.
- Navigation to key parish resources.
- Welcome message from the parish priest.

### Mass and Sacrament Information
- Mass schedule information.
- Eucharistic adoration schedule.
- Confession schedule.
- Links to Mass information and related parish resources.

### Faith and Community Resources
- Catechism section.
- Parish ministries section.
- Daily readings and homily content.
- Links to watch homilies and access past homilies.
- Information about parish life and spiritual activities.

### Online Service Entry Points
- Mass booking navigation.
- Online giving entry point.
- Contact and enquiry links.

The README describes the public features and navigation visible on the website. Any booking, payment, or other transactional behaviour should be confirmed against the corresponding implementation.

## Technology Stack

### Frontend
- **Next.js 16** — React framework and application routing.
- **React 19** — Component-based user interfaces.
- **TypeScript** — Static typing.
- **Tailwind CSS** — Responsive styling.

### Backend and Data
- **Next.js API Routes** — Backend endpoints.
- **PostgreSQL** — Relational database.
- **Supabase** — Database and related backend services.
- **Prisma ORM** — Database access and schema management.
- **JWT** — Token-based authentication where implemented.
- **bcrypt** — Password hashing.
- **Zod** — Data validation.

### Additional Services
- **Upstash Redis** — Redis-based caching or other configured data operations.
- **Resend** — Email delivery.

### Development and Deployment
- Git and GitHub
- Vercel
- Google Search Console

## SEO and Accessibility Considerations

The website provides structured navigation to help visitors find parish information and uses a responsive layout for different screen sizes.

SEO work includes metadata and Google Search Console monitoring. For a production website, important follow-up checks include page titles and descriptions, indexability, canonical URLs where appropriate, mobile usability, and page performance.

Accessible headings, meaningful link labels, keyboard navigation, and appropriate alternative text for informative images should be maintained throughout the site.

## Security Considerations

Security-related technologies include authentication, password hashing, and input validation where implemented.

For production environments:
- Keep database credentials, API keys, and authentication secrets out of source control.
- Use environment variables for private configuration.
- Validate submitted data on the server.
- Enforce authorization for protected operations.
- Use secure authentication-cookie settings where cookies are used.
- Apply suitable rate limiting to sensitive endpoints.
- Verify the security and configuration of any booking, giving, or email integrations.

## Local Development

### Prerequisites

- Node.js version compatible with the project's Next.js version.
- npm or another package manager supported by the repository.
- Access to the configured PostgreSQL database.
- Environment variables required by the application.

### Setup

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   cd YOUR_REPOSITORY_DIRECTORY
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   If the repository does not include `.env.example`, create the local environment file using the actual variable names expected by the code.

4. Configure the database connection and other required services.

5. Run the database setup commands specified by the repository's Prisma configuration and package scripts.

6. Start the development server using the configured development script. For a standard Next.js project:

   ```bash
   npm run dev
   ```

7. Open http://localhost:3000.

### Production Build

For a standard Next.js setup:

```bash
npm run build
```

Run the production server using the script configured in `package.json`, commonly:

```bash
npm run start
```

Follow the project's actual scripts and deployment configuration if they differ from these examples.

## Deployment

**Live Website:** https://www.stmaryobe.org

The project uses Vercel for deployment and Google Search Console for search visibility monitoring.

## Project Purpose

This project demonstrates the development of a parish website focused on clear information architecture, responsive design, faith resources, worship schedules, and online access to parish services.

## Developer

**Mary Umoize**  
GitHub: https://github.com/MaryGrace-lab

## Acknowledgements

Developed for St. Mary Catholic Church, Obe Quarter, Benin City, Edo State, Nigeria.

**Live Website:** https://www.stmaryobe.org
