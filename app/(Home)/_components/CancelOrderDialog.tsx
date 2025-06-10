import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancelOrderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedOrder: any;
  confirmCancelOrder: () => void;
}

export default function CancelOrderDialog({
  open,
  setOpen,
  selectedOrder,
  confirmCancelOrder,
}: CancelOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel the {selectedOrder?.side} order for{" "}
            {selectedOrder?.ticker}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Keep Order
          </Button>
          <Button variant="destructive" onClick={confirmCancelOrder}>
            Cancel Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
