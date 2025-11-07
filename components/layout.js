import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import TradingViewTicker from './TradingViewTicker';

const name = 'Lucas Honda.';
export const siteTitle = 'Lucas :D';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>/
      <Head>
        <link rel="icon" href="/ruby-draw.png" />
        <meta
          name="description"
          content="Lucas Honda website"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <div className={styles.b3}>
            <TradingViewTicker />
            </div>
            <Image
              priority
              src="/ruby-draw.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <p className={utilStyles.obs}><i>* This is a drawing of my dog, made by <a className={utilStyles.a} href='https://www.linkedin.com/in/ruby-ke/'>Ruby</a>!</i></p>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            <p className={utilStyles.obs0}>Creating the best experiences @ Hack SP & Hack Club | LALA ’25 | NYAS ‘25 | MIT BWSIx ‘25 | ICTP-SAIFR Young Scientists ‘25</p>
          </>
        ) : (
          <>
            <Link href="/">
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
