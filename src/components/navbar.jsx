import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';  // Importa Disclosure correctamente
import { BellIcon, Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'; // Importa el ícono de usuario de Heroicons
import { logoutUser } from '../services/auth_service'; // Importamos la función de logout

const navigation = [
  { name: 'Agendar consulta', href: '/attention', current: false },
  { name: 'Sobre nosotros', href: '#', current: false },
  { name: 'Contactanos', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const navigate = useNavigate();

  // Verificar si el usuario está logueado (comprobamos el token en localStorage)
  const isLoggedIn = localStorage.getItem('authToken') !== null;

  const handleLogout = () => {
    logoutUser(); // Eliminar el token de localStorage
    navigate('/login'); // Redirigir al login después de hacer logout
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </Disclosure.Button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href="/">
                <img
                  alt="Your Company"
                  src="src/assets/logomascota.png"
                  className="h-8 w-auto"
                  style={{ borderRadius: '50%' }}
                />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  {isLoggedIn ? (
                    // Aquí mostramos el ícono de usuario en lugar de la imagen
                    <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-gray-800" />
                    </div>
                  ) : (
                    <span className="text-white">Login</span>
                  )}
                </MenuButton>
              </div>
              <MenuItems
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                {isLoggedIn ? (
                  <>
                    <MenuItem>
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700">
                        Mi perfil
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Login
                    </a>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
