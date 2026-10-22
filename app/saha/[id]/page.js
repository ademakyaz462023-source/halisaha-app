"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [sahalar, setSahalar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch('/api/sahalar')
      .then(res => res.json())
      .then(data => {
        setSahalar(data);
        setYukleniyor(false);
      });
  }, []);

  if (yukleniyor) return <div className="p-10 text-center text-xl font-bold">Sahalar Yükleniyor...</div>;

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
        İzmir Halı Saha Kiralama
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sahalar.map((saha) => (
          <div key={saha.id} className="bg-white rounded-lg shadow-lg overflow-hidden border flex flex-col">
            
            {/* İşte fotoğrafları getiren kısım burası */}
            <div className="h-48 w-full bg-gray-200">
              <img 
                src={saha.gorsel_url} 
                alt={saha.isim} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{saha.isim}</h2>
              <p className="text-gray-600 mb-2">📍 Konum: <span className="font-medium">{saha.ilce}</span></p>
              <p className="text-green-600 font-extrabold text-lg mb-4">
                {saha.saatlik_ucret} ₺ <span className="text-sm text-gray-500 font-normal">/ Saat</span>
              </p>
              
              <Link 
                href={`/saha/${saha.id}`} 
                className="mt-auto block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition font-bold"
              >
                Hemen Kirala
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}