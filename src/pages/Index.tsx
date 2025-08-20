import { useState } from "react";
import { Filter, MapPin } from "lucide-react";
import Header from "@/components/Header";
import RequestCard, { type Request } from "@/components/RequestCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import CreateRequestModal from "@/components/CreateRequestModal";
import CreateOfferModal, { type Offer } from "@/components/CreateOfferModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockRequests } from "@/data/mockRequests";
import { useToast } from "@/hooks/use-toast";
import campusHero from "@/assets/campus-hero.jpg";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedRequestForOffer, setSelectedRequestForOffer] = useState<Request | null>(null);
  const { toast } = useToast();

  const categories = ["all", "Electronics", "Books", "Food", "Transport", "Other"];
  
  const filteredRequests = selectedCategory === "all" 
    ? requests 
    : requests.filter(req => req.category === selectedCategory);

  const handleOfferClick = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequestForOffer(request);
      setIsOfferModalOpen(true);
    }
  };

  const handleNewRequest = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateRequest = (newRequest: Request) => {
    setRequests(prev => [newRequest, ...prev]);
  };

  const handleCreateOffer = (newOffer: Offer) => {
    setOffers(prev => [newOffer, ...prev]);
    
    // Update the request's offer count
    setRequests(prev => prev.map(request => 
      request.id === newOffer.requestId 
        ? { ...request, offersCount: request.offersCount + 1 }
        : request
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-48 overflow-hidden">
        <img 
          src={campusHero} 
          alt="Campus life" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Share • Borrow • Connect</h1>
            <p className="text-lg opacity-90">Your campus community marketplace</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Location & Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">IIT Delhi Campus • 50m radius</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredRequests.length} active requests
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <Button variant="ghost" size="sm" className="shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer shrink-0 transition-all hover:scale-105 ${
                selectedCategory === category 
                  ? "bg-gradient-primary text-white shadow-glow" 
                  : "hover:bg-accent"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All" : category}
            </Badge>
          ))}
        </div>

        {/* Requests Feed */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onOfferClick={handleOfferClick}
            />
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No requests found</h3>
            <p className="text-muted-foreground">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </main>

      <FloatingActionButton onClick={handleNewRequest} />
      
      <CreateRequestModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateRequest={handleCreateRequest}
      />
      
      {selectedRequestForOffer && (
        <CreateOfferModal
          open={isOfferModalOpen}
          onOpenChange={setIsOfferModalOpen}
          requestId={selectedRequestForOffer.id}
          requestTitle={selectedRequestForOffer.title}
          onCreateOffer={handleCreateOffer}
        />
      )}
    </div>
  );
};

export default Index;
