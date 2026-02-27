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

export const ConnectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select>
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
          <Button variant="outline">Generate</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
