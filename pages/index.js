import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p> Hey, I'm Lucas! 
        <br /> I'm high school student maker from São Paulo, Brazil! 
        <br /> Here some things I like: </p>
        <ul> 
          <li> Aviation - Studying to be a private pilot :) </li> 
          <li> 3d printers - Ender 3 Pro and Bambu Lab A1 mini owner! I provide maintenance and support </li> 
          <li>CAD - Autodesk Fusion 360 and Onshape user, on-demand part modeling</li> 
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
