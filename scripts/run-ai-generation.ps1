Write-Host "STEP 1 - Configure Model"
$model = "gpt-4.1"
Write-Host "Using model: $model"

Write-Host "STEP 2 - Add MCP Server"
copilot mcp add playwright-test --tools "*" -- npx playwright run-test-mcp-server
Write-Host "MCP server added: playwright-test"

Write-Host "STEP 3 - Run Copilot Agent"
$promptFile = "prompts/build-todo.txt"
$prompt = Get-Content $promptFile -Raw

copilot `
  --model $model `
  --agent playwright-bdd-generator `
  --prompt $prompt `
  --allow-all `
  --output-format text `
  --log-level info

Write-Host "STEP 4 - Git Status"
git status

Write-Host "STEP 5 - Commit Generated Changes"
$commitMessage = ($prompt `
  -replace "`r`n", " " `
  -replace "`n", " " `
  -replace "[^a-zA-Z0-9 ]", "" `
).Trim()

if ($commitMessage.Length -gt 60) {
  $commitMessage = $commitMessage.Substring(0, 60)
}
$commitMessage = "AI Generated: $commitMessage"

git add .
git diff --cached --quiet

if ($LASTEXITCODE -ne 0) {
  git commit -m $commitMessage
  Write-Host "Committed changes:"
  Write-Host $commitMessage
} else {
  Write-Host "No changes to commit"
}