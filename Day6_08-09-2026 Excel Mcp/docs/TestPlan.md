# Sauce Demo Test Plan

## 1. Introduction

This Test Plan defines the quality assurance strategy for Sauce Demo (`https://www.saucedemo.com`). It covers functional, UI, negative, workflow, and session-related testing of the customer purchase journey, with Playwright automation as the primary regression mechanism.

## 2. Project Overview

Sauce Demo is an e-commerce demonstration application that allows authenticated users to browse inventory, view product details, manage a cart, complete checkout, and log out. The project will use a Playwright and TypeScript automation framework designed around Page Object Model (POM), JSON data-driven test data, reusable fixtures, utilities, a Base Page, a Base Test, Playwright Test Runner, HTML reporting, Allure reporting, and screenshot capture on failure.

## 3. Objectives

- Verify that critical user journeys work reliably for supported test users.
- Detect functional, validation, session, and navigation defects before release.
- Build a maintainable automated regression suite with clear requirements traceability.
- Provide actionable quality metrics and execution evidence to stakeholders.

## 4. Scope

Testing will cover the public Sauce Demo web application in Chrome, focusing on the authenticated shopping and checkout experience.

## 5. In Scope

- Login, error messages, session validation, and logout.
- Inventory display, sorting, product details, cart operations, and menu navigation.
- Checkout information, overview, completion, and end-to-end purchase flow.
- Positive, negative, boundary, validation, UI, workflow, and end-to-end tests.
- Playwright execution, reporting, screenshots on failure, and JSON-driven test execution.

## 6. Out Of Scope

- Payment gateway processing, production data, backend API contracts, performance benchmarking, security penetration testing, accessibility certification, and non-Chrome cross-browser certification.

## 7. Test Items

- Sauce Demo login page.
- Inventory, product details, cart, checkout, and checkout-complete pages.
- Burger menu, logout action, browser session, URLs, and validation/error messages.

## 8. Features To Be Tested

- Authentication for `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, and `visual_user`.
- Inventory rendering, product metadata, sort orders, product navigation, and responsive UI checks.
- Add, remove, persistence, quantity, price, and navigation behavior in the cart.
- Required-field validation, checkout calculations, order completion, and cancellation.
- Authorization behavior for direct URL access and session behavior after logout.

## 9. Features Not To Be Tested

- User administration, password reset, account registration, real payment authorization, fulfillment, email notifications, and third-party integrations.

## 10. Test Approach

Risk-based testing will prioritize login, cart integrity, checkout completion, and authorization. Tests will use deterministic test data and independent setup/cleanup where possible. Exploratory checks may supplement automation for known special-user behavior and visual anomalies.

## 11. Functional Testing Strategy

Testers will verify expected navigation, data display, field validation, state transitions, totals, and error handling. Negative tests will exercise invalid credentials, empty fields, invalid checkout data, direct URL access, and browser navigation after logout. Boundary coverage will include minimum valid field values and whitespace handling where supported.

## 12. Automation Testing Strategy

Playwright with TypeScript is the automation platform. POM classes will encapsulate locators and page actions; a Base Page will provide common waits and navigation. Base Test and Playwright fixtures will supply pages, authenticated setup, and shared lifecycle logic. JSON data files will hold users, checkout data, products, and expected messages. Reusable utilities will support data loading, assertions, logging, and test artifacts. The Playwright Test Runner will execute tagged Smoke, Sanity, Regression, and End-to-End suites in Chrome. HTML and Allure reports will publish results, and failure screenshots will be retained as evidence.

## 13. Test Levels

- System testing: feature behavior through the browser UI.
- Integration testing: page-to-page journeys, cart state, and checkout flow.
- End-to-end testing: login through order confirmation and logout.
- Regression testing: repeatable coverage after framework or application changes.

## 14. Test Types

- Functional, negative, validation, boundary, UI, navigation, session, workflow, smoke, sanity, regression, and end-to-end tests.

## 15. Test Environment

- AUT: `https://www.saucedemo.com`.
- Primary browser: current stable Google Chrome.
- Automation runtime: Node.js, Playwright, TypeScript, Playwright Test Runner.
- Reporting: Playwright HTML report and Allure report.
- Execution: local developer workstation and CI pipeline when available.

