import { create } from "zustand";

export enum ChatVariant{
    CHAT="CHAT",
    COMMUNITY="COMMUNITY"
}

interface ChatSideBarStore{
collapsed:boolean;
variant:ChatVariant;
onChangeVariant:(variant:ChatVariant)=>void;
onExpand:()=>void;
onCollapse:()=>void;
}


export const useChatSidebar=create<ChatSideBarStore>((set)=>({
  collapsed:false,
  variant:ChatVariant.CHAT,
  onExpand:()=>set(()=>({collapsed:false})),
  onCollapse:()=>set(()=>({collapsed:true})),
  onChangeVariant:(variant:ChatVariant)=>set(()=>({variant:variant}))
}))