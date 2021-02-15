const List = ({amp_state, children, height, list_name}) => {
  return (
    <amp-list
      width="auto"
      height={height}
      layout="fixed-height"
      src={`amp-state:${amp_state}.${list_name}`}>
      <div placeholder="placeholder">Loading ...</div>
      <div fallback="fallback">Failed to load data.</div>
      <template type="amp-mustache">
        {children}
      </template>
    </amp-list>
  )
}
export default List;