import { Block } from 'prensa';
import { replace } from 'lodash';

import List from './List';
import State from './State';
import Teaser from '../Teaser';

const blockProps = {
  bgColor: 'primary1',
  fontColor: 'white'
}
const queueProps = {
  bgColor: 'primary2',
  fontColor: 'white'
}

const AmpList = ({ contentId, domain }) => {
  const content_id_string = replace(contentId, '.', '_');
  const amp_state = `data_${content_id_string}`;
  return (
    <>
      <State contentId={contentId} name={amp_state} domain={domain} />
      <Block {...blockProps}>Featured</Block>
      <List 
        amp_state={amp_state} 
        list_name="featured"
        height="100">
        <Teaser 
          contentId={"{{name}}"} 
          path={"{{path}}"} 
        />
      </List>
      <Block {...queueProps}>Queue</Block>
      <List 
        amp_state={amp_state} 
        list_name="queue"
        height="100">
        <Teaser 
          contentId={"{{name}}"} 
          path={"{{path}}"} 
        />
      </List>
    </>
  )
}
export default AmpList;