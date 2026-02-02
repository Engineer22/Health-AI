
import { useState } from "react";
import { Video, Calendar, FileText, Users, Clock, Star, MessageSquare, PlusCircle, FolderOpen, ClipboardCheck, History, Syringe, Brain, Search, Thermometer, Heart, Activity, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    rating: 4.8,
    availability: "Available today",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    rating: 4.9,
    availability: "Next available: Tomorrow",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrics",
    rating: 4.7,
    availability: "Available today",
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Dermatology",
    rating: 4.9,
    availability: "Available today",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 5,
    name: "Dr. Rachel Martinez",
    specialty: "Neurology",
    rating: 4.8,
    availability: "Available today",
    image: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 6,
    name: "Dr. David Thompson",
    specialty: "Orthopedics",
    rating: 4.9,
    availability: "Next available: Tomorrow",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  }
];

const commonSymptoms = [
  { icon: Thermometer, name: "Fever", description: "Elevated body temperature" },
  { icon: Brain, name: "Headache", description: "Pain in head or neck region" },
  { icon: Heart, name: "Chest Pain", description: "Discomfort in chest area" },
  { icon: Activity, name: "Fatigue", description: "Feeling of tiredness or exhaustion" },
];

const Telemedicine = () => {
  const { toast } = useToast();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleSchedule = (doctorName: string) => {
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${doctorName} has been scheduled successfully.`,
    });
  };

  const handleSymptomSelect = (symptomName: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomName)
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    );
  };

  console.log("symptomsName", selectedSymptoms)


  const handleSymptomCheck = () => {
    if (selectedSymptoms.length === 0) {

      // alert(selectedSymptoms)
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to check",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Checking symptoms...",
      description: "Our AI is analyzing your symptoms",
    });
  };



  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-up">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Virtual Healthcare Services
          </h1>

          {/* Symptom Checker Section */}
          <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Stethoscope className="h-8 w-8 text-[#8B5CF6]" />
                <span>Check Your Symptoms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white/60">
                Select your symptoms below to receive AI-powered health insights. This tool is for informational purposes only and should not replace professional medical advice.
              </p>

              <div className="relative">
                <div className="flex items-center border border-white/10 rounded-lg p-3 mb-4 bg-white/5">
                  <Search className="h-5 w-5 text-white/60 mr-2" />
                  <input
                    type="text"
                    placeholder="Search symptoms..."
                    className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonSymptoms.map((symptom) => (
                  <Button
                    key={symptom.name}
                    variant="ghost"
                    className={`h-auto p-4 justify-start gap-4 group transition-all duration-300 hover:bg-white/10 ${selectedSymptoms.includes(symptom.name)
                      ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/30"
                      : "bg-black/20 border border-white/10"
                      }`}
                    onClick={() => handleSymptomSelect(symptom.name)}
                  >
                    <symptom.icon className={`h-5 w-5 ${selectedSymptoms.includes(symptom.name)
                      ? "text-[#8B5CF6]"
                      : "text-white/60"
                      }`} />
                    <div className="text-left">
                      <p className="font-medium text-white">{symptom.name}</p>
                      <p className="text-sm text-white/60">{symptom.description}</p>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  size="lg"
                  className="w-full md:w-auto min-w-[200px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  onClick={handleSymptomCheck}
                >
                  <Stethoscope className="mr-2" />
                  Check Symptoms
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Video,
                title: "Video Consultation",
                description: "Connect with healthcare providers through secure video calls.",
                action: () => toast({ title: "Starting video consultation..." }),
                buttonText: "Start Consultation"
              },
              {
                icon: Calendar,
                title: "Schedule Appointment",
                description: "Book virtual appointments with your healthcare providers.",
                action: () => toast({ title: "Opening scheduler..." }),
                buttonText: "View Calendar"
              },
              {
                icon: FileText,
                title: "Medical Records",
                description: "Securely share your medical records during consultations.",
                action: () => toast({ title: "Accessing records..." }),
                buttonText: "View Records"
              },
              {
                icon: PlusCircle,
                title: "Prescription Refills",
                description: "Request and manage prescription refills online.",
                action: () => toast({ title: "Accessing prescription service..." }),
                buttonText: "Request Refill"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">{feature.description}</p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={feature.action}
                  >
                    {feature.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Medical Records Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-white">Medical Records</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="h-6 w-6 text-[#8B5CF6]" />
                    <span>Medical History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">Access your complete medical history and records.</p>
                  <div className="text-sm text-white/60">45 documents</div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ClipboardCheck className="h-6 w-6 text-[#8B5CF6]" />
                    <span>Test Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">View and download your lab results and medical tests.</p>
                  <div className="text-sm text-white/60">12 results</div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <History className="h-6 w-6 text-[#8B5CF6]" />
                    <span>Visit History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">Review past appointments and consultations.</p>
                  <div className="text-sm text-white/60">28 visits</div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Syringe className="h-6 w-6 text-[#8B5CF6]" />
                    <span>Immunization Records</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">Track vaccination history and schedules.</p>
                  <div className="text-sm text-white/60">15 records</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Available Doctors Section */}
          <h2 className="text-2xl font-semibold mb-6 text-white">Available Healthcare Providers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <CardTitle className="text-lg text-white">{doctor.name}</CardTitle>
                      <p className="text-sm text-white">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-white">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-white">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.availability}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full bg-black/40 text-white hover:bg-white/20 border-white/20"
                        onClick={() => toast({
                          title: "Starting chat...",
                          description: `Opening chat with ${doctor.name}`
                        })}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => handleSchedule(doctor.name)}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Features */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Group Consultations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">Join group sessions with healthcare providers and other patients.</p>
                <Button
                  variant="outline"
                  className="w-full bg-black/40 text-white hover:bg-white/20 border-white/20"
                  onClick={() => toast({ title: "Exploring group sessions..." })}
                >
                  Browse Sessions
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>24/7 Support Chat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">Get immediate assistance from our medical support team.</p>
                <Button
                  variant="outline"
                  className="w-full bg-black/40 text-white hover:bg-white/20 border-white/20"
                  onClick={() => toast({ title: "Opening support chat..." })}
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
