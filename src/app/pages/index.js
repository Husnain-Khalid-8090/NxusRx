import React, { lazy, useState, useEffect, Suspense, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Layout } from '../shared/components/layout/container';
import pages from '../nav';
import CircularProgress from '@mui/material/CircularProgress';
// eslint-disable-next-line no-console
const importView = file => lazy(() => import(`./${file}/index.js`).catch(() => console.log(`Error in importing ${file}`)));

export default function Index() {
  const { allowedPages, loading_user } = useContext(AuthContext);
  const history = useNavigate();

  const { view } = useParams();
  const metaViewData = pages;
  const [selectedView, setSelectedView] = useState([]);


  console.log('view',view)

  async function loadView(filtered) {
    const promise = filtered.map(async _view => {
      const View = await importView(_view.file);

      return <View key={_view.id} selectView={selectView} />;
    });
    Promise.all(promise).then(setSelectedView);
  }


  
  async function selectView(file) {
    const filtered = metaViewData.filter(elem => elem.file === file);
   
    loadView([filtered[0]]);
  }

  useEffect(() => {
    let fileToLoad = view;
    if (!allowedPages.includes(fileToLoad)) {
      fileToLoad = allowedPages.length > 0 ? allowedPages[0] : 'profile';
    }
    if (fileToLoad === 'null' || fileToLoad === 'dash/null') {
      fileToLoad = 'profile';
    }

    if (allowedPages.length === 1 && allowedPages[0] === 'no-permissions') {
      fileToLoad = 'no-permissions';
    }

    if (allowedPages.includes(fileToLoad)) {
      fileToLoad = allowedPages[allowedPages.indexOf(fileToLoad)];
    }

    history(`/dash/${fileToLoad}`, { replace: true });
    selectView(fileToLoad);
  }, [view, allowedPages, loading_user]);

  return loading_user ? (
    <CircularProgress/>
  ) : (
    <Layout title={view}>
      <Suspense fallback={ <CircularProgress/>}>{selectedView}</Suspense>
    </Layout>
  );
}
