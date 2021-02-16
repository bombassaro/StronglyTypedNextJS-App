const State = ({ domain, name, policy }) => {
  const url = `${domain}/api/${policy}`
  console.log(`*** amp-state.fetching`, url)
  return (
    <amp-state id={name} src={url}>
      <script type="application/json" dangerouslySetInnerHTML={{__html: `{"items": []}`}} />
    </amp-state>
  )
}
export default State;