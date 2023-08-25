const urls = [
    "https://pokeapi.co/api/v2/type/-1", // 404 
    "https://pokeapi.co/api/v2/type/0", // 404
    "https://pokeapi.co/api/v2/type/1",
    "https://pokeapi.co/api/v2/type/2",
  ];
  
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const handleFailedRequest = async (url, index) => {
    console.log(`API call ${url} failed, moving to the end of the array`);
    urls.push(urls.splice(index, 1)[0]);
    await delay(1000);
  };
  
  const makeAPICalls = async () => {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
  
      try {
        const response = await fetch(url);
        if (response.ok) {
          console.log(`API call ${url} successful`);
          await delay(1000);
        } else {
          await handleFailedRequest(url, i);
          i--;
        }
      } catch (error) {
        console.error(`An error occurred while calling ${url}: ${error}`);
        await handleFailedRequest(url, i);
        i--;
      }
    }
  };
  makeAPICalls();
