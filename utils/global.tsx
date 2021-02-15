const env_get = (name) => process.env[name];

const general_configuration = {
  address: {
    api_url: env_get("POLOPOLY_ADDRESS"),
    domain: env_get("SITE_MAIN_DOMAIN")
  },
  layout: {
    favicon_url: '/favicon.png'
  },
  metadata: {
    title: '',
    siteName: 'Nome do site',
    locale: 'pt_BR',
    url: '',
    description: '',
    keywords: '',
    type: '',
    author: 'Nome do site',
    copyright: 'Nome do site',
    published: '',
    modified: '',
    image: {
      url: '',
      secureUrl: '',
      width: '1000',
      fallbackImage: ''
    },
    facebook: {
      pagesId: '',
    },
    twitter: {
      creator: '@scnoficial',
      site: '@scnoficial'
    }
  }
}
export { env_get, general_configuration };