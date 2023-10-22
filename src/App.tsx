import {Routes, Route} from 'react-router-dom';
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout.tsx';
import PostListPage from './pages/PostListPage/PostListPage.tsx';
import InfinityPostPage from './pages/InfinityPostPage/InfinityPostPage.tsx';
import {PATHS} from './constants/paths.ts';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path={PATHS.POST} element={<GeneralLayout />}>
          <Route index element={<PostListPage />} />
          <Route path={PATHS.INFINITY_POST} element={<InfinityPostPage />} />

          <Route path="*" element={<PostListPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
