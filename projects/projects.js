import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
let selectedIndex = -1;
let filteredProjects=projects;
renderProjects(projects, projectsContainer, 'h2');
function renderPieChart(projectsGiven) {
    let rolledData = d3.rollups(
      projectsGiven,
      (v) => v.length,
      (d) => d.year,
    );
    let data = rolledData.map(([year, count]) => {
        return { value: count, label: year };
      });
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);
    let arcs = arcData.map((d) => arcGenerator(d));
    let newSVG = d3.select('svg'); 
    newSVG.selectAll('path').remove();
    d3.select('.legend').selectAll('li').remove();
    

    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    arcs.forEach((arc, idx) => {
        d3.select('svg')
        .append('path')
        .attr('d', arc)
        .attr('fill',colors(idx)) 
        .on('click', () => {
            selectedIndex = selectedIndex === idx ? -1 : idx;
            
            d3.select('svg')
                .selectAll('path')
                .attr('class', (_, idx) => (
                     idx === selectedIndex ? 'selected' : ''
                     
                ));
            d3.select('.legend')
            .selectAll('li')
            .attr('class', (_, i) => (i === selectedIndex ? 'legend-item selected' : 'legend-item'));
            

            if (selectedIndex === -1) {
                renderProjects(filteredProjects, projectsContainer, 'h2');
            } else {
                const selectedYear = data[selectedIndex].label;
                const filteredProjects = projectsGiven.filter(p => p.year === selectedYear);
                console.log(selectedIndex)
                renderProjects(filteredProjects, projectsContainer, 'h2');
            }

            });
    })

    

    let legend = d3.select('.legend');
    data.forEach((d, idx) => {
        legend.append('li')
            .attr('class', 'legend-item')
            .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
    })
  }

renderPieChart(projects);

let query = '';

let searchInput = document.querySelector('.searchBar');

searchInput.addEventListener('input', (event) => {
  // update query value
  query = event.target.value;
 filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  
  // TODO: render updated projects!
  renderProjects(filteredProjects, projectsContainer, 'h2');
  let newSVG = d3.select('svg'); 
  newSVG.selectAll('path').remove();

  renderPieChart(filteredProjects);
});




