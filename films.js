let nameH1;
let producer1;
let episode_id;
let director1;
let opening_crawl1;
let charactersUl;
let planetU1;
const baseUrl = `https://swapi2.azurewebsites.net/api/`;

addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  Released1 = document.querySelector('span#Released');
  episode_id = document.querySelector('span#episode_id');
  director1 = document.querySelector('span#director');
  producer1 = document.querySelector('span#producer');
  opening_crawl1 = document.querySelector('span#opening_crawl');
  charactersUl = document.querySelector('#character>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getfilm(id)
});

async function getfilm(id) {
  let films;
  try {
    films = await fetchfilms(id)
    films.character = await fetchCharacter(id)
  }
  catch (ex) {
    console.error(`Error reading films ${id} data.`, ex.message);
  }
  renderfilms(films);


}

async function fetchfilms(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacter(film) {
  console.log({film})
  const characterUrl = `${baseUrl}/films/${film}/characters`;

  const characters = await fetch(characterUrl)
    .then(res => res.json())
  return characters;
}
async function fetchplanet(film) {
  console.log({film})
  const characterUrl = `${baseUrl}/films/${film}/characters`;

  const characters = await fetch(characterUrl)
    .then(res => res.json())
  return characters;
const renderfilms = films => {
 // Just to make the browser tab say their name
 
  nameH1.textContent = films?.title;
  Released1.textContent = films?.release_date;
  episode_id.textContent = films?.episode_id;
  director1.textContent = films?.director;
  producer1.textContent = films?.producer;
  opening_crawl1.textContent = films?.opening_crawl;
  const characterLis = films.character?.map (character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  console.log(characterLis);
  charactersUl.innerHTML = characterLis.join("");

}


 




