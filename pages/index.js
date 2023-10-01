import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey! I'm Lucas :)</p>
        <p>
          I'm a <select name="things" className={utilStyles.select}>
				<option>Developer</option>
				<option>Designer</option>
				<option>Human</option>
				<option>Problem solver</option>
				<option>Dog lover</option>
				<option>Brazilian</option>
				<option>Reader</option>
				<option>Photographer</option>
				<option>Logistic person</option>
				<option>Hackathon organizer</option>
				<option>Comedian</option>
				<option>Translator</option>
				<option>Teacher</option>
			</select>
        </p>
      </section>
    </Layout>
  );
}