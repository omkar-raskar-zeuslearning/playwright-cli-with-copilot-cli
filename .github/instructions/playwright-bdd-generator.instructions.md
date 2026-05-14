# .github/instructions/playwright-bdd-generator.instructions.md

# Project: Playwright BDD Test Suite

## Stack
- playwright-bdd (BDD layer)
- @playwright/test (runner)
- TypeScript

---

# Your job when asked to generate tests for a URL

## Phase 1 — Explore with playwright-cli

1. Open the URL using:
   `playwright-cli open <url>`

2. Take a snapshot:
   `playwright-cli snapshot`

3. Read the YAML snapshot file to understand page structure

4. Navigate through all key flows:
   - forms
   - buttons
   - nav links

5. Take screenshots after major interactions

6. Note:
   - interactive elements
   - refs
   - labels
   - ARIA roles

---

## Phase 2 — Write Feature Files

- Create:
  `features/<page-name>.feature`

- Write realistic Gherkin scenarios

- Cover:
  - happy paths
  - edge cases
  - error states

- Use human-readable business language

---

## Phase 3 — Write Step Definitions

- Create:
  `steps/<page-name>.steps.ts`

- Import:
  `createBdd` from `playwright-bdd`

- Map all Given/When/Then steps

- Use exact locators discovered from snapshots

- Prefer:
  - page.getByRole()
  - page.getByLabel()
  - page.getByText()

- Prefer ARIA selectors over CSS selectors

---

## Phase 4 — Verify

Run:

```bash
npx bddgen
npx playwright test --reporter=list