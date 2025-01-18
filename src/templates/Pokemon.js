import React from "react";
import Layout from "../components/Layout";
import { useGlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";

const PokemonPage = ({ pageContext }) => {
  const {
    id,
    number,
    name,
    genus,
    description,
    image,
    height,
    weight,
    types,
    abilities,
    stats,
  } = pageContext;

  const { language } = useGlobalContext();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold capitalize">{name[language]}</h1>
          <p className="text-2xl font-bold">#{number}</p>

          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            ← 
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              src={image}
              alt={name[language]}
              className="w-60 h-50 mb-4 object-contain "
            />
            <div className="flex flex-col items-left text-left">
              <p className="text-gray-600">
                <strong>Genus:</strong> {genus[language]}
              </p>
              <p className="text-gray-600">
                <strong>Description:</strong> {description[language]}
              </p>
              <div className="flex justify-stretch gap-5">
                <p className="text-gray-600">
                  <strong>Height:</strong> {height / 10} m
                </p>
                <p className="text-gray-600">
                  <strong>Weight:</strong> {weight / 10} kg
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Types</h2>
              <div className="flex space-x-2">
                {types.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {abilities.map((ability) => (
                  <li key={ability} className="capitalize text-gray-700">
                    {ability}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Base Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="flex justify-between items-center text-gray-600"
                  >
                    <span className="capitalize font-medium">{stat.name}</span>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonPage;
