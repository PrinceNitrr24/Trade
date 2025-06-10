import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModifyOrderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedOrder: any;
  modifyPrice: string;
  setModifyPrice: (price: string) => void;
  modifyQuantity: string;
  setModifyQuantity: (quantity: string) => void;
  confirmModifyOrder: () => void;
}

export default function ModifyOrderDialog({
  open,
  setOpen,
  selectedOrder,
  modifyPrice,
  setModifyPrice,
  modifyQuantity,
  setModifyQuantity,
  confirmModifyOrder,
}: ModifyOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify Order</DialogTitle>
          <DialogDescription>
            Update the price and quantity for {selectedOrder?.ticker} order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modify-price" className="text-right">
              Price
            </Label>
            <Input
              id="modify-price"
              value={modifyPrice}
              onChange={(e) => setModifyPrice(e.target.value)}
              className="col-span-3"
              type="number"
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modify-quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="modify-quantity"
              value={modifyQuantity}
              onChange={(e) => setModifyQuantity(e.target.value)}
              className="col-span-3"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmModifyOrder}>Modify Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
