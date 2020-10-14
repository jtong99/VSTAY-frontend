module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'transform-imports',
      {
        'react-bootstrap': {
          transform: (member) => `react-bootstrap/${member}`,
          preventFullImport: true,
        },
      },
    ],
  ],
};
