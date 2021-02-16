import { Block } from 'prensa';

import List from '../AmpList/List';

const blockProps = {
  align: 'column',
  bgColor: 'primary1',
  fontColor: 'white',
  width: '100%'
}
const Navigation = ({ state, template }) => {
  return (
    <Block align="column" width="100%">
      <Block {...blockProps}>Navigation</Block>
      <List 
        height="100px"
        list_name="top" 
        state={state} 
        template={template} />
    </Block>
  )
}
export default Navigation;