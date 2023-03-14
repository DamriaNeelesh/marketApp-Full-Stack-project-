import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script src="sweetalert2.all.min.js"></script>
      <title>Stock Market App</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
