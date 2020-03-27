import * as React from 'react'

const styles = require('./scss/LoadingPage.scss') // tslint:disable-line no-var-requires

const LoadingPage: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className={styles.loadingPage}>
    Loading...
  </div>
)

export default LoadingPage
