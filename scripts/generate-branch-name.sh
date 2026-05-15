#!/bin/bash

set -e

MODEL="gpt-4.1"

BRANCH_NAME=$(copilot \
  -p "Generate a professional git branch name for this development request.

Development Request:
$PROMPT

Rules:
- Return ONLY the branch name
- Use kebab-case only
- No explanations
- No quotes
- No markdown
- Keep it concise
- Max 6 words
- Focus on feature intent, not implementation details

Examples:
bdd-login-flow
playwright-todo-tests
github-actions-ai-workflow
todo-delete-scenarios" \
  --model "$MODEL" \
  --allow-tool='shell(git:*)' \
  --no-ask-user \
  --output-format text \
  -s <<EOF
$PROMPT
EOF
)

BRANCH_NAME=$(echo "$BRANCH_NAME" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9-]/-/g' \
  | sed 's/--*/-/g' \
  | sed 's/^-//' \
  | sed 's/-$//')

BRANCH_NAME=$(echo "$BRANCH_NAME" | cut -c1-50)

BRANCH="ai-generated/$BRANCH_NAME"

echo "Using branch: $BRANCH"

git checkout -b "$BRANCH"

echo "BRANCH_NAME=$BRANCH" >> "$GITHUB_ENV"