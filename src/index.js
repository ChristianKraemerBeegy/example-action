const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');
const httpAuth = require('@actions/http-client/auth');


async function run() {
  try {
    const githubToken = core.getInput('github-token');
    const maxArtifacts = core.getInput('max-artifacts');

    const listArtifactsUrl = `https://api.github.com/repos/${process.env["GITHUB_REPOSITORY"]}/actions/artifacts`;
        
    client = new http.HttpClient('action/artifact');

    requestOptions = {
      'Authorization': `Bearer ${githubToken}`,
  	  'Accept': 'application/vnd.github.v3+json'
    };

    const response = await client.get(listArtifactsUrl, requestOptions);
    const body = await response.readBody();
    console.log(body);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();