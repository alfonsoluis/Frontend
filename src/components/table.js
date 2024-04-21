import { useState } from 'react';
import { useEffect } from 'react';
import { formatDate } from '../utils';
import Loading from './loading';


const Table = ({ data, shouldShadeRows, shouldSortByCountry, countryFilter, onDelete }) => {  

    const handleSortByCountry = (a, b) => shouldSortByCountry ? a.location.country.localeCompare(b.location.country) : 0;
    const handleFilterByCountry = (person) => countryFilter === '' || person.location.country.toLowerCase().includes(countryFilter.toLowerCase());

    return (
        <>
        { data.length === 0 ? 
            <Loading /> :
            <table className="mt-6 w-full whitespace-nowrap mx-auto max-w-lg divide-y divide-gray-300 ">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 ">
                            Foto / Nombre / Email
                        </th>
                        <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Dirección
                        </th>
                        <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Fecha de Registro
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            País
                        </th>
                        <th scope="col" className="px-1 py-3.5 text-right text-sm font-semibold text-gray-900">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                { data
                    .sort(handleSortByCountry)
                    .filter(handleFilterByCountry)
                    .map((person) => (
                    <tr key={person.email} className={`${shouldShadeRows && 'group is-shaded even:bg-[#112233] odd:bg-[#556677]'}`}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                            <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                                <img className="h-11 w-11 rounded-full" src={person.picture.thumbnail} alt="" />
                            </div>
                            <div className="ml-4">
                                <div className="font-medium text-gray-900 group-[.is-shaded]:text-white">{ `${person.name.first} ${person.name.last}` }</div>
                                <div className="mt-1 text-gray-500 group-[.is-shaded]:text-gray-300">{person.email}</div>
                            </div>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900 group-[.is-shaded]:text-white">{ `${person.location.street.number} - ${person.location.street.name}` }</div>
                            <div className="mt-1 text-gray-500 group-[.is-shaded]:text-gray-300">{person.location.city}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-center text-gray-500 group-[.is-shaded]:text-white">{formatDate(person.registered.date)}</td>
                        <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-500 group-[.is-shaded]:text-white">
                            <span className="inline-flex items-center rounded-md bg-green-50 group-[.is-shaded]:bg-gray-300 px-2 py-1 text-xs font-medium text-green-700 group-[.is-shaded]:text-gray-700 ring-1 ring-inset ring-green-600/20">
                                { person.location.country }
                            </span>
                        </td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-right text-sm font-medium">
                            <button 
                                onClick={() => onDelete(person.email)}
                                className="text-red-600 group-[.is-shaded]:text-red-200 hover:text-red-900 cursor-pointer"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        }
        </>
    );
  }
  
  export default Table;