'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Activity, ArrowRight, ArrowUpRight, Bell, CalendarDays, Camera, Check, ChevronRight, CircleHelp, ClipboardCheck, Database, Download, Eye, HeartPulse, House, LayoutDashboard, LockKeyhole, Menu, MessageCircle, Moon, Search, ShieldCheck, ShieldAlert, Users, X, Zap } from 'lucide-react';
import { people, cameras, sectors, priorities, getPeople, getSeries, completion, mean, number, snapshot, snapshotTime, priorityOrder, type Person, type View } from '@/lib/demo-data';
import { Avatar, Badge, Change, LineChart, Metric, Panel, Select } from './ui';
import { Analytics } from './analytics';
import { Personnel } from './personnel';
import { PriorityQueue } from './priority';
import { Monitoring } from './monitoring';
import { Profile } from './profile';
import { Dialog } from './dialog';

const navigation = [
  {key:'home',label:'Home',hindi:'होम',href:'/',icon:House},
  {key:'dashboard',label:'Dashboard',hindi:'डैशबोर्ड',href:'/dashboard/',icon:LayoutDashboard},
  {key:'database',label:'Database',hindi:'कार्मिक विवरण',href:'/database/',icon:Database},
  {key:'priority',label:'Priority',hindi:'प्राथमिकता',href:'/priority/',icon:ShieldAlert},
  {key:'monitoring',label:'Monitoring',hindi:'निगरानी',href:'/monitoring/',icon:Camera},
];
const viewLabels:Record<View,{title:string;subtitle:string;hindi:string}> = {
  home:{title:'Command overview',subtitle:'A connected view of personnel wellbeing, support needs and daily patterns.',hindi:'कार्मिक कल्याण अवलोकन'},
  dashboard:{title:'Wellbeing analytics',subtitle:'Explore patterns across visual signals and daily app check-ins.',hindi:'कल्याण विश्लेषण'},
  database:{title:'Personnel database',subtitle:'Individual profiles, app engagement and wellbeing signals in one place.',hindi:'कार्मिक विवरण'},
  priority:{title:'Priority queue',subtitle:'Understand changing patterns and identify who may need support.',hindi:'प्राथमिकता सूची'},
  monitoring:{title:'Visual monitoring',subtitle:'Explore simulated observations from Indian training camps.',hindi:'दृश्य निगरानी'},
};

