/*
 * Copyright (C) 2017 Adam Faryna <adamfaryna@appdy.net>
 *
 * Distributed under terms of the BSD 2-Clause license.
 */

const fetch = require('node-fetch');

const GITHUB_API_BASE_URL = 'https://api.github.com';

const doFetch = (path, headers) => fetch(`${GITHUB_API_BASE_URL}${path}`, { headers }).then(res => res.json());

const GET_PROFILE_URI = `/user`;
const GET_ORGS_URI = `/user/orgs`;
const GET_REPOS_URI = `/user/repos`;

module.exports = {
	getProfile: headers => doFetch(GET_PROFILE_URI, headers),
  getOrgs: headers => doFetch(GET_ORGS_URI, headers),
  getRepos: headers => doFetch(GET_REPOS_URI, headers)
};
