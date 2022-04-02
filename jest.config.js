export default async () => {
  return {
    // jest configurations
    setupFilesAfterEnv: [
      'jest-plugin-context/setup'
    ],
    transform: {},
    rootDir: "./"
  };
};