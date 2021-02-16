import { Block } from 'prensa';

const List = ({state, template, height, list_name}) => {
  return (
    <Block align="row" width="100%">
      <amp-list
        template={template}
        layout="flex-item"
        height={height}
        width="auto"
        src={`amp-state:${state}.${list_name}`}>
        <div placeholder="placeholder">Loading ...</div>
        <div fallback="fallback">Failed to load data.</div>
      </amp-list>
    </Block>
  )
}
export default List;