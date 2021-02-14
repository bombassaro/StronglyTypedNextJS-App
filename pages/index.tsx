import { Block } from 'prensa';

const MainComponent = () => {
  const blockProps = {
    bgColor: 'primary1',
    fontColor: 'white'
  }
  return (
    <Block {...blockProps}>Hello World!</Block>
  )
}

export default MainComponent;