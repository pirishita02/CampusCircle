import { Request } from "@/components/RequestCard";

export const mockRequests: Request[] = [
  {
    id: "1",
    title: "Need MacBook Charger Urgently",
    description: "My MacBook charger stopped working and I have an important presentation tomorrow. Looking for a 60W USB-C charger.",
    category: "Electronics",
    urgency: "high",
    price: 50,
    distance: 25,
    timeAgo: "5 min ago",
    tags: ["MacBook", "USB-C", "60W"],
    offersCount: 3,
    isNew: true
  },
  {
    id: "2", 
    title: "Data Structures & Algorithms Textbook",
    description: "Need the latest edition of Introduction to Algorithms by Cormen. Only need it for 2 weeks for exam prep.",
    category: "Books",
    urgency: "medium",
    price: 100,
    distance: 40,
    timeAgo: "1 hour ago",
    tags: ["CS", "Algorithms", "Textbook"],
    offersCount: 1
  },
  {
    id: "3",
    title: "Ride to Airport Tomorrow 6 AM",
    description: "Need a ride to the airport tomorrow morning. Can share fuel costs. My flight is at 8 AM so need to leave campus by 6.",
    category: "Transport", 
    urgency: "high",
    price: 200,
    distance: 15,
    timeAgo: "2 hours ago",
    tags: ["Airport", "Early Morning", "Fuel Share"],
    offersCount: 0
  },
  {
    id: "4",
    title: "Scientific Calculator for Exam",
    description: "Need a scientific calculator for my calculus exam next week. Casio fx-991ES or similar model preferred.",
    category: "Electronics",
    urgency: "low", 
    price: 30,
    distance: 60,
    timeAgo: "4 hours ago",
    tags: ["Calculator", "Exam", "Casio"],
    offersCount: 2
  },
  {
    id: "5",
    title: "Home-cooked Meal",
    description: "Really missing home food! Looking for someone who can cook a simple North Indian meal. Will pay well!",
    category: "Food",
    urgency: "medium",
    price: 150,
    distance: 35,
    timeAgo: "6 hours ago", 
    tags: ["Homemade", "North Indian", "Comfort Food"],
    offersCount: 5
  },
  {
    id: "6",
    title: "Camera for Event Photography",
    description: "Need a DSLR camera for our college fest next weekend. Sony or Canon preferred. Event is for 2 days.",
    category: "Electronics",
    urgency: "low",
    price: 300,
    distance: 80,
    timeAgo: "1 day ago",
    tags: ["DSLR", "Photography", "Event"],
    offersCount: 1
  }
];
