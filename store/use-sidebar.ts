import { create } from "zustand";

interface sideBarProps{
    collapsed:boolean;
    onExpand:()=>void;
    onCollapse:()=>void;

}

export const useSidebar=create<sideBarProps> ((set)=>({
collapsed:false,
onExpand:()=>set(()=>({collapsed:false})),
onCollapse:()=>set(()=>({collapsed:true})),
}))