import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

export const client = new ApolloClient({
	uri: 'https://living-elk-56.hasura.app/v1/graphql',
	cache: new InMemoryCache(),
	defaultOptions: defaultOptions,
	headers: {
		'content-type': 'application/json',
		'x-hasura-admin-secret': process.env.EXPO_PUBLIC_HASURA_SECRET ?? '',
	},
});
