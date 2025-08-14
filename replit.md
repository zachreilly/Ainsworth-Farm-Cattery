# Ainsworth Farm Cattery Website

## Overview

This is a full-stack web application for Ainsworth Farm Cattery, a family-run cat boarding business. The website serves as a digital presence for the cattery, featuring an availability calendar system, contact inquiry forms, and showcasing the facilities through an image gallery. The application is built with a React frontend and Express backend, designed to help potential customers check availability and get in touch with Caroline, the cattery owner.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture:

- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Forms**: React Hook Form with Zod validation for type-safe form handling

The component structure separates concerns with dedicated components for each page section (hero, about, availability, gallery, contact) and reusable UI components.

### Backend Architecture
The backend follows a RESTful API design using Express.js:

- **Server Framework**: Express.js with TypeScript
- **Route Organization**: Centralized route registration with separate route handlers
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: Vite integration for development with HMR support

### Data Storage Solutions
Currently implements an in-memory storage system with the following entities:

- **Users**: Basic user authentication structure (prepared for future admin features)
- **Availability**: Date-based availability tracking for the cattery
- **Contact Inquiries**: Customer contact form submissions

The system is designed with a storage abstraction layer to easily migrate to a PostgreSQL database later.

### Database Schema Design
Uses Drizzle ORM for type-safe database operations with PostgreSQL as the target database:

- **Schema Definition**: Centralized schema definitions in `shared/schema.ts`
- **Type Safety**: Zod integration for runtime validation matching database schema
- **Migration Ready**: Drizzle configuration set up for database migrations

### Authentication and Authorization
Basic authentication infrastructure is in place but not currently implemented:

- User table structure defined for future admin functionality
- Session management prepared with connect-pg-simple for PostgreSQL sessions

### API Structure
RESTful API endpoints for core functionality:

- `GET /api/availability/:year/:month` - Retrieve availability for specific month
- `POST /api/contact` - Submit customer contact inquiries

The API uses consistent error handling and response formatting, with request/response logging for development.

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and concurrent features
- **Express.js**: Backend web server framework
- **TypeScript**: Type safety across the entire application
- **Vite**: Build tool and development server with HMR

### Database and ORM
- **Drizzle ORM**: Type-safe database operations and schema management
- **Neon Database**: PostgreSQL-compatible serverless database (@neondatabase/serverless)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI primitives for accessibility
- **Shadcn/UI**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Form Handling and Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: Runtime type validation and parsing
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TSX**: TypeScript execution for development server

### Utility Libraries
- **TanStack Query**: Server state management and caching
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Conditional CSS class handling
- **Wouter**: Minimalist routing library for React