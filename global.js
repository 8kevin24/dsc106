console.log('IT’S ALIVE!');

export async function fetchJSON(url) {
  try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      const data = await response.json();
      return data; 
    

  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export async function fetchGithubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}

export function renderProjects(project, containerElement, headingLevel = 'h2') {
  const projectsCount = project.length;
  const titleElement = document.querySelector('.projects-title');
  if (titleElement) titleElement.textContent = `${projectsCount} Projects`;

  containerElement.innerHTML = '';

  project.forEach(p => {
    const article = document.createElement('article');
    const heading = document.createElement(headingLevel);
    
    if (p.url && p.url !== "none") {
      const link = document.createElement('a');
      link.href = p.url;
      link.textContent = p.title;
      link.target = "_blank"; // Open in new tab
      link.classList.add("project-title-link");
      heading.appendChild(link);
    } else {
      heading.textContent = p.title; // Just plain text if no URL
    }

    article.appendChild(heading);
    article.innerHTML += `
      ${p.image ? `<img src="${p.image}" alt="${p.title}">` : '<div class="no-image">No image available</div>'}
      <p>${p.description}</p>
      <p class="project-year">${'c, '+ p.year}</p>
    `;

    

    containerElement.appendChild(article);
  });
}



function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    {url: 'contact/', title: 'Contacts'},
    {url: 'https://github.com/8kevin24', title: 'Github'},
    {url: 'resume/', title: 'Resume'},
    {url: 'meta/',title:'Meta'}
  ];
  let nav = document.createElement('nav');
  document.body.prepend(nav);
  for (let p of pages) {
    const ARE_WE_HOME = document.documentElement.classList.contains('home');
    let url = p.url;
    let title = p.title;
    if (!ARE_WE_HOME && !url.startsWith('http')) {
        url = '../' + url;
      }
      
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
      }
    if (a.host !== location.host) {
        a.target="_blank";
    }
      
      
  }
document.body.insertAdjacentHTML(
'afterbegin',
`
    <label class="color-scheme">
        Theme:
        <select id="theme-selector">
            <option value="automatic">Light Dark</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
        </select>
    </label>
`
);
  
if("colorScheme" in localStorage){
document.documentElement.style.setProperty('color-scheme',localStorage.colorScheme)
}

let select=document.querySelector("select")
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value
  });

let form=document.querySelector("form")
form?.addEventListener('submit',function(event){

    event.preventDefault();
    let data=new FormData(form);
    let url=form.action+"?";

    for (let [name, value] of data) {
        url=url+name+"="+value+"&";
        console.log(name, encodeURIComponent(value));
      }
      url = url.slice(0, -1);
      url+="?";
      location.href = url;
});

  
  