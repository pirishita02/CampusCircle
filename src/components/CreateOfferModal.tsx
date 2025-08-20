import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Tag, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const offerSchema = z.object({
  price: z.string().min(1, "Price is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be a valid number greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  availableNow: z.boolean().default(false),
  canDeliver: z.boolean().default(false),
});

type OfferFormData = z.infer<typeof offerSchema>;

export interface Offer {
  id: string;
  requestId: string;
  lenderId: string;
  lenderName: string;
  price: number;
  description: string;
  images: string[];
  tags: string[];
  createdAt: string;
  status: "pending" | "accepted" | "rejected";
}

interface CreateOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string;
  requestTitle: string;
  onCreateOffer: (offer: Offer) => void;
}

const CreateOfferModal = ({ 
  open, 
  onOpenChange, 
  requestId, 
  requestTitle,
  onCreateOffer 
}: CreateOfferModalProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      availableNow: false,
      canDeliver: false,
    },
  });

  const availableNow = watch("availableNow");
  const canDeliver = watch("canDeliver");

  const quickTags = [
    "Like new condition",
    "Slightly used",
    "Available immediately", 
    "Can meet anywhere on campus",
    "Flexible timing",
    "Original packaging",
    "With accessories",
    "Battery included"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const onSubmit = async (data: OfferFormData) => {
    setIsSubmitting(true);
    
    try {
      // Build tags array
      const offerTags = [];
      if (data.availableNow) offerTags.push("Available now");
      if (data.canDeliver) offerTags.push("Can deliver");
      offerTags.push(...tags);

      const newOffer: Offer = {
        id: `offer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        requestId,
        lenderId: "current-user-id", // In real app, get from auth
        lenderName: "Anonymous", // Will be revealed after acceptance
        price: Number(data.price),
        description: data.description,
        images,
        tags: offerTags,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      onCreateOffer(newOffer);
      
      toast({
        title: "Offer submitted!",
        description: "Your offer has been sent to the requester.",
      });

      // Reset form
      reset();
      setImages([]);
      setTags([]);
      onOpenChange(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Make an Offer
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Offering for: <span className="font-medium">{requestTitle}</span>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Your Price *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="price"
                type="number"
                min="1"
                step="1"
                className="pl-8"
                placeholder="Enter your price"
                {...register("price")}
              />
            </div>
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description *
            </Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe your item/service, condition, availability, etc."
              className="resize-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Images */}
          <div className="space-y-3">
            <Label>Photos of your item</Label>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload photos (optional)
                </span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Options */}
          <div className="space-y-3">
            <Label>Quick options</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={availableNow ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setValue("availableNow", !availableNow)}
              >
                Available now
              </Badge>
              <Badge
                variant={canDeliver ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setValue("canDeliver", !canDeliver)}
              >
                Can deliver
              </Badge>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Additional tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform text-xs"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="campus"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Offer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferModal;