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

  const api_url = request.address.api_url;

  if(!content || content && content.error_page) {
    return (
      <PageDefault>
        <Block {...blockProps}>Failed!</Block>
      </PageDefault>
    )
  }
  const { top_blocks } = content
  const url = `${api_url}/b-1.185`
  console.log(`top_blocks`, top_blocks, url)

  return (
    <PageDefault>
      <amp-script id="dataFunctions" script="local-script" nodom="nodom"></amp-script>
      {/* amp-fetch-async */}
      <script id="local-script" type="text/plain" target="amp-script" dangerouslySetInnerHTML={{__html: `
        function getRemoteData() {
          return fetch('${url}')
            .then((resp) => {
              const payload = resp.json();
              console.log('resp', payload);
            })
            .then(resp => resp.article)
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
      </amp-list>
      <Block {...blockProps}>Hello World!</Block>
    </PageDefault>
  )
}

export default Container;