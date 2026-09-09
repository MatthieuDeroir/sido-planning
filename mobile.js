(() => {
const phone=matchMedia('(max-width:900px)'),planning=location.pathname.endsWith('planning.html');
if(!planning&&phone.matches&&!new URLSearchParams(location.search).has('view')){location.replace('/planning.html#personal-view');return}
const header=document.createElement('header');header.className='phone-header';
header.innerHTML='<a href="/planning.html#personal-view"><img src="/icons/icon.svg" alt="">SIDO Planning</a>';
document.querySelector('.shell').prepend(header);
if(phone.matches)header.append(changeIdentity);
if(phone.matches&&!me&&!identityDialog.open)identityDialog.showModal();
const nav=document.querySelector('.bottom-nav');
nav.innerHTML='<a href="/index.html?view=conferences">Conférences</a><a href="/planning.html#personal-view">Mon planning</a><a href="/planning.html#team-view">Équipe</a>';
function view(){const team=location.hash==='#team-view';document.body.dataset.mobileView=team?'team':'personal';[...nav.children].forEach((a,i)=>{const active=i===(!planning?0:team?2:1);a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
window.addEventListener('hashchange',view);view();
if(planning){
const target=document.querySelector('.personal-quick-list');
function links(){target.querySelectorAll('.personal-quick-item').forEach(item=>{if(item.querySelector('a'))return;const link=document.createElement('a');link.className='btn';link.textContent='Modifier mes choix';link.href='/index.html?view=conferences&q='+encodeURIComponent(item.querySelector('strong').textContent);item.append(link)});
if(!target.querySelector('.personal-quick-item')&&!target.querySelector('a')){const link=document.createElement('a');link.className='btn';link.textContent='Choisir des conférences';link.href='/index.html?view=conferences';target.append(link)}}
new MutationObserver(links).observe(target,{childList:true});links();
}else{const search=new URLSearchParams(location.search).get('q');if(search){q=search;document.querySelector('#search').value=search}}
})();
