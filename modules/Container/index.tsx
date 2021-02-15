import { Block } from 'prensa';
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
  return (
    <PageDefault>
      <Block {...blockProps}>Hello World!</Block>
    </PageDefault>
  )
}

export default Container;