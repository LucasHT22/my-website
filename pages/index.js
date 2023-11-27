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
	  <a className={utilStyles.translation} href='https://page.devlucas.page/pt-br'>
		Versão em português
	  </a>
	  <br />
	  <h2>Currently working on:</h2>
	  <div className={utilStyles.blocks}>
		<a className={utilStyles.block} href={`https://github.com/hackclub/sprig`}>
        	<h3>Sprig</h3>
        	<p>I review PRs</p>
    	</a>
		<a className={utilStyles.block} href={`https://github.com/hackclub/sprig/tree/main/src/pages/sprikipedia`}>
        	<h3>Sprikipedia (Sprig)</h3>
        	<p>Working to make it possible</p>
    	</a>
		<a className={utilStyles.block} href={`https://github.com/HACK-SP-BR`}>
        	<h3>Hack SP</h3>
        	<p>Researching and trying to make it happen</p>
    	</a>
	  </div>
	  <h2>Public projects:</h2>
	  <div className={utilStyles.blocks}>
		<a className={utilStyles.block} href={`https://github.com/LucasHT22/bruke`}>
        	<h3>Bruke</h3>
        	<p>Bruke is your friendly Astro book website template!</p>
    	</a>
	  </div>
	  <h2>Translations</h2>
	  <p>I translate amateurishly, I have no academic training. I like to do translations that are not so formal, which are closer to everyday vocabulary.</p>
	  <p>NOTE - Some of the translations below I just fixed some things and some I did the entire translation.</p>
	  <div className={utilStyles.blocks}>
	  	<a className={utilStyles.blockt} href={`https://github.com/hack-club-brasil/sprig-docs-portuguese`}>
        	<h3>Sprig Docs</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://www.figma.com/file/ODuZDY1bKVWJlOwkXsUAfY/sprig-poster---portuguese?type=design&node-id=314%3A13&mode=design&t=KWLVLynhvGWukFLq-1`}>
        	<h3>Sprig Posters</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://github.com/hackclub/sprig/blob/main/src/translations/pt_BR.json`}>
        	<h3>Sprig Wiki</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://github.com/hackclub/sprig/blob/main/src/translations/pt_BR.json`}>
        	<h3>Sprig Wiki</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://brasil.hackclub.com/workshops/fa%C3%A7a-um-workshop-sobre-sprig/`}>
        	<h3>Hack Club Workshops</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://brew.sh/pt-br/`}>
        	<h3>Homebrew</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://semver.org/lang/pt-BR/`}>
        	<h3>SemVer</h3>
    	</a>
		<a className={utilStyles.blockt} href={`https://www.musixmatch.com/profile/3vUCAFn04o__SDJk-cmccY6cjGn8vby7OQeKUWz0VQ4vSTgNfOijIVYSfYtqfUb5W5DMO-ZVdEhb0PgpQqws36JWHbbQDQr-R-VaxtRNfgx4_r0PfcElAdhJvWeeIwxUAMFSqW-TYlauUTDoAzzxnYjkca8`}>
		<h3>Musixmatch</h3>
	  </div>
    </Layout>
  );
}
