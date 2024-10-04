import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    import('../public/languageData.js').then(module => {
      setLanguages(JSON.parse(module.default));
    });
  }, []);

  if (!languages) return <div>Loading...</div>;

  return (
    <div>
      <h1>{languages.en_us.choose_language}</h1>
      <p>{languages.en_us.free_conversation}</p>
    </div>
  );
}

export default MyComponent;
