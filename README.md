# Delete oldest artifacts 

This GitHub Action deletes the oldest artifacts inside a repository. If the number of artifacts exceed the limit set in the action, the oldest artifacts will be removed until the limit is met.

## Inputs

### `github-token`

**Required** The GitHub token to authenticate against the GitHub API and access the artifacts in your repo.

### `max-artifacts`

**Required** The number of artifacts that should be kept. The oldest artifacts that exceed thi number will be removed. Default `10`.


### Example usage
```yml
steps:
  - name: Remove old artifacts
  uses: ChristianKraemerBeegy/example-action@v1.24
  with:
  	github-token: ${{ secrets.GITHUB_TOKEN }}
  	max-artifacts: 3
```