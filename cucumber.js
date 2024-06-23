const common = [
  '--require-module ts-node/register', // Load TypeScript module
  '--format progress' // Display progress in the console
];

const BackendBackoffice = [
  ...common,
  'test/apps/backoffice/backend/features/*.feature', // Path to feature files
  '--require test/apps/backoffice/backend/features/step_definitions/*.steps.ts'// Path to step definitions
].join(' ');

module.exports = {
  default: BackendBackoffice
};
