require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./mainRoute").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://kodekula.netlify.com")
            .save("./public/sitemap.xml")
      );
  }

  generateSitemap();