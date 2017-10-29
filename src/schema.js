/*
 * Copyright (C) 2017 Adam Faryna <adamfaryna@appdy.net>
 *
 * Distributed under terms of the BSD 2-Clause license.
 */

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const Api = require('./services/api');

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  description: '...',
  fields: () => ({
    login: { type: GraphQLString, resolve: org => org.login },
    description: { type: GraphQLString, resolve: org => org.description },
    avatarUrl: { type: GraphQLString, resolve: org => org.avatar_url }
  })
});

const RepositoryType = new GraphQLObjectType({
  name: 'Repository',
  description: '...',
  fields: () => ({
    name: { type: GraphQLString, resolve: repo => repo.name },
    private: { type: GraphQLBoolean, resolve: repo => repo.private },
    description: { type: GraphQLString, resolve: repo => repo.description },
    url: { type: GraphQLString, resolve: repo => repo.url }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',
  fields: () => ({
    fullName: { type: GraphQLString, resolve: user => user.name },
    location: { type: GraphQLString, resolve: user => user.location },
    bio: { type: GraphQLString, resolve: user => user.bio },
    blog: { type: GraphQLString, resolve: user => user.blog },
    hireable: { type: GraphQLBoolean, resolve: user => user.hireable },
    publicRepos: { type: GraphQLInt, resolve: user => user.public_repos },
    publicGists: { type: GraphQLInt, resolve: user => user.public_gists },
    followers: { type: GraphQLInt, resolve: user => user.followers },
    following: { type: GraphQLInt, resolve: user => user.following },
    avatarUrl: { type: GraphQLString, resolve: user => user.avatar_url },
    repositories: { type: new GraphQLList(RepositoryType), resolve: (root, args, {headers}) => Api.getRepos(headers) },
    organizations: { type: new GraphQLList(OrganizationType), resolve: (root, args, {headers}) => Api.getOrgs(headers) }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args, {headers}) => Api.getProfile(headers)
    }
  })
});

module.exports = new GraphQLSchema({ query: QueryType });
