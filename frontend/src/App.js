import 'tachyons'

function App () {
  return (
    <div className='App sans-serif mw8 center mv3 ph2'>

      <header className='NavBar'>
        <div className='pv2 flex items-center'>
          <div className='flex flex-auto items-center justify-between'>
            <h1 className='f2 ma0 pa0 lh-solid'>
              <span className='no-underline black'>Circles</span>
            </h1>
          </div>
        </div>
      </header>

      <div class='pv2'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </div>

    </div>
  )
}

export default App
