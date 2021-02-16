import Link from 'next/link';
import { Block } from 'prensa';

const blockProps = {
  bgColor: 'primary3',
  fontColor: 'white'
}

const Article = ({ content }) => {
  const { title } = content
  return (
    <Block {...blockProps}>
      <pre>{title}</pre>
    </Block>
  )
}

export default Article;