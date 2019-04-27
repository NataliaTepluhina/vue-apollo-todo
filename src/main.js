import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import '@fortawesome/fontawesome-free/css/all.css';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import { typeDefs, resolvers } from './resolvers';

Vue.use(VueApollo);

Vue.config.productionTip = false;

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  resolvers,
  typeDefs,
});

cache.writeData({
  data: {
    todoItems: [
      {
        __typename: 'Item',
        id: 'dqdBHJGgjgjg',
        text: 'test',
        done: true,
      },
    ],
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app');
