const core = require('@actions/core');
const github = require('@actions/github');

import { HttpClient } from '@actions/http-client';
import { BearerCredentialHandler } from '@actions/http-client/auth';

try {
  const githubToken = core.getInput('github-token');
  const maxArtifacts = core.getInput('max-artifacts');

  const listArtifactsUrl = 'https://api.github.com/repos/beegy-dev/shaun/actions/artifacts';
        
  client = new HttpClient('action/artifact', [
	new BearerCredentialHandler(githubToken)
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