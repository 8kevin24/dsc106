console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    {url: 'contact/', title: 'Contacts'},
    {url: 'https://github.com/8kevin24', title: 'Github'},
    {url: 'resume/', title: 'Resume'}
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
              <option value="automatic">Automatic</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
          </select>
      </label>
    `
  );

select=document.querySelector(selector)
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value
  });

  if("colorScheme" in localStorage){
    
  }
  
  