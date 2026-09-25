'use client';

import { useId, type ReactNode, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, type LucideIcon } from 'lucide-react';
import { dateLabel, type Person, type Priority, number } from '@/lib/demo-data';

export function Avatar({ person, size='md' }: { person: Person; size?: 'sm'|'md'|'lg'|'xl' }) {
  return <span className={`avatar avatar-${size}`} role="img" aria-label={`Fictional portrait of ${person.name}`} style={{backgroundPosition:`${(person.portrait%4)*100/3}% ${Math.floor(person.portrait/4)*50}%`}} />;
}
export function Badge({ priority }: { priority: Priority }) { return <span className={`badge ${priority.toLowerCase()}`}><span />{priority}</span>; }
export function Change({ value, suffix='pts' }: {value:number;suffix?:string}) { const Icon=value>=0?ArrowUpRight:ArrowDownRight; return <span className={`change ${value>=0?'positive':'negative'}`}><Icon size={14}/>{Math.abs(value)} {suffix}</span>; }
export function Panel({title,subtitle,action,children,className=''}:{title:string;subtitle?:string;action?:ReactNode;children:ReactNode;className?:string}) { return <section className={`panel ${className}`}><div className="panel-head"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>{children}</section>; }
export function Select({value,onChange,label,options}:{value:string;onChange:(v:string)=>void;label:string;options:string[]}) {return <label className="select-wrap"><span className="sr-only">{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select><ChevronDown size={14}/></label>;}
export function Metric({title,value,unit,sub,icon:Icon,tone='teal',children}:{title:string;value:string|number;unit?:string;sub:string;icon:LucideIcon;tone?:string;children?:ReactNode}) {return <section className={`metric ${tone}`}><div className="metric-label"><span>{title}</span><span className="metric-icon"><Icon size={19}/></span></div><div className="metric-value">{value}{unit&&<span>{unit}</span>}</div><div className="metric-bottom"><span>{sub}</span>{children}</div></section>;}
export function Empty({title='No matching records',description='Try a different search or filter.',action}:{title?:string;description?:string;action?:ReactNode}) {return <div className="empty-state"><span className="empty-symbol">○</span><h3>{title}</h3><p>{description}</p>{action}</div>;}

export type ChartSeries={name:string;color:string;values:{date:string;value:number}[]};
export function LineChart({series,max=100,min=0,height=230,compact=false,label='Wellbeing trend'}:{series:ChartSeries[];max?:number;min?:number;height?:number;compact?:boolean;label?:string}) {
  const id=useId().replace(/:/g,'');
  const width=620, left=compact?0:35,right=compact?0:10,top=10,bottom=compact?4:28;
  const plotH=height-top-bottom,plotW=width-left-right;
  const y=(v:number)=>top+(1-(v-min)/(max-min))*plotH;
  const x=(i:number)=>left+i/Math.max(1,series[0].values.length-1)*plotW;
  const ticks=[0,1,2,3,4].map(i=>min+(max-min)*i/4);
  const labelEvery=Math.ceil(series[0].values.length/7);
  return <div className={`line-chart ${compact?'compact-chart':''}`}><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
    <title>{label} — synthetic values</title><defs><linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={series[0].color} stopOpacity=".15"/><stop offset="1" stopColor={series[0].color} stopOpacity="0"/></linearGradient></defs>
    {!compact&&ticks.map(t=><g key={t}><line x1={left} x2={width-right} y1={y(t)} y2={y(t)} className="gridline"/><text x={left-10} y={y(t)+4} textAnchor="end" className="axis-text">{number(t,max<=10?1:0)}</text></g>)}
    {series.map((s,k)=>{const points=s.values.map((v,i)=>`${x(i)},${y(v.value)}`).join(' ');return <g key={s.name}>{k===0&&<polygon points={`${left},${height-bottom} ${points} ${width-right},${height-bottom}`} fill={`url(#${id}-fill)`}/>}<polyline points={points} fill="none" stroke={s.color} strokeWidth={compact?2:2.5} strokeLinejoin="round" strokeLinecap="round"/>{!compact&&s.values.map((v,i)=><circle key={v.date} cx={x(i)} cy={y(v.value)} r={s.values.length>14?2:3.5} fill="white" stroke={s.color} strokeWidth="2"><title>{s.name}: {number(v.value,1)} · {dateLabel(v.date)}</title></circle>)}</g>;})}
    {!compact&&series[0].values.map((v,i)=>(i%labelEvery===0||i===series[0].values.length-1)&&<text key={v.date} x={x(i)} y={height-5} textAnchor={i===0?'start':i===series[0].values.length-1?'end':'middle'} className="axis-text">{dateLabel(v.date,true)}</text>)}
  </svg>{!compact&&<div className="chart-legend">{series.map(s=><span key={s.name}><i style={{background:s.color}}/>{s.name}</span>)}</div>}</div>;
}
export function Sparkline({person}:{person:Person}) { const values=person.history.slice(-7).map(h=>h.wellbeing);const min=Math.min(...values)-2,max=Math.max(...values)+2;return <svg className="sparkline" viewBox="0 0 88 26" role="img" aria-label={`Wellbeing ${person.trend>=0?'increased':'decreased'} by ${Math.abs(person.trend)} points this week`}><polyline points={values.map((v,i)=>`${i*14+2},${24-(v-min)/(max-min)*22}`).join(' ')} fill="none" stroke={person.trend>=0?'#198f86':person.priority==='Watch'?'#c28b36':'#dc7867'} strokeWidth="2" strokeLinejoin="round"/></svg>; }
export function BarChart({values,max=10,unit='h'}:{values:{date:string;value:number}[];max?:number;unit?:string}) { const cols=values.length>7?values.filter((_,i)=>i%Math.ceil(values.length/7)===0):values;return <div className="bar-chart" role="img" aria-label={`Values ${cols.map(v=>`${dateLabel(v.date,true)} ${v.value}${unit}`).join(', ')}`}><div className="bar-grid">{cols.map(v=><div className="bar-column" key={v.date}><span className="bar-value">{number(v.value,1)}</span><div className="bar-track"><i style={{height:`${v.value/max*100}%`}}/></div><span className="bar-label">{dateLabel(v.date,true)}</span></div>)}</div></div>;}
export function Progress({value,color}:{value:number;color?:string}) {return <div className="progress"><i style={{width:`${value}%`,background:color}}/></div>;}
export function Ring({value,label,size=100}:{value:number;label:string;size?:number}) {return <div className="ring" style={{'--value':`${value}%`,width:size,height:size} as CSSProperties}><div><strong>{value}<small>%</small></strong><span>{label}</span></div></div>;}
