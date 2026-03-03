"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangleIcon  } from "lucide-react";
import { useState, useTransition } from "react";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";



const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {

  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);


  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress created");
          
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
          >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="RTMP">RTMP</SelectItem>
              <SelectItem value="WHIP">WHIP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Alert>
        <AlertTriangleIcon />
        <AlertTitle>Warnings</AlertTitle>
        <AlertDescription>
           This action will reset all active streams using the current connection
        </AlertDescription>
      </Alert>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
          <Button 
           disabled={isPending}
            onClick={onSubmit}
          variant="outline"
          >Generate</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
