---
name: close-issue-after-test
description: Before running tests, use playwright mcp to test the ticket in the browser. When playwright tests are ok, close issues on github automatically after the tests pass, using the github cli. Never edits files. Take a look in folder /docs/issue-brief. 
---

Check the project. Do not edit, create or delete any files.

1. Get the issue number from the current branch name (`git branch --show-current`, format `issue-<nr>-<slug>`, e.g. `issue-1-add-book-tests` is issue 1). If the branch name does not match this format, stop, report it and do not close anything.
2. Read the issue brief `docs/issue-briefs/<nr>.md` for that number. If it does not exist, stop and report it.
3. Start the dev server with `npm run dev` in the background, unless the app already runs. Stop it again when you are done.
4. Use the `playwright` MCP to test the ticket from the brief in the browser.
5. Run `npm run check`.
6. Run `npm run test:run`.
7. Report whether the Playwright test, the check and the tests all passed. For every failure, name the file, the test or the line, and the reason in one sentence.
8. Only if everything passed, close the issue with `gh issue close <nr>` using the number from step 1. If anything failed, do not close the issue.
