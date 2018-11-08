import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
  render() {
    const { Component, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

// is a higher order compoment, wrapped in withData
export default withData(MyApp);
