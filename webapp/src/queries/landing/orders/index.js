import subscription from './subscription.gql'
import query from './query.gql'

export default {
  build(opts = {}) {
    const {
      variables = {},
      live = true
    } = opts;

    return function () {
      return {
        query,
        variables,
        subscribeToMore: live && {
          document: subscription,
          variables,
          updateQuery: (previousResult, { subscriptionData }) => {
            return subscriptionData.data;
          }
        }
      }
    }
  }
};