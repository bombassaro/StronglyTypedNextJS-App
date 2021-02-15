const State = ({ contentId, domain, name }) => {
  const url = `${domain}/api/policy/${contentId}`
  console.log(`*** amp-state.fetching`, url)
  return (
    <amp-state id={name} src={url}>
      <script type="application/json" dangerouslySetInnerHTML={{__html: `{"items": []}`}} />
    </amp-state>
  )
}
export default State;