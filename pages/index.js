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
		<p>From São Paulo, Brazil! 🇧🇷</p>
        <p>
          I'm <select name="things" className={utilStyles.select}>
				<option>a Developer</option>
				<option>a Designer</option>
				<option>a Human</option>
				<option>a Problem solver</option>
				<option>a Dog lover</option>
				<option>a Brazilian</option>
				<option>a Reader</option>
				<option>a Photographer</option>
				<option>a Logistic person</option>
				<option>a Hackathon organizer</option>
				<option>a Comedian</option>
				<option>an Amateur translator</option>
				<option>a Teacher</option>
			</select>
        </p>
      </section>
	  <h1>THIS WEBSITE IS UNDER CONSTRUCTION</h1>
    </Layout>
  );
}