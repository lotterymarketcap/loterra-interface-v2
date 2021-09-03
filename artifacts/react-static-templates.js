

import React from 'react'
import universal, { setHasBabelPlugin } from 'react-universal-component'

setHasBabelPlugin()

const universalOptions = {
  loading: () => null,
  error: props => {
    console.error(props.error);
    return <div>An error occurred loading this page's template. More information is available in the console.</div>;
  },
  ignoreBabelRename: true
}

const t_0 = universal(import('__react_static_root__/src/pages/NotFound'), universalOptions)
      t_0.template = '__react_static_root__/src/pages/NotFound'
      
const t_1 = universal(import('__react_static_root__/src/pages/Index'), universalOptions)
      t_1.template = '__react_static_root__/src/pages/Index'
      
const t_2 = universal(import('__react_static_root__/src/pages/Staking'), universalOptions)
      t_2.template = '__react_static_root__/src/pages/Staking'
      
const t_3 = universal(import('__react_static_root__/src/pages/Terrand'), universalOptions)
      t_3.template = '__react_static_root__/src/pages/Terrand'
      

// Template Map
export default {
  '__react_static_root__/src/pages/NotFound': t_0,
'__react_static_root__/src/pages/Index': t_1,
'__react_static_root__/src/pages/Staking': t_2,
'__react_static_root__/src/pages/Terrand': t_3
}
// Not Found Template
export const notFoundTemplate = "__react_static_root__/src/pages/NotFound"

