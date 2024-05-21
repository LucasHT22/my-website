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
        <p>Olá! Sou Lucas :)</p>
		<p>De São Paulo, Brasil! 🇧🇷</p>
        <p>
          Sou um <select name="things" className={utilStyles.select}>
				<option>Desenvolvedor</option>
				<option>Designer</option>
				<option>Humano</option>
				<option>Resolvedor de problemas</option>
				<option>Brasileiro</option>
				<option>Leitor</option>
				<option>Fotógrafo</option>
				<option>Organizador de hackathon</option>
				<option>Comediante</option>
				<option>Tradutor amador</option>
				<option>Professor</option>
			</select>
        </p>
      </section>
	  <a className={utilStyles.translation} href='https://page.devlucas.page/'>
		Version in english
	  </a>
	  <br />
	  <h2>Atualmente trabalhando com:</h2>
	  <div className={utilStyles.blocks}>
		<a className={utilStyles.block} href={`https://github.com/hackclub/sprig`}>
        	<h3>Sprig</h3>
        	<p>Diretor de Sprig App Review</p>
    	</a>
		<a className={utilStyles.block} href={`https://github.com/hackclub/sprig/tree/main/src/pages/sprikipedia`}>
        	<h3>Sprikipedia (Sprig)</h3>
        	<p>Trabalhando para tornar possível</p>
    	</a>
		<a className={utilStyles.block} href={`https://github.com/HACK-SP-BR`}>
        	<h3>Hack SP</h3>
        	<p>Procurando e tentando fazer acontecer</p>
    	</a>
	  </div>
	  <h2>Traduções</h2>
	  <p>Eu traduzo de forma amadora, não tenho formação acadêmica. Eu gosto de fazer traduções que não são tão formais, que são mais próximos to ao vocabulário do dia a dia.</p>
	  <p>NOTA - Algumas das traduções abaixo eu só consertei algumas coisas e algumas fiz do começo ao fim.</p>
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
	  </div>
    </Layout>
  );
}
