import { Block } from 'prensa';
import Metadata from 'utils/metadata';
import Teaser from '../Teaser';

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
  const bff_url = request.address.bff_url;
  if(!content || content && content.error_page) {
    return (
      <PageDefault>
        <Block {...blockProps}>Failed!</Block>
      </PageDefault>
    )
  }
  const { top_blocks } = content
  const url = `${bff_url}/api/policy/1.185`
  console.log(`*** amp.fetching`, url)
  return (
    <PageDefault>
      <amp-script id="dataFunctions" script="local-script" nodom="nodom"></amp-script>
      {/* amp-fetch-async */}
      <script id="local-script" type="text/plain" target="amp-script" dangerouslySetInnerHTML={{__html: `
        function getRemoteData() {
          return fetch('${url}')
            .then(resp => resp.json())
            .then((payload) => {
              return {items: payload.top_blocks}
            })
        }
        exportFunction('getRemoteData', getRemoteData);
      `}} />
      <amp-list
        id="amp-list"
        width="auto"
        height="100"
        layout="fixed-height"
        src="amp-script:dataFunctions.getRemoteData">
        <div placeholder="placeholder">Loading ...</div>
        <div fallback="fallback">Failed to load data.</div>
        <template type="amp-mustache">
          <Teaser contentId={"{{contentId}}"} />
        </template>
      </amp-list>
        <Block {...blockProps}>Hello World!</Block>
    </PageDefault>
  )
}

export default Container;