import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import MainPage from './components/MainPage';
import SignIn from './components/SignIn';

import { FaHome,FaPiggyBank, FaWallet, FaBook  } from "react-icons/fa";

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
      { path: '/', label: 'home', icon: <FaHome /> },
      { path: '/savings', label: 'savings', icon: <FaPiggyBank /> },
      { path: '/transactions', label: 'transactions', icon: <FaWallet /> },
      { path: '/improve', label: 'learn', icon: <FaBook /> },
    ];

    const isActive = (path) => location.pathname === path;

    const collapsed = !hovered;

    return (
      <div className='min-h-screen bg-[#F7EF7D] flex'>
        <aside
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={[
            collapsed ? 'w-16' : 'w-60',
            'm-1 bg-[#C1CB79] text-black transition-all duration-300 rounded-lg',
          ].join(' ')}
        >
          <div className='flex items-center gap-3 px-4 py-4'>
            <div className='w-10 h-10'><img src = 'moneyman.png' className="w-full h-full object-cover"/></div>
            {!collapsed && <div className='tracking-wide'>hhhhhhh</div>}
          </div>

          <nav>
            <ul className='space-y-1'>
              {navPaths.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={[
                      'relative flex items-center h-11 rounded-lg m-2 ',
                      collapsed ? 'justify-center px-4' : 'gap-3 px-4',
                      'text-black hover:text-black hover:bg-white/45 transition',
                      isActive(item.path) ? 'bg-white/50 text-black' : '',
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

        <main className='m-1 bg-white w-screen rounded-lg p-2'>
          <Routes>
            <Route path='/' element={<MainPage />} />
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
