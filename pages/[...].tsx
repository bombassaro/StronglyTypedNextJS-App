import Container from 'modules/Container';
import { fetch_api_main_request } from 'utils/fetch';

const MainComponent = ({ content, request }) => {
  return (
    <Container content={content} request={request} />
  )
}
export const getServerSideProps = async (props) => {
  const payload = await fetch_api_main_request(props);
  return payload;
}

export const config = {amp: 'hybrid'}

export default MainComponent;