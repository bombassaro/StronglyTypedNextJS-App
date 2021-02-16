import { replace, map } from 'lodash';
import { Block } from 'prensa';

import AmpList from '../AmpList';
import Article from '../Article';
import Metadata from 'utils/metadata';

import Navigation from '../Navigation';
import NavigationProvider from '../Navigation/Provider';

const blockProps = {
  bgColor: 'primary1',
  fontColor: 'white'
}
const PageDefault = (props) => {
  return (
    <>
      <Metadata article={{}} content={{}} template={{}} />
      {props.children}
    </>
  )
}
const Container = ({ content, request }) => {

  const domain = request.address.bff_url;

  if(!content || content && content.error_page) {
    return (
      <PageDefault>
        <Block {...blockProps}>Failed!</Block>
      </PageDefault>
    )
  }
  
  const { article, page, site, top_blocks } = content

  const navigation_contentid = replace(site.contentId, '.', '_');
  const navigation_props = {
    domain,
    policy: `navigation/${site.contentId}`,
    state: `navigation_state_${navigation_contentid}`,
    template: `navigation_template_${navigation_contentid}`
  }

  const RenderArticle = () =>
    map(article, (item, key) => 
      <Article 
        content={item} 
        domain={domain} 
        key={key} 
      />)

  const TopBlocks = () => 
    map(top_blocks, (contentId, key) => 
      <AmpList 
        contentId={contentId} 
        domain={domain} 
        key={key} 
      />)

  return (
    <Block align="column" width="100%">
      <NavigationProvider {...navigation_props} />
      <Navigation {...navigation_props} site={site} />
      <RenderArticle />
      <TopBlocks />
    </Block>
  )
}

export default Container;