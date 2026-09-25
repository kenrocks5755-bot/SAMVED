export type Priority = 'Critical' | 'High' | 'Watch' | 'Stable';
export type View = 'home' | 'dashboard' | 'database' | 'priority' | 'monitoring';
export type HistoryPoint = { date: string; wellbeing: number; sleep: number; energy: number; interaction: number; mood: number; checkedIn: boolean };
export type Person = {
  id: string; name: string; rank: string; sector: string; location: string; portrait: number;
  priority: Priority; score: number; sleep: number; sleepQuality: number; energy: number; interaction: number;
  mood: string; emotion: string; influence: string; summary: string; reasons: string[];
  checkInTime: string; checkedInToday: boolean; sessions: number; minutes: number;
  trend: number; history: HistoryPoint[];
};

export const snapshot = '25 Sep 2026';
export const snapshotTime = '14:40 IST';
export const priorities: Priority[] = ['Critical', 'High', 'Watch', 'Stable'];
export const priorityOrder: Record<Priority, number> = { Critical: 0, High: 1, Watch: 2, Stable: 3 };
export const sectors = ['Northern Sector', 'Eastern Sector', 'Central Sector', 'Southern Sector'];
export const number = (n: number, decimals = 0) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
export const mean = (items: number[]) => items.length ? items.reduce((a,b) => a+b,0) / items.length : 0;
export function dateLabel(date: string, short = false) { return new Intl.DateTimeFormat('en-IN', short ? { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' } : { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(date+'T12:00:00+05:30')); }

const records: Omit<Person, 'history'>[] = [
  {id:'SV-2048',name:'Aarav Sharma',rank:'Havildar',sector:'Northern Sector',location:'Leh',portrait:0,priority:'Critical',score:42,sleep:4.6,sleepQuality:41,energy:39,interaction:32,mood:'Very low',emotion:'Overwhelmed',influence:'Work',summary:'Recent check-ins suggest ongoing work pressure and difficulty resting. App engagement and observed social activity have decreased over the past week.',reasons:['Sleep disruption','Work pressure','Reduced interaction'],checkInTime:'07:42',checkedInToday:true,sessions:3,minutes:8,trend:-14},
  {id:'SV-3105',name:'Meera Nair',rank:'Captain',sector:'Eastern Sector',location:'Tezpur',portrait:1,priority:'High',score:55,sleep:5.4,sleepQuality:52,energy:50,interaction:46,mood:'Low',emotion:'Anxious',influence:'Work',summary:'Workload is appearing repeatedly in daily check-ins. Sleep has become less regular, while the latest broad chat signals suggest anxiety.',reasons:['Work pressure','Low mood','Irregular sleep'],checkInTime:'08:15',checkedInToday:true,sessions:5,minutes:14,trend:-9},
  {id:'SV-4176',name:'Harpreet Singh',rank:'Naik',sector:'Central Sector',location:'Jabalpur',portrait:2,priority:'Watch',score:66,sleep:6.1,sleepQuality:64,energy:62,interaction:59,mood:'Okay',emotion:'Tired',influence:'Sleep',summary:'Energy has dipped slightly during the week. Check-ins remain consistent, with sleep named as the main influence.',reasons:['Lower energy','Sleep routine'],checkInTime:'06:48',checkedInToday:true,sessions:4,minutes:11,trend:-4},
  {id:'SV-5230',name:'Kavya Menon',rank:'Lieutenant',sector:'Southern Sector',location:'Bengaluru',portrait:3,priority:'Stable',score:85,sleep:7.4,sleepQuality:83,energy:81,interaction:79,mood:'Good',emotion:'Calm',influence:'Health',summary:'Regular check-ins and stable rest patterns are accompanied by positive mood signals and consistent social activity.',reasons:['Consistent check-ins','Stable rest'],checkInTime:'09:03',checkedInToday:true,sessions:6,minutes:13,trend:5},
  {id:'SV-6189',name:'Rohan Deshmukh',rank:'Sepoy',sector:'Northern Sector',location:'Jammu',portrait:4,priority:'Critical',score:39,sleep:4.4,sleepQuality:38,energy:37,interaction:28,mood:'Very low',emotion:'Isolated',influence:'Relationships',summary:'Recent check-ins indicate feeling disconnected. This coincides with reduced rest and fewer observed social interactions in the demonstration data.',reasons:['Feeling isolated','Sleep disruption','Missed check-ins'],checkInTime:'20:18',checkedInToday:false,sessions:2,minutes:6,trend:-16},
  {id:'SV-7091',name:'Ananya Singh',rank:'Captain',sector:'Northern Sector',location:'Srinagar',portrait:5,priority:'Stable',score:82,sleep:7.2,sleepQuality:80,energy:79,interaction:77,mood:'Good',emotion:'Positive',influence:'Relationships',summary:'Mood and sleep patterns have remained steady. Check-ins reflect a sense of connection and a manageable routine.',reasons:['Positive mood','Steady routine'],checkInTime:'08:32',checkedInToday:true,sessions:7,minutes:15,trend:4},
  {id:'SV-8264',name:'Vikram Rao',rank:'Subedar',sector:'Eastern Sector',location:'Jorhat',portrait:6,priority:'High',score:57,sleep:5.6,sleepQuality:55,energy:53,interaction:47,mood:'Low',emotion:'Stressed',influence:'Work',summary:'A downward mood trend is accompanied by shorter rest periods. Work pressure is the most frequent check-in theme.',reasons:['Mood decline','Work pressure'],checkInTime:'07:20',checkedInToday:true,sessions:4,minutes:10,trend:-8},
  {id:'SV-9032',name:'Simran Kaur',rank:'Lieutenant',sector:'Central Sector',location:'Bhopal',portrait:7,priority:'Watch',score:68,sleep:6.2,sleepQuality:66,energy:65,interaction:61,mood:'Okay',emotion:'Reflective',influence:'Relationships',summary:'A small change in social activity is visible this week. Daily check-ins remain neutral and regular.',reasons:['Interaction change','Neutral mood'],checkInTime:'08:51',checkedInToday:true,sessions:5,minutes:12,trend:-3},
  {id:'SV-1043',name:'Dev Patel',rank:'Lance Naik',sector:'Southern Sector',location:'Secunderabad',portrait:8,priority:'High',score:53,sleep:5.2,sleepQuality:50,energy:48,interaction:43,mood:'Low',emotion:'Worried',influence:'Health',summary:'Health concerns have appeared in recent check-ins. Rest and energy indicators have also declined during the current week.',reasons:['Health concerns','Lower energy','Sleep disruption'],checkInTime:'21:05',checkedInToday:false,sessions:3,minutes:9,trend:-10},
  {id:'SV-2876',name:'Farhan Ali',rank:'Havildar',sector:'Eastern Sector',location:'Guwahati',portrait:9,priority:'Watch',score:69,sleep:6.3,sleepQuality:67,energy:64,interaction:62,mood:'Okay',emotion:'Homesick',influence:'Relationships',summary:'Check-ins mention missing family. Other demo signals remain broadly steady, with a mild decrease in engagement.',reasons:['Missing family','Engagement change'],checkInTime:'09:12',checkedInToday:true,sessions:4,minutes:10,trend:-2},
  {id:'SV-6391',name:'Nikhil Iyer',rank:'Major',sector:'Central Sector',location:'Pune',portrait:10,priority:'Stable',score:89,sleep:7.7,sleepQuality:88,energy:86,interaction:84,mood:'Great',emotion:'Confident',influence:'Work',summary:'Consistent check-ins show a positive outlook. Rest, activity and interaction measures have remained stable.',reasons:['Positive outlook','Regular activity'],checkInTime:'06:35',checkedInToday:true,sessions:5,minutes:12,trend:6},
  {id:'SV-7312',name:'Tenzin Dorjee',rank:'Naik',sector:'Southern Sector',location:'Chennai',portrait:11,priority:'Stable',score:84,sleep:7.3,sleepQuality:82,energy:80,interaction:78,mood:'Good',emotion:'Content',influence:'Health',summary:'Recent check-ins reflect a balanced routine, with consistent sleep and social engagement in the demo period.',reasons:['Balanced routine','Regular rest'],checkInTime:'07:54',checkedInToday:true,sessions:6,minutes:14,trend:4},
];

export const people: Person[] = records.map((p, index) => ({ ...p, history: Array.from({length:30}, (_,i) => {
  const date = new Date(Date.UTC(2026,7,27+i)).toISOString().slice(0,10);
  const offset=(29-i)/7;
  const wave=i===29?0:Math.sin((i+index)*1.8)*1.3;
  const wellbeing=Math.max(20,Math.min(96,Math.round(p.score-p.trend*Math.min(offset,1.8)+wave)));
  const mood=Math.max(1,Math.min(5,Math.round((wellbeing-20)/16)));
  return {date,wellbeing,sleep:+Math.max(3.5,Math.min(8.4,p.sleep-p.trend*.035*Math.min(offset,2)+wave*.1)).toFixed(1), energy:Math.round(Math.min(98,Math.max(20,p.energy-p.trend*.7*Math.min(offset,2)+wave))),interaction:Math.round(Math.min(95,Math.max(15,p.interaction-p.trend*.8*Math.min(offset,2)+wave))),mood,checkedIn:i===29?p.checkedInToday:(p.priority==='Stable'||(i+index)%(p.priority==='Critical'?3:7)!==0)};
}) }));

export function getPeople(sector = 'All sectors') { return people.filter(p=>sector==='All sectors'||p.sector===sector); }
export function getSeries(roster: Person[], days: number, key: keyof Pick<HistoryPoint,'wellbeing'|'sleep'|'energy'|'interaction'|'mood'>) {
  return Array.from({length:days},(_,i)=>({ date:people[0].history[30-days+i].date, value:+mean(roster.map(p=>p.history[30-days+i][key])).toFixed(1) }));
}
export function completion(roster: Person[],days=7) { return roster.length?Math.round(roster.reduce((sum,p)=>sum+p.history.slice(-days).filter(d=>d.checkedIn).length,0)/(roster.length*days)*100):0; }

export type Camera = { id:string; name:string; location:string; sector:string; image:string; type:string; confidence:number; reading:string; unit:string; captured:string; people:string[]; boxes:{x:number;y:number;w:number;h:number}[]; };
export const cameras: Camera[] = [
  {id:'CAM-01',name:'Barracks · Rest area',location:'Northern Training Camp',sector:'Northern Sector',image:'/images/barracks.png',type:'Rest pattern',confidence:92,reading:'6.4',unit:'hrs average rest',captured:'25 Sep 2026 · 06:30 IST',people:['SV-2048','SV-6189'],boxes:[{x:8,y:52,w:8,h:12},{x:27,y:32,w:7,h:10},{x:41,y:18,w:5,h:8},{x:47,y:11,w:5,h:7},{x:91,y:25,w:6,h:9}]},
  {id:'CAM-02',name:'Common room',location:'Eastern Training Centre',sector:'Eastern Sector',image:'/images/common-room.png',type:'Interaction',confidence:89,reading:'4',unit:'people interacting',captured:'25 Sep 2026 · 14:30 IST',people:['SV-3105','SV-8264','SV-2876'],boxes:[{x:29.4,y:24.2,w:5.3,h:10.7},{x:54.1,y:19.1,w:5.1,h:11.2},{x:60.1,y:36.2,w:5.4,h:11.4},{x:25.7,y:46.9,w:7.2,h:11.7}]},
  {id:'CAM-03',name:'Accommodation corridor',location:'Central Training Camp',sector:'Central Sector',image:'/images/corridor.png',type:'Activity',confidence:94,reading:'2',unit:'people in motion',captured:'25 Sep 2026 · 14:32 IST',people:['SV-4176','SV-9032'],boxes:[{x:52,y:22,w:11,h:48},{x:62,y:24,w:11,h:49}]},
  {id:'CAM-04',name:'Study & briefing room',location:'Southern Training Centre',sector:'Southern Sector',image:'/images/study.png',type:'Energy estimate',confidence:86,reading:'68',unit:'illustrative activity index',captured:'25 Sep 2026 · 14:35 IST',people:['SV-5230','SV-1043'],boxes:[{x:17.4,y:34.1,w:5.7,h:9.9},{x:78.6,y:37.6,w:5.3,h:10.2}]},
];
