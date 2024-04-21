// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import UserService from "./services/userService";
import { QueueListIcon, MapIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/solid'
import Button from './components/button';
import Table from './components/table';

function App() {

  const [originalData, setOriginalData] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldShadeRows, setShouldShadeRows] = useState(false);
  const [shouldSortByCountry, setShouldSortByCountry] = useState(false);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await UserService.getUsers(1, 100);
    const data = await response.json();
    setOriginalData(data.results);
    setUsers([...data.results]);
  }

  const onReset = () => {
    setUsers([...originalData]);
    setShouldShadeRows(false);
    setShouldSortByCountry(false);
    setCountryFilter('');
  }

  const onDelete = (email) => {
    const newUsers = users.filter(user => user.email !== email);
    setUsers(newUsers);
  }

  return (
    <div className="main w-full">
      <header className="App-header">
        <h1 className='text-center text-5xl py-5 font-extrabold'>Lista de Usuarios</h1>
      </header>
      <nav className='flex flex-col gap-2 py-3 px-5 justify-center md:flex-row items-stretch md:items-center'>
        <Button onClick={() => setShouldShadeRows(!shouldShadeRows)}>
          { !shouldShadeRows ? <QueueListIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> :
            <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> }
          Colorear Filas
        </Button>
        <Button onClick={() => setShouldSortByCountry(!shouldSortByCountry) } >
          <MapIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Ordenar por País
          </Button>
        <Button onClick={() => onReset()} >
          <ArrowPathIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Restaurar estado inicial
        </Button>
        <input
          type="text"
          name="pais"
          className="block px-2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          placeholder="Filtrar por país"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
      </nav>
      <div className="table w-full px-5 lg:px-0">
        <Table 
          data={users} 
          shouldShadeRows={shouldShadeRows} 
          shouldSortByCountry={shouldSortByCountry} 
          countryFilter={countryFilter}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default App;
