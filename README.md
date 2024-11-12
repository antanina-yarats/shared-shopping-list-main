# Shared Shopping List App

![Screenshot 1](https://cdn.glitch.global/7db13fed-b112-4a52-8c19-56b85f8cb62b/Screenshot%202024-11-12%20at%2013.06.32.png?v=1731409861142)
![Screenshot 2](https://cdn.glitch.global/7db13fed-b112-4a52-8c19-56b85f8cb62b/Screenshot%202024-11-12%20at%2013.08.02.png?v=1731409878476)
![Screenshot 3](https://cdn.glitch.global/7db13fed-b112-4a52-8c19-56b85f8cb62b/Screenshot%202024-11-12%20at%2013.09.36.png?v=1731409894198)

## Overview

This is a shared shopping list application that allows users to:
- Create multiple shopping lists
- Add items to each list
- Cross out (deactivate) collected items
- View items in alphabetical order with uncollected items shown first
- Keeps statistics of all created lists and items

The project is built with JavaScript, Deno, Docker, Docker Compose, PostgreSQL, Eta templates, and Playwright for testing.

## Features

- **Alphabetical Ordering**: Items appear alphabetically in each list, with uncollected items displayed first.
- **Easy Item Management**: Add, collect, or deactivate items within any shopping list.
- **Database**: Uses PostgreSQL to persist data.
- **Testing**: Integration and functionality tests written with Playwright.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/shared-shopping-list.git
   cd shared-shopping-list
