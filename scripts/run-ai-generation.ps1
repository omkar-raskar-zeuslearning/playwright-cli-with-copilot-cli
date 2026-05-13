Write-Host "STEP 1 - Install Copilot CLI"

npm install -g @github/copilot

Write-Host "STEP 2 - Verify Copilot CLI"

copilot --help

Write-Host "STEP 3 - Read Prompt File"

$prompt = Get-Content prompts/build-todo.txt -Raw

Write-Host "STEP 4 - Run Copilot Agent"

copilot `
  --agent playwright-bdd-generator `
  --prompt $prompt `
  --allow-all

Write-Host "STEP 5 - Git Status"

git status