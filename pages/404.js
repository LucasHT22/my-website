import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

export default function Custom404() {
    return (
        <Layout home>
          <Head>
            <title>{siteTitle}</title>
          </Head>
            <h1>404 - Sorry! Page Not Found</h1>;
        </Layout>
    )
  }