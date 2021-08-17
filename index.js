const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');
const httpAuth = require('@actions/http-client/auth');


async function run() {
  try {
    const githubToken = core.getInput('github-token');
    const maxArtifacts = core.getInput('max-artifacts');

    const listArtifactsUrl = 'https://api.github.com/repos/beegy-dev/shaun/actions/artifacts';
        
    client = new http.HttpClient('action/artifact', [
	  new httpAuth.PersonalAccessTokenCredentialHandler(githubToken)
    ]);

    requestOptions = {
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