import { Helmet } from "react-helmet-async";

function HeaderSEO({ title, description, type = "article" }) {
  return (
    <Helmet>
      <title>{title} | React Blog</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default HeaderSEO;
