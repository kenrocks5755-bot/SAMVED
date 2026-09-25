'use client';

import { useState } from 'react';
import { ArrowDownRight, ArrowRight, Camera, CheckCircle2, ChevronRight, Clock3, HeartHandshake, LockKeyhole, MessageCircle, Moon, Search, ShieldAlert, Users } from 'lucide-react';
import { priorities, priorityOrder, type Person, type Priority } from '@/lib/demo-data';
import { Avatar, Badge, Empty, LineChart } from './ui';

const descriptions:Record<Priority,string>={Critical:'Highest review priority',High:'Increased support needs',Watch:'Keep an eye on patterns',Stable:'Routine wellbeing support'};
const icons={Critical:ShieldAlert,High:HeartHandshake,Watch:Clock3,Stable:CheckCircle2};
export function PriorityQueue({roster,openPerson}:{roster:Person[];openPerson:(p:Person)=>void}) {
  const [level,setLevel]=useState<Priority|'Needs support'>('Needs support');const [query,setQuery]=useState('');const [selectedId,setSelectedId]=useState('');
  const filtered=roster.filter(p=>(level==='Needs support'?p.priority!=='Stable':p.priority===level)&&`${p.name} ${p.id} ${p.sector}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>priorityOrder[a.priority]-priorityOrder[b.priority]||a.score-b.score);
  const selected=filtered.find(p=>p.id===selectedId)||filtered[0];
  return <><div className="priority-metrics">{priorities.map(p=>{const Icon=icons[p];return <button key={p} className={`priority-metric ${p.toLowerCase()} ${level===p?'selected':''}`} aria-pressed={level===p} onClick={()=>{setLevel(p);setSelectedId('');}}><span className="priority-metric-icon"><Icon size={22}/></span><div><span>{p}</span><strong>{roster.filter(r=>r.priority===p).length}</strong><small>{descriptions[p]}</small></div><ChevronRight size={15}/></button>;})}</div>
    <div className="queue-toolbar"><button className={`chip-button ${level==='Needs support'?'active':''}`} onClick={()=>setLevel('Needs support')}>All support priorities</button><span>{filtered.length} personnel · sorted by support priority</span><div className="field-search"><Search size={15}/><input aria-label="Search priority queue" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find personnel…"/></div></div>
    <div className="priority-workspace"><section className="panel queue-list" aria-label="Ranked personnel"><div className="queue-list-head"><span>PERSONNEL</span><span>PRIORITY</span></div>{filtered.length?filtered.map((p,i)=><button key={p.id} className={`queue-row ${selected?.id===p.id?'selected':''}`} onClick={()=>setSelectedId(p.id)} aria-pressed={selected?.id===p.id}><span className="queue-rank">{i+1}</span><Avatar person={p}/><span className="person-name"><strong>{p.name}</strong><small>{p.rank} · {p.location}</small><span className="reason-preview">{p.reasons[0]}</span></span><Badge priority={p.priority}/><ChevronRight size={15}/></button>):<Empty title="No personnel in this group" description="Choose another support level or clear your search."/>}</section>
      {selected?<PriorityDetail person={selected} openPerson={openPerson}/>:<section className="panel"><Empty title="No profile selected" description="A matching profile will appear here."/></section>}</div>
  </>;
}

function PriorityDetail({person:p,openPerson}:{person:Person;openPerson:(p:Person)=>void}) {
  const week=p.history.slice(-7),sleepDelta=+(p.sleep-week[0].sleep).toFixed(1),interactionDelta=p.interaction-week[0].interaction;
  return <section className="panel priority-detail"><div className="priority-profile-head"><Avatar person={p} size="lg"/><div><h2>{p.name}</h2><p>{p.rank} · {p.id}</p><small>{p.sector} · {p.location}</small></div><Badge priority={p.priority}/></div>
    <div className="priority-detail-body"><div className="section-label"><ShieldAlert size={16}/><h3>Why this needs review</h3></div><p className="priority-summary">{p.summary}</p><div className="reason-tags">{p.reasons.map(r=><span key={r}>{r}</span>)}</div>
    <div className="review-signals"><div><Moon size={17}/><span>Sleep change</span><strong className={sleepDelta<0?'negative':'positive'}>{sleepDelta>0?'+':''}{numberSign(sleepDelta)}<small> hrs</small></strong><p>Over the last 7 days</p><span className="source-label"><Camera size={11}/>Visual</span></div><div><MessageCircle size={17}/><span>Latest mood</span><strong>{p.mood}</strong><p>{p.checkedInToday?'Today':'Yesterday'} · {p.checkInTime} IST</p><span className="source-label app"><MessageCircle size={11}/>App check-in</span></div><div><Users size={17}/><span>Interaction</span><strong className={interactionDelta<0?'negative':'positive'}>{interactionDelta>0?'+':''}{interactionDelta}<small> pts</small></strong><p>Over the last 7 days</p><span className="source-label"><Camera size={11}/>Visual</span></div></div>
    <div className="priority-chart"><h3>Recent wellbeing pattern</h3><LineChart height={155} series={[{name:'Illustrative index',color:p.priority==='Stable'?'#238c84':'#cf9777',values:week.map(h=>({date:h.date,value:h.wellbeing}))}]} min={20} max={100}/></div>
    <div className="privacy-strip"><LockKeyhole size={17}/><span><strong>Personal conversations remain private</strong><small>Only broad themes and check-in patterns are shown.</small></span></div><button className="primary-button full-width" onClick={()=>openPerson(p)}>View full personnel profile <ArrowRight size={16}/></button><p className="review-note">Support labels are fictional and intended for human review.</p></div>
  </section>;
}
const numberSign=(n:number)=>n.toFixed(1);
