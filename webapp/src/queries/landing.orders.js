import gql from 'graphql-tag';

function GQL_TEMPLATE(type = 'query') {
  return gql`
    ${type} ordersBetween($after: timestamptz!, $before: timestamptz!) {
      orders(
        where: {
          detail_type: { _eq: "GoodCity" },
          state: { _neq: "draft" },
          order_transport: {
            scheduled_at: {
                _gt: $after,
                _lt: $before
              }
            }
          }
      ) {
        id
        code
        state
        people_helped
        updated_at
        order_transport {
          scheduled_at
        }
      }
    }
  `;
}

export default {
  build(opts = {}) {
    const {
      variables = {},
      live = true
    } = opts;

    return function () {
      return {
        query: GQL_TEMPLATE('query'),
        variables,
        subscribeToMore: live && {
          document: GQL_TEMPLATE('subscription'),
          variables,
          updateQuery: (previousResult, { subscriptionData }) => {
            return subscriptionData.data;
          }
        }
      }
    }
  }
};