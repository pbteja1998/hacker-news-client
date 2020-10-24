import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='application-name' content='Hacker News' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:creator' content='@pbteja1998' />
          <meta property='og:type' content='website' />
          <meta name='author' content='Bhanu Teja P' />
          <meta property='og:site_name' content='Hacker News' />
          <meta name='theme-color' content='#d03801' />
          <meta
            name='description'
            content='A Hacker News client to view stories from news.ycombinator.com.'
          />
          <meta property='og:title' content='Hacker News' />
          <meta
            property='og:description'
            content='A Hacker News client to view stories from news.ycombinator.com.'
          />
          <meta property='og:url' content='https://hn.bhanuteja.dev' />
          <meta property='twitter:title' content='Hacker News' />
          <meta
            property='twitter:description'
            content='A Hacker News client to view stories from news.ycombinator.com.'
          />
          <meta property='twitter:url' content='https://hn.bhanuteja.dev' />
          <meta
            property='og:image'
            content='https://hn.bhanuteja.dev/preview.png'
          />
          <meta
            property='twitter:image'
            content='https://hn.bhanuteja.dev/preview.png'
          />
          <link rel='shortcut icon' href='/favicon.ico' />
          <script
            src='https://cdn.usefathom.com/script.js'
            // @ts-ignore
            site='BBOGJGAJ'
            defer
          />
          <script
            async
            defer
            data-domain='hn.bhanuteja.dev'
            src='https://plausible.io/js/plausible.js'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
