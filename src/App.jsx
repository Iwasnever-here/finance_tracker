import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import MainPage from './components/MainPage';
import SignIn from './components/SignIn';

import './App.css';
import SavingPage from './components/SavingPage';
import TransactionsPage from './components/TransactionsPage';
import LearnPage from './components/LearnPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );

  function MainLayout() {
    const location = useLocation();
    const [hovered, setHovered] = useState(false);

    const navPaths = [
      { path: '/', label: 'home', icon: '@' },
      { path: '/main', label: 'dashboard', icon: '@' },
      { path: '/savings', label: 'savings', icon: '@' },
      { path: '/transactions', label: 'transactions', icon: '@' },
      { path: '/improve', label: 'learn', icon: '@' },
    ];

    const isActive = (path) => location.pathname === path;

    const collapsed = !hovered;

    return (
      <div className='min-h-screen bg-red-100 flex'>
        <aside
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={[
            collapsed ? 'w-16' : 'w-60',
            'm-1 bg-red-500 text-black transition-all duration-300',
          ].join(' ')}
        >
          <div className='flex items-center gap-3 px-4 py-4'>
            <div className='w-8 h-8 bg-red-600'>@</div>
            {!collapsed && <div className='tracking-wide'>hhhhhhh</div>}
          </div>

          <nav>
            <ul className='space-y-1'>
              {navPaths.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={[
                      'relative flex items-center h-11',
                      collapsed ? 'justify-center px-4' : 'gap-3 px-4',
                      'text-slate-400 hover:text-slate-100 hover:bg-white/45 transition',
                      isActive(item.path) ? 'bg-white/50 text-white' : '',
                    ].join(' ')}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className='w-6 text-center'>{item.icon}</span>
                    {!collapsed && <span className='font-medium'>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/savings' element={<SavingPage />} />
            <Route path='/transactions' element={<TransactionsPage />} />
            <Route path='/improve' element={<LearnPage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

function Home() {
  return (
    <div className='h-screen'>
      <div>
        <Link to='/signin' className='text-zinc-950 text-lg px-5'>signIn</Link>
      </div>
      <div>
        <Link to='/main' className='text-zinc-950 text-lg px-5'>Main Pagw</Link>
      </div>
    </div>
  );
}

export default App;
