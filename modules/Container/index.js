import { map } from 'lodash';
import { Block } from 'prensa';

import AmpList from '../AmpList';
import Metadata from 'utils/metadata';

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
  if(!content || content && content.error_page) {
    return (
      <PageDefault>
        <Block {...blockProps}>Failed!</Block>
      </PageDefault>
    )
  }
  const domain = request.address.bff_url;
  const { top_blocks } = content
  return (
    <>
      {map(top_blocks, (contentId, key) => 
        <AmpList 
          contentId={contentId} 
          domain={domain} 
          key={key} 
        />
      )}
    </>
  )
}

export default Container;