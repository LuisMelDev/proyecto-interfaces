import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch'
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://interfaces-backend.herokuapp.com/',
    fetch   
});

const authLink = setContext((_, { headers }) => {

    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    // console.log(token);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});


const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({
        addTypename: false
    }),
    link: authLink.concat( httpLink )
});

export default client;