export function exportPeople(roster:Person[]) {
  const headings=['Demo data','Personnel ID','Name','Rank','Sector','Location','Priority','Illustrative index','Sleep hours','Energy','Interaction','Mood','Emotion label','Influence','Check-ins (7 days)','App sessions (7 days)'];
  const quote=(v:string|number)=>`"${String(v).replaceAll('"','""')}"`;
  const rows=roster.map(p=>['SYNTHETIC',p.id,p.name,p.rank,p.sector,p.location,p.priority,p.score,p.sleep,p.energy,p.interaction,p.mood,p.emotion,p.influence,p.history.slice(-7).filter(h=>h.checkedIn).length,p.sessions]);
  const csv='\uFEFF'+[headings,...rows].map(r=>r.map(quote).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  const a=document.createElement('a');a.href=url;a.download='SAMVED-demo-personnel-25-Sep-2026.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export function SamvedApp({view}:{view:View}) {
  const [sector,setSector]=useState('All sectors');const [days,setDays]=useState('Last 7 days');
  const [query,setQuery]=useState('');const [mobileOpen,setMobileOpen]=useState(false);
  const [selected,setSelected]=useState<Person|null>(null);const [about,setAbout]=useState(false);
  const [toast,setToast]=useState('');
  const roster=getPeople(sector);const countDays=parseInt(days.replace('Last ',''));
  const searchMatches=query.trim()?people.filter(p=>`${p.name} ${p.id} ${p.rank} ${p.sector} ${p.location}`.toLowerCase().includes(query.toLowerCase())).slice(0,5):[];
  useEffect(()=>{const id=new URLSearchParams(window.location.search).get('person');if(id)setSelected(people.find(p=>p.id===id)||null);},[]);
  useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),3200);return()=>clearTimeout(id);},[toast]);
  const openPerson=(p:Person)=>{setSelected(p);setQuery('');};
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a>
    {mobileOpen&&<button className="sidebar-backdrop" aria-label="Close navigation" onClick={()=>setMobileOpen(false)}/>}
    <aside className={`sidebar ${mobileOpen?'is-open':''}`}>
      <Link href="/" className="brand" aria-label="SAMVED home"><img src="/favicon.svg" alt="" width="43" height="43"/><span>SAMVED<small>PERSONNEL WELLBEING</small></span></Link>
      <div className="sidebar-label">ADMIN WORKSPACE</div>
      <nav aria-label="Main navigation">{navigation.map(({key,label,hindi,href,icon:Icon})=><Link key={key} href={href} className={`nav-item ${view===key?'active':''}`} aria-current={view===key?'page':undefined} onClick={()=>setMobileOpen(false)}><Icon size={20}/><span>{label}<small lang="hi">{hindi}</small></span>{key==='priority'&&<b>{people.filter(p=>p.priority==='Critical'||p.priority==='High').length}</b>}</Link>)}</nav>
      <div className="sidebar-foot"><div className="privacy-message"><ShieldCheck size={23}/><strong>People first.<br/>Privacy always.</strong><p>Only wellbeing summaries.<br/>Personal conversations stay private.</p></div><button className="demo-info" onClick={()=>setAbout(true)}><span className="demo-dot"/><span>Demo environment</span><CircleHelp size={15}/></button><div className="admin-user"><span className="admin-avatar">AD</span><div><strong>Admin workspace</strong><small>Intranet prototype</small></div></div></div>
    </aside>
    <div className="workspace"><header className="topbar"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={()=>setMobileOpen(true)}><Menu size={22}/></button>
      <div className="global-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search personnel, ID or sector…" aria-label="Search all personnel" onKeyDown={e=>{if(e.key==='Escape')setQuery('');if(e.key==='Enter'&&searchMatches[0])openPerson(searchMatches[0]);}}/>{query&&<button aria-label="Clear global search" onClick={()=>setQuery('')}><X size={15}/></button>}
        {query.trim()&&<div className="search-results">{searchMatches.length?searchMatches.map(p=><button key={p.id} onClick={()=>openPerson(p)}><Avatar person={p} size="sm"/><span><strong>{p.name}</strong><small>{p.id} · {p.sector}</small></span><Badge priority={p.priority}/></button>):<p>No matching personnel.</p>}</div>}
      </div><div className="topbar-right"><span className="snapshot-date"><CalendarDays size={15}/>{snapshot}<small>IST</small></span><span className="top-divider"/><Link href="/priority/" className="notification" aria-label="View priority queue"><Bell size={20}/><b>{people.filter(p=>p.priority==='Critical').length}</b></Link><span className="admin-avatar">AD</span></div>
    </header>
    <main id="main-content" className="main-content"><div className="page-heading"><div><div className="eyebrow">SAMVED <span>/</span> {navigation.find(n=>n.key===view)?.label}</div><h1>{viewLabels[view].title}</h1><p>{viewLabels[view].subtitle}</p></div><span className="demo-badge"><span/>Synthetic demo data</span></div>
      <div className="scope-bar"><div className="scope-filters"><Select value={sector} onChange={setSector} label="Filter by sector" options={['All sectors',...sectors]}/>{(view==='home'||view==='dashboard')&&<Select value={days} onChange={setDays} label="Date range" options={['Last 7 days','Last 14 days','Last 30 days']}/>}</div><span className="snapshot-note">Snapshot · {snapshot} · {snapshotTime}</span></div>
      {view==='home'&&<Home roster={roster} days={countDays} openPerson={openPerson}/>}
      {view==='dashboard'&&<Analytics roster={roster} days={countDays} onExport={()=>{exportPeople(roster);setToast(`Exported ${roster.length} fictional personnel records`);}}/>}
      {view==='database'&&<Personnel roster={roster} openPerson={openPerson} onExport={rows=>{exportPeople(rows);setToast(`Exported ${rows.length} fictional personnel records`);}}/>}
      {view==='priority'&&<PriorityQueue roster={roster} openPerson={openPerson}/>}
      {view==='monitoring'&&<Monitoring sector={sector}/>}
      <footer className="page-footer"><span>SAMVED <i/> Personnel wellbeing & support</span><span>Fictional records · {snapshot} snapshot</span></footer>
    </main></div>
    {selected&&<Profile person={selected} onClose={()=>setSelected(null)}/>}
    {about&&<Dialog title="About this demo" onClose={()=>setAbout(false)}><div className="about-content"><ShieldCheck size={32}/><h2>Designed around people.</h2><p>All personnel, portraits, readings, priority labels and camp scenes in this prototype are fictional.</p><p>Phone app insights contain broad themes and check-in trends. Personal chat transcripts are never included. Monitoring scenes and detection boxes are simulated.</p><p>This local demonstration is a visual preview of a support workflow; it has no account authentication or live phone, model or camera connection.</p></div></Dialog>}
    {toast&&<div role="status" className="toast"><Check size={18}/>{toast}</div>}
  </div>;
}

