const dev = {
  host: 'https://api-staging.askimpulse.com:2083',
};

const local = {
  host: 'http://localhost:1337',
};

const beta = {
  host: 'https://api-staging.askimpulse.com:2053',
};

const prod = {
  host: 'https://api.askimpulse.com:443',
};

const envs: {[key: string]: any} = {
  prod,
  beta,
  dev,
  local,
};

const envKeyLengths = Object.values(envs).map(x => Object.keys(x).length);
if (!envKeyLengths.every(x => x === envKeyLengths[0])) {
  throw new Error(
    'At least one env config has more or less keys than the other configs.',
  );
}

export const env = process.env.REACT_APP_ENV || 'beta';
if (Object.keys(envs).indexOf(env) === -1) {
  throw new Error(`Invalid \`REACT_APP_ENV\` variable: ${env}`);
}

const config = {
  env,
  ...envs[env],
};

export default config;
