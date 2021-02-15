import { Block } from 'prensa';

const blockProps = {
  bgColor: 'primary3',
  fontColor: 'white'
}

const Teaser = ({ content, contentId }) => {
  return (
    <Block {...blockProps}>{contentId}</Block>
  )
}

export default Teaser;