import Head from 'next/head'
import styles from '../styles/Home.module.css'

type JsonProps = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

type HomeProps = {
  propsJson: JsonProps[]
}

function Home({ propsJson }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poc.SSG</title>
        <meta name="description" content="Exemplo de uso SSG + NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Poc.SSG - Static Site Generation!</h1>

      <main className={styles.main}>
        <div className={styles.grid}>
          {propsJson.map((props) => {
            return (
              <div key={props.id} className={styles.card}>
                <h2>{props.name}</h2>
                <address>
                  <a href={`mailto: ${props.email}`}>{props.email}</a>
                </address>
                <p>{props.body}</p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments')
  const propsJson: JsonProps[] = await res.json()

  const duasHoras = 60 * 60 * 2

  return {
    props: {
      propsJson,
    },
    revalidate: duasHoras,
  }
}

export default Home