## 16. Test Data Strategy

JSON files will store credentials, checkout inputs, expected validation messages, and product data. Test data will be versioned with the tests, non-production, and separated by valid, invalid, boundary, and special-user categories. The common password is `secret_sauce`; credentials must not be logged in execution output beyond approved test artifacts.

## 17. Entry Criteria

- Test environment and Chrome are available.
- Required test users and test data are accessible.
- Build or deployment is complete and smokeable.
- POM locators, fixtures, and reporting configuration are available for automated execution.

## 18. Exit Criteria

- All planned Smoke and Sanity tests pass.
- No open Critical or High severity defects remain without documented approval.
- At least 95% of planned automated regression cases execute successfully, or exceptions are accepted.
- Reports, screenshots for failures, and defect status are published.

## 19. Suspension Criteria

Testing may be suspended for unavailable AUT, widespread environment failure, blocked authentication, data corruption, or a defect that prevents execution of core user journeys.

## 20. Resumption Criteria

Testing resumes when the blocking issue is resolved, the environment is stable, impacted data is restored, and a focused smoke suite confirms the application is testable.

## 21. Risks

| Risk | Impact | Likelihood |
| --- | --- | --- |
| Shared demo environment instability | High | Medium |
| Dynamic UI or locator changes | Medium | Medium |
| Special-user behavior causes non-determinism | Medium | Medium |
| External application changes without notice | High | Medium |
| Test data/session contamination | Medium | Low |

## 22. Risk Mitigation Plan

| Risk | Mitigation |
| --- | --- |
| Environment instability | Retry only known transient failures, capture evidence, and report outages promptly. |
| Locator changes | Use role, label, and stable data-test locators through POM classes. |
| Non-deterministic users | Isolate special-user tests, use explicit waits, and classify known behavior. |
| Application changes | Run Smoke suite on each deployment and maintain regression baselines. |
| State contamination | Create independent test setup, clear session state, and avoid shared cart assumptions. |

## 23. Deliverables

- Test Plan document.
- Test scenario and test case workbooks.
- JSON test-data files and POM-based Playwright test implementation.
- Playwright HTML report, Allure report, execution summary, failure screenshots, and defect log.

## 24. Defect Management Process

Defects will be logged with summary, environment, reproducible steps, expected and actual results, severity, priority, screenshots/logs, and linked scenario or test case ID. QA triages defects with the project team, retests fixes, and closes only after verification. Severity levels are Critical, High, Medium, and Low.

## 25. Resource Requirements

- QA Lead/Test Architect for strategy, review, and metrics.
- QA Automation Engineer for Playwright framework and suite implementation.
- Manual/functional QA Engineer for exploratory and acceptance support.
- Developer and product owner support for triage and acceptance decisions.
- CI agent with Node.js, Chrome, network access, and report storage.

## 26. Assumptions

- Sauce Demo remains available and its public test users remain valid.
- Chrome is the primary supported execution browser.
- Test users have the documented password and no MFA requirement.
- Product inventory and prices may change, so assertions will use controlled expected data where stability permits.

## 27. Dependencies

- Sauce Demo availability and network connectivity.
- Playwright, Node.js, TypeScript, browser binaries, and report integrations.
- Approved JSON data files, valid credentials, and CI artifact storage.

## 28. Reporting & Metrics

Daily or per-run reports will include planned/executed/pass/fail/blocked counts, pass rate, defect counts by severity, automation coverage, suite duration, flaky-test rate, requirement traceability, and links to HTML/Allure reports and screenshots. The core pass-rate metric is Passed / Executed x 100.

## 29. Approval Matrix

| Role | Responsibility | Approval |
| --- | --- | --- |
| QA Lead | Test strategy, coverage, exit recommendation | Required |
| Test Architect | Automation design and maintainability | Required |
| Product Owner | Scope and acceptance criteria | Required |
| Engineering Lead | Technical readiness and defect disposition | Required |
| Project Manager | Schedule, risk, and release decision | Required |
