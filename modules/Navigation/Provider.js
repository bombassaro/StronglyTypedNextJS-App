import Link from 'next/link';
import { Block } from 'prensa';
import State from '../AmpList/State';

const NavigationProvider = ({ domain, policy, state, template}) => {

  const NavigationState = () => {
    return (
      <State 
        domain={domain} 
        name={state} 
        policy={policy} 
      />
    )
  }
  const NavigationTemplate = () => {

    const itemProps = {
      align: 'column',
      bgColor: 'white',
      fontColor: 'primary1',
      mr: 2
    }
    const Item = ({ name, path }) =>
      <Block {...itemProps}>
        <Link href={path}>
          {name}
        </Link>
      </Block>

    return (
      <template id={template} type="amp-mustache">
        <Block align="row" width="100%">
          <Item path={"/"} name={"Home"} />
          {`{{#list}}`}
            <Item 
              path={"{{path}}"} 
              name={"{{name}}"} 
            />
          {`{{/list}}`}
        </Block>
      </template>
    )
  }
  return (
    <>
      <NavigationState />
      <NavigationTemplate />
    </>
  )
}
export default NavigationProvider;