import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Movies Catalog</title>
      </Head>
      <main className="main grey darken-3">
        <div className="row">
          <div className="col s4 grey darken-2">
          </div>

          <div className="col s8">
            <div className="row">
              <div className="input-field col s8">
                <input id="name" type="text" className="validate" />
                <label htmlFor="name">Movie name</label>
              </div>
            </div>

            <div className="row card-list">
              {/* {Array.from({ length: 12 }, () => (
                <></>
              ))} */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
