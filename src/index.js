import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined'  && typeof localStorage !== "undefined"  ) {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render

  const render = Comp => {
    renderMethod(
      <Provider store={store}>
        <AppContainer>
            <Comp />
        </AppContainer>
      </Provider>,
      target
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', () => {
      render(App)
    })
  }
}
