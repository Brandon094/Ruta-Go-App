import React from 'react';

export function ProfileInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5">
      <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
         {icon}
      </div>
      <div className="space-y-0.5">
         <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
         <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
  );
}
