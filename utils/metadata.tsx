import React from 'react';
import Head from 'next/head';
import { map } from 'lodash';
import { general_configuration } from 'utils/global';

const parse_data = (article, content, template) => {

  let domain = general_configuration.address.domain;
  let seo_data = general_configuration.metadata;

  const isArticle = template === 'articlePagelayout'

  const pagecontent = article ? article : content['page-content']
  const {images, metadata, path, subtitle, title} = pagecontent

  // page metadata
  const page_title = content['department-title']
  const page_metadata = content['department-metadata']
  const page_keywords = content['department-keywords']

  // site metadata
  const site_title = content['parentpage-title']
  const site_metadata = content['parentpage-metadata']
  const site_keywords = content['parentpage-keywords']

  // article metadata
  const article_canonical = article['canonical']
  const article_keywords = article['keywords']
  const article_metadata = article['keymetas']
  
  seo_data.published = article['time-published']
  seo_data.modified = article['time-modified']

  // set article tags
  let article_tags = ''
  map(metadata, value => article_tags = `${article_tags} ${value},`)
  
  let image_path = ''
  seo_data.title = title || page_title || site_title

  let custom_metadata = article_metadata || subtitle || page_metadata || site_metadata
  seo_data.keywords = article_keywords || article_tags || page_keywords || site_keywords
  seo_data.description = custom_metadata
  
  // define page_type
  seo_data.type = isArticle ? 'article' : 'website'
  
  // define image path
  if (images && images['image-contentId']) {
    image_path = `${domain}/image/policy:${images['image-contentId']}/image.jpg?f=2x1&w=1000`
  }

  // define path canonical
  const url_path = article_canonical ? article_canonical : path ? path : ''
  seo_data.url = `${domain}${url_path}`

  // define image and fallback
  const fallback_image = `${domain}/logo-redes-sociais.png`
  seo_data.image.url = image_path ? image_path : fallback_image
  seo_data.image.fallbackImage = fallback_image

  // define facebook conf
  seo_data.facebook.pagesId = content['config-fbpageid']
  
  return seo_data
}

const parse_web = seo_data => {
  return (
    <React.Fragment>
      <meta property="og:locale" content={seo_data.locale} />
      <meta property="og:site_name" content={seo_data.siteName} />
      <meta property="og:url" content={seo_data.url} />
      <meta property='description' content={seo_data.description} />
      <meta property="author" content={seo_data.author} />
      <meta property="copyright" content={seo_data.copyright} />
      <meta property='keywords' content={seo_data.keywords} />
      <meta property='og:description' content={seo_data.description} />
      <meta property='og:title' content={seo_data.title} />
      <meta property="twitter:title" content={seo_data.title} />
      <meta property='twitter:description' content={seo_data.description} />
      <meta property="twitter:creator" content={seo_data.twitter.creator} />
      <meta property="twitter:site" content={seo_data.twitter.site} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property='og:type' content='article' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta property='og:image:width' content={seo_data.image.width} />
      <meta property='og:image' content={seo_data.image.url} />
      <meta property='og:image:secure_url' content={seo_data.image.url} />
      <meta property='twitter:image:src' content={seo_data.image.url} />
      <meta itemProp='image' content={seo_data.image.url} />
      <meta property="fb:pages" content={seo_data.facebook.pagesId} />
    </React.Fragment>
  )
}

const Metadata = ({article, content, template}) => {
  const seo_data = parse_data(article, content, template)
  const ampCanonical = `${seo_data.url}?amp=1`
  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    'mainEntityOfPage': `${seo_data.url}`,
    'headline': `${seo_data.title}`,
    'datePublished': `${seo_data.published}`,
    'dateModified': `${seo_data.modified}`,
    'description': `${seo_data.description}`,
    'author': {
      '@type': 'Person',
      'name': `${seo_data.author}`
    },
    'publisher': {
      '@type': 'Organization',
      'name': `${seo_data.author}`,
      'logo': {
        '@type': 'ImageObject',
        'url': `${seo_data.image.fallbackImage}`,
        'width': 600,
        'height': 600
      }
    },
    'image': {
      '@type': 'ImageObject',
      'url': `${seo_data.image.url}`,
      'height': 2000,
      'width': 800
    }
  }

  return (
    <Head>
      <link rel='canonical' href={seo_data.url} />
      <link rel="amphtml" href={ampCanonical} />
      <title>{seo_data.title}</title>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
      {parse_web(seo_data)}
    </Head>
  )
}
export default Metadata