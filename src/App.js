import React, { useEffect, useState } from 'react';

const Home = () => {
  const [mergedData, setMergedData] = useState([]);
  const urls = [
    "http://20.244.56.144/numbers/primes",
    "http://20.244.56.144/numbers/fibo",
    "http://20.244.56.144/numbers/odd"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const promises = urls.map(async (url) => {
        try {
          const response = await fetch(url, { timeout: 500 });
          if (!response.ok) {
            throw new Error(`Error fetching data from ${url}`);
          }
          const data = await response.json();
          return data.numbers;
        } catch (error) {
          console.error(error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const merged = [].concat(...results); 
      const uniqueNumbers = [...new Set(merged)]; 
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b); 
      setMergedData(sortedNumbers);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <pre>{JSON.stringify({ numbers: mergedData }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Home;