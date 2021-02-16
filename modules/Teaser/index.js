import Link from 'next/link';
import { Block } from 'prensa';

const blockProps = {
  bgColor: 'white',
  fontColor: 'black',
  width: '100%'
}
const Teaser = ({ contentId, path }) => {
  return (
    <Block {...blockProps}>
      <Link href={path}>
        {contentId}
      </Link>
    </Block>
  )
}
export default Teaser;