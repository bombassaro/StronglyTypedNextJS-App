import Container from 'modules/Container';
import { fetch_server_side } from 'utils/fetch';

const MainComponent = ({ content, request }) => {
  return (
    <Container content={content} request={request} />
  )
}
MainComponent.getInitialProps = async (props) => {
  const payload = await fetch_server_side(props);
  return payload;
}

export const config = {amp: 'hybrid'}

export default MainComponent;