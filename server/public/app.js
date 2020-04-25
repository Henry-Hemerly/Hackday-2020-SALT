document.querySelector('header').innerHTML = 
`
<h2>Password Genie</h2><br>
<p class="headerSubtitle">Ever wondered how secure your password is?</p>
`;

const searchInput = document.querySelector('.searchInput');
const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', async () => {
    const backendFetch = await fetch('http://localhost:3000/' + searchInput.value);
    const resolvedFetch = await Promise.resolve(backendFetch);
    const fetchValue = await resolvedFetch.text();
    const resultSection = document.querySelector('.result');
    const newP = document.createElement('div');
    newP.innerHTML = fetchValue;
    resultSection.appendChild(newP);
    console.log(fetchValue);
    
    
    
    
    // .then(res => {
    //     const resultSection = document.querySelector('.result');
    //     const newP = document.createElement('p')   
    //     newP.innerText = res.body;
    //     resultSection.appendChild(newP);
    // })
    // .then(parsed => console.log('AYE', parsed.text()));

});