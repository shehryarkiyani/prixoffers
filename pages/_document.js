import Document,{ Html, Head, Main, NextScript } from 'next/document'
import { useSelector,useStore } from 'react-redux';
import { useRouter } from "next/router";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "en" };
  }

  render() {
    return (
      <Html
        dir={this.props.locale == "AR" ? "rtl" : "ltr"}  //rtl
        lang={this.props.locale}
      >
        <Head ></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
