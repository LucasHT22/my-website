import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import Layout, { siteTitle } from '../components/layout';

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
          <li>Translations - I help with translations for various projects and organizations (e.g. HackClub, Homebrew, SemVer and many others!)</li>
        </ul>
        <h2>Contact me</h2>
        <a className={utilStyles.a} href='mailto:lucas@devlucas.page'>lucas [at] devlucas [dot] page</a>
        <br />
        <a className={utilStyles.a} href='https://github.com/LucasHT22'>GitHub /LucasHT22</a>
        <br />
        <a className={utilStyles.a} href='https://www.linkedin.com/in/lht22/'>LinkedIn /lht22</a>
        </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
