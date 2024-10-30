# Playwright Automation: Sauce Demo Web App

This repository contains a suite of automated end-to-end tests for [Sauce Demo](https://www.saucedemo.com/) using Playwright. The tests cover major workflows in the application, organized by pages for maintainable and readable test code.

## Test Coverage

The tests are structured according to key sections of the application:

1. **Login Page**: Tests for user authentication and login validations.
2. **Product Page**: Verifies product listing, sorting, and product details.
3. **Shopping Cart Page**: Ensures item addition, removal, and cart operations.
4. **Checkout Workflow**: Covers checkout steps, including user info, order summary, and final order completion.

Each page has a dedicated **Page Object Model (POM)** file containing locators and helper methods to improve test readability and reduce code duplication.

## Continuous Integration

GitHub Actions is configured to automatically run all tests in this repository on every commit push, ensuring that new changes do not break existing functionality.

## Getting Started

Follow these steps to pull down the project, install dependencies, and run the tests locally.

### Prerequisites

- **Node.js** (v14 or above)
- **Git**

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd saucedemo-playwright-tests
   ```

2. **Installing Dependencies**
   ```bash
   npm install
   ```

### Running Tests

To run the automated tests, execute the following command in your terminal:

```bash
npx playwright test saucedemo.spec.ts
```

This command will run all tests defined in `saucedemo.spec.ts` using Playwright.

### Directory Structure

- **`/tests`**: Contains test scripts.
  - **`saucedemo.spec.ts`**: Main test file for Saucedemo.
- **`/pages`**: Contains POM files.
  - **`loginPage.ts`**: Page Object for the Login page.
  - **`productPage.ts`**: Page Object for the Product page.
  - **`cartPage.ts`**: Page Object for the Shopping Cart page.
  - **`checkoutPage.ts`**: Page Object for the Checkout Workflow.
    Each POM file includes page locators and helper methods that encapsulate page-specific functionality for easy and organized testing.

### Contributing

To contribute, please create a branch and open a pull request with a description of your changes. All tests will be automatically executed by GitHub Actions on your branch upon push.
