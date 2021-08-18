const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');
const httpAuth = require('@actions/http-client/auth');


/**
 * Determines whether the provided status code indicates a successful response.
 * @param {string} statusCode 
 * @returns {boolean} True when the status code should be considered successful.
 */
function isStatusCodeSuccess(statusCode) {
    if (!statusCode) {
        return false
    }
    
    return statusCode >= 200 && statusCode < 300
}


/**
 * The main run function.
 */
async function run() {
  try {
    // Fetch of action inputs
    const githubToken = core.getInput('github-token');
    const maxArtifacts = parseInt(core.getInput('max-artifacts'), 10);
    if (maxArtifacts < 0 || !Number.isInteger(maxArtifacts)) {
      throw 'Format of "maxArtifacts" is wrong!'
    }

    // Preparation of request
    const listArtifactsUrl = `https://api.github.com/repos/${process.env["GITHUB_REPOSITORY"]}/actions/artifacts?per_page=100`;   
    let client = new http.HttpClient('github-API-client', [
      new httpAuth.BearerCredentialHandler(githubToken)
    ]);

    // API-Call
    const response = await client.get(listArtifactsUrl, {
      'Accept': 'application/vnd.github.v3+json'
    });
    const body = await response.readBody();
    console.log(body);

    // Processing of the results and removal of artifacts
    if (isStatusCodeSuccess(response.message.statusCode)) {
      let data = JSON.parse(body);

      if (data['total_count'] <= maxArtifacts) {
        console.log("There are less artifacts in this repository than the maximum allowed number.");
      } else {
        let artifacts = data["artifacts"];
        artifacts.sort(function(a, b) {
          const date_a = new Date(a['updated_at']);
          const date_b = new Date(b['updated_at']);

          return date_a - date_b;
        });

        console.log(JSON.stringify(artifacts));
      }
    } else {
      throw `Call to API was not successful (Code: ${response.message.statusCode})`
    }

  } catch (error) {
    core.error(error.message);
    core.setFailed(error.message);
  }
}


run();