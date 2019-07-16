module.exports = {
  siteName: 'xxx',
  logoPath: '/logo.png',

  // apiPrefix: '/api/v1',

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/login/],
    },
  ],
}
