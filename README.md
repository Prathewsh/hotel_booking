# Raintech Hotel Booking Dashboard

> **Design Choice:** While the initial plan was to build this project using vanilla HTML, CSS, and JavaScript, **Svelte** was chosen as the framework. This approach eliminated the overhead of manually duplicating components (like headers and modals) across multiple files. Because Svelte compiles down to highly efficient vanilla JavaScript and offers a very simple, intuitive state management system, it allowed for much faster implementation of the core booking logic without overcomplicating the architecture.

## Core Features

- **Interactive Dashboard Overview**: A centralized command center featuring quick actions, operational statistics, and real-time revenue tracking.
- **Smart Check-in System**: 
  - Allows selecting check-in and check-out dates and picking an available room.
  - Dynamically filters the available rooms based on the number of guests.
  - Automatically calculates the total number of nights and total price dynamically before booking.
- **Guest Check-out & Invoicing**: 
  - Vacates occupied rooms seamlessly.
  - Generates a realistic, thermal-print style invoice receipt upon checkout, complete with an itemized breakdown, GST calculation, and an option to print.
- **Global Search Functionality**: Search globally for rooms by code or type via the header search bar (or `Ctrl/Cmd K`), which opens a dropdown of matches and directly opens the booking modal pre-filled with the selected room.
- **Interactive Floor Plan**: A visual representation of the hotel floors, indicating live room status (Available, Occupied, Dirty, Maintenance) via color-coded badges.

## Business Logic & Validation

The application handles rigorous client-side logic to ensure data integrity and prevent impossible states:

### 1. Date & Pricing Calculations
- **Duration**: Accurately calculates the exact number of nights between the check-in and check-out dates using timestamp differences.
- **Same-day Bookings**: Uses `Math.ceil()` logic so that partial days (day-use) are correctly billed as a minimum of 1 night.
- **Dynamic Total**: Real-time multiplication of calculated nights × the specific room's base price per night.

### 2. Validation & Edge Cases
- **Past Date Prevention**: HTML5 native `min` attributes and strict JavaScript validation ensure check-in dates cannot be in the past.
- **Chronological Ranges**: Strictly enforces that the check-out date is logically after the check-in date.
- **Clear Error Handling**: Rejects silent failures in favor of clear, descriptive UI error banners (e.g., "Check-out must be after check-in").

### 3. Room Constraints (Bonus Features)
- **Status Locks**: Only rooms with an `'available'` status can be booked. Attempting to book a room that is already "occupied" is prevented at both the UI dropdown level and the validation logic level.
- **Max Guest Filtering**: Dynamically finds the absolute maximum room capacity in the hotel and restricts the guest input. When a guest count is entered, it filters out any rooms that cannot accommodate that party size.

## Tech Stack & Architecture

- **Framework**: SvelteKit with Svelte 5 (leveraging modern `$state`, `$derived`, and `$effect` runes for fine-grained reactivity).
- **Styling**: TailwindCSS for rapid, utility-first UI design, custom animations, and responsive layouts.
- **State Management**: Centralized reactive state store (`roomStore.svelte.ts`) handling the mock room database, cumulative revenue tracking, and global UI modal states (`uiState`).
- **Data Source**: Hardcoded sample data mock (No external API or Database dependencies required).
