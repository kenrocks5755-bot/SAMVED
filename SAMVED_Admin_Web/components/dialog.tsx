'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function Dialog({title,onClose,children,wide=false}:{title:string;onClose:()=>void;children:ReactNode;wide?:boolean}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const el=ref.current;const previous=document.activeElement as HTMLElement|null;const oldOverflow=document.body.style.overflow;el?.showModal();document.body.style.overflow='hidden';return()=>{document.body.style.overflow=oldOverflow;el?.close();previous?.focus();};},[]);
  return <dialog ref={ref} className={`modal ${wide?'modal-wide':''}`} aria-label={title} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}}><div className="modal-inner"><div className="modal-top"><span>{title}</span><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={21}/></button></div>{children}</div></dialog>;
}
