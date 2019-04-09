import test from './test'
import development from './development'
import staging from './staging'
import production from './production'

const ENV = process.env.NODE_ENV

const DEFAULT_CONFIG = {
  endpoints: {
    http: 'http://localhost:8080/v1alpha1/graphql',
    ws: 'ws://localhost:8080/v1alpha1/graphql',
  },
  env: {
    name: ENV,
    testing: ENV === 'test'
  }
};

const ENV_CONFIG = {
  test,
  development,
  staging,
  production
}[ENV];

if (!ENV_CONFIG) {
  throw `Unknown environment ${ENV}`
}

export default {
  ...DEFAULT_CONFIG,
  ...ENV_CONFIG
}