function Home({roster,days,openPerson}:{roster:Person[];days:number;openPerson:(p:Person)=>void}) {
  const high=roster.filter(p=>p.priority==='Critical'||p.priority==='High');
  const today=roster.filter(p=>p.checkedInToday).length;
  const queue=roster.filter(p=>p.priority!=='Stable').sort((a,b)=>priorityOrder[a.priority]-priorityOrder[b.priority]||a.score-b.score).slice(0,4);
  const lowSleep=roster.filter(p=>p.sleep<6).length;
  const commonInfluence=Object.entries(roster.reduce<Record<string,number>>((acc,p)=>({...acc,[p.influence]:(acc[p.influence]||0)+1}),{})).sort((a,b)=>b[1]-a[1])[0];
  return <>
    <div className="metric-grid"><Metric title="Personnel monitored" value={number(roster.length)} sub={`${new Set(roster.map(p=>p.sector)).size} sectors in this view`} icon={Users} tone="blue"/><Metric title="Priority cases" value={high.length} sub="Critical & high support priority" icon={ShieldAlert} tone="amber"/><Metric title="Check-ins today" value={`${today}/${roster.length}`} sub={`${completion(roster,days)}% completion over ${days} days`} icon={ClipboardCheck}/><Metric title="Average wellbeing" value={Math.round(mean(roster.map(p=>p.score)))} unit="/100" sub="Illustrative combined index" icon={HeartPulse} tone="violet"/></div>
    <div className="home-primary"><Panel title="Wellbeing at a glance" subtitle={`Patterns across the last ${days} days`} action={<Link href="/dashboard/" className="text-link">Explore analytics <ArrowUpRight size={15}/></Link>}><LineChart series={[{name:'Wellbeing',color:'#238c84',values:getSeries(roster,days,'wellbeing')},{name:'Energy',color:'#539ddb',values:getSeries(roster,days,'energy')},{name:'Interaction',color:'#c39754',values:getSeries(roster,days,'interaction')}]}/><div className="chart-caption"><Activity size={14}/><span>Showing group averages · higher values indicate stronger demo signals</span></div></Panel>
      <Panel title="Needs attention" subtitle="People who may need support" action={<Link href="/priority/" className="text-link">View queue <ArrowRight size={15}/></Link>} className="attention-panel"><div className="attention-list">{queue.length?queue.map((p,i)=><button key={p.id} className="attention-row" onClick={()=>openPerson(p)}><span className="rank-number">{i+1}</span><Avatar person={p}/><span className="person-name"><strong>{p.name}</strong><small>{p.rank} · {p.location}</small></span><Badge priority={p.priority}/><ChevronRight size={15}/></button>):<p className="muted">No priority cases in this sector.</p>}</div><div className="attention-foot"><LockKeyhole size={14}/>Broad signals only. Conversations stay private.</div></Panel></div>
    <div className="home-secondary"><Panel title="What the signals are telling us" subtitle="Visual observations & app check-ins"><div className="insight-list"><div><span className="insight-icon amber"><Moon size={19}/></span><section><strong>{lowSleep} personnel averaging under 6 hours of rest</strong><p>Visual model · latest simulated rest period</p></section></div><div><span className="insight-icon blue"><MessageCircle size={19}/></span><section><strong>{commonInfluence[0]} is a leading daily influence</strong><p>App check-ins · {commonInfluence[1]} of {roster.length} personnel</p></section></div><div><span className="insight-icon teal"><ClipboardCheck size={19}/></span><section><strong>{completion(roster,days)}% check-in completion</strong><p>App activity · past {days} days in this view</p></section></div></div></Panel>
      <Panel title="From the training camps" subtitle="A view into the monitoring demonstration" action={<Link href="/monitoring/" className="text-link">Open monitoring <ArrowRight size={15}/></Link>}><div className="camp-previews">{cameras.filter(c=>roster.some(p=>p.sector===c.sector)).slice(0,2).map(c=><Link href={`/monitoring/?camera=${c.id}`} key={c.id} className="camp-preview"><img src={c.image} alt={`Generated scene: ${c.name}`} width="400" height="225"/><span className="image-demo">SIMULATED</span><div><Camera size={15}/><span><strong>{c.name}</strong><small>{c.location}</small></span><ChevronRight size={16}/></div></Link>)}</div></Panel></div>
  </>;
}
