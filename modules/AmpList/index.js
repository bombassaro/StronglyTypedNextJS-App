import { Block } from 'prensa';
import { replace } from 'lodash';

import List from './List';
import State from './State';
import Teaser from '../Teaser';

const blockProps = {
  bgColor: 'primary2',
  fontColor: 'white',
  width: '100%'
}
const queueProps = {
  bgColor: 'primary3',
  fontColor: 'white',
  width: '100%'
}
const itemProps = {
  bgColor: 'white',
  fontColor: 'secondary1',
  width: '100%'
}

const Template = ({ template }) => {
  return (
    <template id={template} type="amp-mustache">
      <Block {...itemProps}>
        {"{{#list}}"}
          <Teaser 
            contentId={"{{name}}"} 
            path={"{{path}}"} 
          />
        {"{{/list}}"}
      </Block>
    </template>
  )
}

const AmpList = ({ contentId, domain }) => {
  const content_id_string = replace(contentId, '.', '_');
  const policy = `policy/${contentId}`
  const state = `list_state_${content_id_string}`;
  const template = `list_template_${content_id_string}`;
  return (
    <>
      <State 
        domain={domain} 
        name={state} 
        policy={policy} 
      />
      <Template template={template} />
      <Block {...blockProps}>Featured</Block>
      <List 
        height="100px" 
        list_name="featured"
        state={state} 
        template={template}
      />
      <Block {...queueProps}>Queue</Block>
      <List 
        height="100px" 
        list_name="queue"
        state={state} 
        template={template}
      />
    </>
  )
}
export default AmpList;