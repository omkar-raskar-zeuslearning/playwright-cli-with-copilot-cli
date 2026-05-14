Write-Host "STEP 1 - Install Copilot CLI"

npm install -g @github/copilot

Write-Host "STEP 2 - Verify Copilot CLI"

copilot --help

Write-Host "STEP 3 - Run Copilot Agent"

$promptFile = "prompts/build-todo.txt"

$prompt = Get-Content $promptFile -Raw

copilot `
  --agent playwright-bdd-generator `
  --prompt $prompt `
  --allow-all

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

git commit -m $commitMessage