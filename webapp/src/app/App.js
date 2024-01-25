import { useSeidrAuth } from 'seidr-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from '../features/auth/user/LoginPage';
import MainFrame from '../common/MainFrame';
import Demo from '../features/demo/Demo';
import Start from '../features/start/Start';
import Upload from '../features/upload/Upload';
import { Permissions, PermissionView, Roles, Users, ViewsMenus } from '../features/auth/security';
import Flow from '../features/visualizer/Flow';
import { Camera } from '../features/visualizer/Camera';

const loginPath = '/login';

function Wrapper() {
  const { user, loading } = useSeidrAuth();
  if (loading) return;
  return user ? <MainFrame /> : <Navigate to={loginPath} />;

}

export default function App() {
  return (
    <Routes>
      <Route exact={true} path={loginPath} element={<LoginPage />} />
      <Route path='/' element={<Wrapper />}>
        <Route path='/' element={<Start />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/demo' element={<Demo />} />
        <Route path='/flow' element={<Camera />} />
        <Route path='/security/permissions' element={<Permissions />} />
        <Route path='/security/permissionview' element={<PermissionView />} />
        <Route path='/security/users' element={<Users />} />
        <Route path='/security/roles' element={<Roles />} />
        <Route path='/security/viewsmenus' element={<ViewsMenus />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
