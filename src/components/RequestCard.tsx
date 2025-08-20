import { Clock, MapPin, DollarSign, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface Request {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "low" | "medium" | "high";
  price: number;
  distance: number;
  timeAgo: string;
  image?: string;
  tags: string[];
  offersCount: number;
  isNew?: boolean;
}

interface RequestCardProps {
  request: Request;
  onOfferClick?: (requestId: string) => void;
}

const RequestCard = ({ request, onOfferClick }: RequestCardProps) => {
  const urgencyColors = {
    low: "bg-accent text-accent-foreground",
    medium: "bg-campus-orange-light text-campus-orange",
    high: "bg-destructive/10 text-destructive"
  };

  const categoryColors = {
    "Electronics": "bg-campus-blue/10 text-campus-blue",
    "Books": "bg-campus-green/10 text-campus-green", 
    "Food": "bg-campus-orange/10 text-campus-orange",
    "Transport": "bg-campus-purple/10 text-campus-purple",
    "Other": "bg-muted text-muted-foreground"
  };

  return (
    <Card className={`campus-card w-full ${request.isNew ? 'pulse-new' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="secondary" 
                className={categoryColors[request.category as keyof typeof categoryColors] || categoryColors.Other}
              >
                {request.category}
              </Badge>
              <Badge 
                variant="outline"
                className={urgencyColors[request.urgency]}
              >
                {request.urgency}
              </Badge>
              {request.isNew && (
                <span className="trust-badge text-xs">NEW</span>
              )}
            </div>
            <h3 className="font-semibold text-lg leading-tight">{request.title}</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {request.description}
        </p>

        {request.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={request.image} 
              alt={request.title}
              className="w-full h-32 object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {request.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {request.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Request Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{request.distance}m away</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{request.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-lg font-semibold text-campus-orange">
              <DollarSign className="h-4 w-4" />
              <span>₹{request.price}</span>
            </div>
            {request.offersCount > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageCircle className="h-3 w-3" />
                <span>{request.offersCount} offers</span>
              </div>
            )}
          </div>

          <Button 
            onClick={() => onOfferClick?.(request.id)}
            className="btn-campus"
            size="sm"
          >
            Make Offer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;