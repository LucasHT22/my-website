import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Lucas :D</title>
        <meta name="description" content="Hello, my name is Lucas Honda." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>Lucas Honda.</h1>
          <p>Hello! I'm Lucas, I'm from <a href="https://youtu.be/vuLtlzMMW6o?si=5klae6g_7qBBer1G">Sao Paulo</a>, Brazil!</p>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://github.com/LucasHT22/my-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            This website is Open Source
          </a>
          <a
            href="https://github.com/LucasHT22"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/github.svg"
              alt="GitHub icon"
              width={16}
              height={16}
            />
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}
