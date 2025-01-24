console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Kevin Zhu: Personal Site and Portfolio' },
    { url: 'projects/', title: 'Kevin\'s Portfolio' },
    {url: 'contact/', title: 'Kevin\'s contact'},
    {url: 'resume/', title: 'Kevin\'s Resume'}
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
  
  