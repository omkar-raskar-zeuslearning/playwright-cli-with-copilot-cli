#!/bin/bash

set -e

echo "STEP 1 - Configure Model"

MODEL="gpt-4.1"

echo "Using model: $MODEL"

echo "STEP 2 - Ensure MCP Server Exists"

if copilot mcp list | grep -q "playwright-test"; then
  echo "MCP server already exists: playwright-test"
else
  copilot mcp add playwright-test --tools "*" -- npx playwright run-test-mcp-server
  echo "MCP server added: playwright-test"
fi

echo "STEP 3 - Run Copilot Agent"

PROMPT_FILE="prompts/build-todo.txt"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "Prompt file not found: $PROMPT_FILE"
  exit 1
fi

PROMPT=$(cat "$PROMPT_FILE")

copilot \
  --model "$MODEL" \
  --agent playwright-bdd-generator \
  --prompt "$PROMPT" \
  --allow-all \
  --output-format text \
  --log-level info

echo "STEP 4 - Git Status"

git status

echo "STEP 5 - Prepare Commit Message"

COMMIT_MESSAGE=$(echo "$PROMPT" \
  | tr '\n' ' ' \
  | sed 's/[^a-zA-Z0-9 ]//g' \
  | xargs)

COMMIT_MESSAGE=${COMMIT_MESSAGE:0:60}
COMMIT_MESSAGE="AI Generated: $COMMIT_MESSAGE"

echo ""
echo "Generated Commit Message:"
echo "$COMMIT_MESSAGE"

echo ""
echo "STEP 6 - Stage Changes"

git add .

if git diff --cached --quiet; then
  echo "No changes to commit"
  exit 0
fi

echo ""
echo "STEP 7 - Review Staged Changes"

git --no-pager diff --cached

echo ""
git commit -m "$COMMIT_MESSAGE"

echo ""
echo "Changes committed successfully"