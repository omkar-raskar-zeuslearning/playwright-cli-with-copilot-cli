Write-Host "STEP 1 - Install Copilot CLI"

npm install -g @github/copilot

Write-Host "STEP 2 - Verify Copilot CLI"

copilot --version

Write-Host "STEP 3 - Configure Model"

$model = "claude-sonnet-4.5"

Write-Host "Using model: $model"

Write-Host "STEP 4 - Run Copilot Agent"

$promptFile = "prompts/build-todo.txt"

$prompt = Get-Content $promptFile -Raw

copilot `
  --model $model `
  --agent playwright-bdd-generator `
  --prompt $prompt `
  --allow-all `
  --output-format text

Write-Host "STEP 5 - Git Status"

git status

Write-Host "STEP 6 - Commit Generated Changes"

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
}
else {
  Write-Host "No changes to commit"
}