# Saucedemo Playwright Framework

## Overview
UI automation framework for the Saucedemo e-commerce application, covering authentication, shopping cart management, checkout flow, and inventory sorting using Playwright and TypeScript.

## Test Strategy
Tests are organised into three categories:
- **Smoke** - Verify core business flows work before each release
- **Regression** - Verify existing functionality after code changes
- **Negative** - Verify error handling and validation scenarios

## Tech Stack
- Playwright
- TypeScript
- GitHub Actions

## Project Structure
- `pages/` - Page Object classes
- `flows/` - Cross-page user journey flows
- `fixtures/` - Playwright fixtures for test setup
- `tests/` - Test files
- `data/` - Test data
- `storageState/` - Authentication state

## Test Coverage

### Auth Tests
- Logout
- Locked user login

### Cart Tests
- Add item to cart
- Remove item from cart
- Multiple items cart management
- Cart badge count

### Checkout Tests
- Full checkout flow
- First name validation
- Last name validation
- Zip code validation

### Sort Tests
- Sort by price low to high
- Sort alphabetically A to Z

## Run Tests
npm install
npx playwright install
npx playwright test

# Run with HTML report
npx playwright test --reporter=html