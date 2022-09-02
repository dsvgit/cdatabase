type Env = {
  REACT_APP_ENDPOINT: string;
};

export const env: Env = {
  REACT_APP_ENDPOINT: String(process.env.REACT_APP_ENDPOINT),
};

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`Environment variable ${key} required.`);
  }
}
