# Multiplayer Chess

A modern React + TypeScript chess client for real-time online play, local bot matches, friend interactions, and player profiles.

This frontend app connects to a Socket.IO backend and provides the game UI, authentication flow, matchmaking, chat, and dashboard experience.

## Features

- User registration, login, and session hydration
- Multiplayer matchmaking and live chess games
- Play against a bot
- Friend requests, invitations, and online status
- Match history and player statistics
- In-game chat and draw/resign controls
- Modern UI built with React, Vite, Tailwind, and shadcn-style components

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand for client state
- Wouter for routing
- Socket.IO client for live gameplay events
- Chess.js for legal move validation and board logic

## Project Structure

```text
src/
  app.tsx                # Route setup and app shell
  hooks/                 # Auth and game-related state stores
  lib/                   # API helpers, socket bindings, shared types
  pages/                 # Entrance, dashboard, and playboard screens
  components/            # Reusable UI and route guard components
```

## App Flow

1. Users access the entrance page to register or log in.
2. The client hydrates the current session on startup.
3. Authenticated users are routed to the dashboard.
4. From the dashboard, players can:
   - join multiplayer matchmaking
   - invite or manage friends
   - play against the bot
   - review profile data and match history
5. Active games render on the playboard page and receive move/chat updates through the Socket.IO layer.

## Installation

```bash
cd multiplayer-chess
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```
