import React from 'react';
import {Helmet as Header} from "react-helmet"

const Helmet = ({title, description}) => {
  return (
    <Header 
        title={title}  
        htmlAttributes={{ lang: "fr" }}
        meta={[
            {
              name: `description`,
              content: description,
            },
            {
              name:`keywords`,
              content:"synes , syndicat, syndicat national "
            }
          ]}
    />
  )
}

export default Helmet