import Link from 'next/link';
import { Block } from 'prensa';

const blockProps = {
  bgColor: 'primary3',
  fontColor: 'white'
}

const Teaser = ({ content, contentId, path }) => {
  return (
    <Block {...blockProps}>
      <Link href={path}>
        {contentId}
      </Link>
    </Block>
  )
}

export default Teaser;