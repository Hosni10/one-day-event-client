import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertRegistrationSchema, type InsertRegistration } from "../schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Baby, Trophy, Heart, Loader2, CheckCircle, Ruler } from "lucide-react";

const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const entertainmentSports = [
  { value: "badminton", label: "Badminton", icon: "🏸" },
  { value: "table-tennis", label: "Table Tennis", icon: "🏓" },
  { value: "tennis", label: "Tennis", icon: "🎾" },
  { value: "volleyball", label: "Volleyball", icon: "🏐" },
  { value: "padel", label: "Padel", icon: "🎾" },
  { value: "football", label: "Football", icon: "⚽" },
  { value: "basketball", label: "Basketball", icon: "🏀" },
] as const;

const competitiveSports = [
  { value: "football", label: "Football", icon: "⚽" },
  { value: "basketball", label: "Basketball", icon: "🏀" },
  { value: "padel", label: "Padel", icon: "🎾" },
  { value: "running", label: "Running", icon: "🏃" },
] as const;

const exerciseOptions = [
  { value: "this-week", label: "This week" },
  { value: "last-week", label: "Last week" },
  { value: "last-month", label: "Within the last month" },
  { value: "2-3-months", label: "2-3 months ago" },
  { value: "6-months", label: "3-6 months ago" },
  { value: "longer", label: "More than 6 months ago" },
  { value: "never", label: "I don't exercise regularly" },
] as const;

const medicalConditions = [
  { value: "heart-disease", label: "Heart Disease/Heart Problems" },
  { value: "high-blood-pressure", label: "High Blood Pressure" },
  { value: "diabetes", label: "Diabetes" },
  { value: "asthma", label: "Asthma/Breathing Problems" },
  { value: "epilepsy", label: "Epilepsy/Seizures" },
  { value: "back-problems", label: "Back Problems" },
  { value: "knee-problems", label: "Knee Problems" },
  { value: "ankle-problems", label: "Ankle/Foot Problems" },
  { value: "pregnancy", label: "Pregnancy" },
  { value: "none", label: "None of the above" },
] as const;

export default function RegistrationForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      department: "",
      gender: undefined,
      parentTshirtSize: undefined,
      bringingKids: false,
      numberOfKids: 0,
      kids: [],
      entertainmentSports: [],
      interestedInCompeting: false,
      competitiveSports: [],
      lastExercise: undefined,
      healthConcerns: "",
      medicalConditions: [],
      currentMedications: "",
      previousInjuries: "",
      physicalLimitations: "",
      // Physical Activity Readiness Questionnaire
      hasMedicalConditions: undefined,
      hasHeartCondition: undefined,
      hasChestPain: undefined,
      hasBalanceIssues: undefined,
      // Medical Details
      hasOtherHealthInfo: undefined,
      isTakingMedications: undefined,
      hasImmediateHealthConcerns: undefined,
      // Declaration
      guardianName: "",
      guardianSignature: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      doctorClearance: false,
    },
  });

  const bringingKids = form.watch("bringingKids");
  const numberOfKids = form.watch("numberOfKids");
  const interestedInCompeting = form.watch("interestedInCompeting");
  const selectedCompetitiveSports = form.watch("competitiveSports") || [];

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const response = await apiRequest("POST", "/api/registrations", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertRegistration) => {
    registrationMutation.mutate(data);
  };

  // Update kids array when numberOfKids changes
  const updateKidsArray = (count: number) => {
    const currentKids = form.getValues("kids") || [];
    const newKids = Array.from({ length: count }, (_, index) =>
      currentKids[index] || { name: "", age: 0, gender: undefined, tshirtSize: undefined }
    );
    form.setValue("kids", newKids);
  };

  if (showSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600 text-2xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for registering for Company Sports Day. You'll receive a confirmation email shortly with event details.
        </p>
        <Button 
          onClick={() => setShowSuccess(false)}
          className="bg-primary hover:bg-secondary"
        >
          Register Another Person
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="text-primary mr-2" />
            Personal Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Engineering, Marketing, Sales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex items-center space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="gender-male" />
                        <label htmlFor="gender-male">Male</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="gender-female" />
                        <label htmlFor="gender-female">Female</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="parentTshirtSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your T-Shirt Size *</FormLabel>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tshirtSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size} - {size === "XS" ? "Extra Small" : size === "S" ? "Small" : size === "M" ? "Medium" : size === "L" ? "Large" : size === "XL" ? "Extra Large" : "Double Extra Large"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
                      <DialogTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex items-center space-x-2"
                        >
                          <Ruler className="h-4 w-4" />
                          <span>Size Chart</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-gray-900">Size Guide</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="text-center">
                            <p className="text-gray-600 mb-6">
                              Choose the perfect fit for you and your family. Our size chart helps ensure everyone gets comfortable, well-fitting event t-shirts.
                            </p>
                          </div>
                          
                          <div className="grid lg:grid-cols-2 gap-8 items-start">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-4">How to Measure</h4>
                              <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span><strong>Chest:</strong> Measure around the fullest part of your chest</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span><strong>Length:</strong> Measure from shoulder to desired length</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span><strong>Shoulder:</strong> Measure across the back from shoulder to shoulder</span>
                                </div>
                              </div>
                              
                              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h5 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h5>
                                <p className="text-sm text-blue-800">
                                  If you're between sizes, we recommend going with the larger size for a more comfortable fit during sports activities.
                                </p>
                              </div>
                            </div>
                            
                            <div className="relative">
                              <img 
                                src="/size-chart.jpeg" 
                                alt="Professional t-shirt size chart for Gents, Ladies, and Kids" 
                                className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
                              />
                              <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-lg px-3 py-1 text-xs font-medium text-gray-700">
                                📏 Size Guide
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center pt-4">
                            <Button 
                              onClick={() => setShowSizeChart(false)}
                              className="bg-primary hover:bg-secondary text-white"
                            >
                              Got it, thanks!
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Not sure about your size? Click the "Size Chart" button for detailed measurements.
                  </p>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Family Information */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Baby className="text-primary mr-2" />
            Family Participation
          </h3>
          
          <FormField
            control={form.control}
            name="bringingKids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you bringing kids? *</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                    className="flex items-center space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="kids-yes" />
                      <label htmlFor="kids-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="kids-no" />
                      <label htmlFor="kids-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {bringingKids && (
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <FormField
                control={form.control}
                name="numberOfKids"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>How many kids?</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        const count = parseInt(value);
                        field.onChange(count);
                        updateKidsArray(count);
                      }} 
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "child" : "children"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {numberOfKids && numberOfKids > 0 && (
                <div className="space-y-4">
                  {Array.from({ length: numberOfKids }, (_, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Child {index + 1}</h4>
                      <div className="grid md:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name={`kids.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`kids.${index}.age`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={1} 
                                  max={18} 
                                  placeholder="Age"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value === "" ? undefined : parseInt(value));
                                  }}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`kids.${index}.gender`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Boy</SelectItem>
                                  <SelectItem value="female">Girl</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`kids.${index}.tshirtSize`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>T-Shirt Size</FormLabel>
                              <div className="flex items-center space-x-3">
                                <div className="flex-1">
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select size" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {tshirtSizes.map((size) => (
                                        <SelectItem key={size} value={size}>
                                          {size}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm"
                                      className="flex items-center space-x-2"
                                    >
                                      <Ruler className="h-3 w-3" />
                                      <span className="text-xs">Size</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle className="text-2xl font-bold text-gray-900">Size Guide</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6">
                                      <div className="text-center">
                                        <p className="text-gray-600 mb-6">
                                          Choose the perfect fit for your child. Our size chart helps ensure everyone gets comfortable, well-fitting event t-shirts.
                                        </p>
                                      </div>
                                      
                                      <div className="grid lg:grid-cols-2 gap-8 items-start">
                                        <div>
                                          <h4 className="text-xl font-semibold text-gray-900 mb-4">How to Measure</h4>
                                          <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center space-x-3">
                                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                                              <span><strong>Chest:</strong> Measure around the fullest part of the chest</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                                              <span><strong>Length:</strong> Measure from shoulder to desired length</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                                              <span><strong>Shoulder:</strong> Measure across the back from shoulder to shoulder</span>
                                            </div>
                                          </div>
                                          
                                          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                            <h5 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h5>
                                            <p className="text-sm text-blue-800">
                                              For children, consider choosing a size slightly larger for comfort during active sports activities.
                                            </p>
                                          </div>
                                        </div>
                                        
                                        <div className="relative">
                                          <img 
                                            src="/size-chart.jpeg" 
                                            alt="Professional t-shirt size chart for Gents, Ladies, and Kids" 
                                            className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
                                          />
                                          <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-lg px-3 py-1 text-xs font-medium text-gray-700">
                                            📏 Size Guide
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                              <p className="text-xs text-gray-500 mt-1">
                                💡 Click "Size" button for detailed measurements.
                              </p>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sports Preferences */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Trophy className="text-primary mr-2" />
            Sports Preferences
          </h3>
          
          <FormField
            control={form.control}
            name="entertainmentSports"
            render={() => (
              <FormItem>
                <FormLabel>Preferred Entertainment Sports (Select all that interest you)</FormLabel>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {entertainmentSports.map((sport) => (
                    <FormField
                      key={sport.value}
                      control={form.control}
                      name="entertainmentSports"
                      render={({ field }) => (
                        <FormItem
                          key={sport.value}
                          className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(sport.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), sport.value])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== sport.value)
                                    );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="flex items-center space-x-2">
                              <span>{sport.icon}</span>
                              <span>{sport.label}</span>
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Competition Participation */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Trophy className="text-primary mr-2" />
            Competition Participation
          </h3>
          
          <FormField
            control={form.control}
            name="interestedInCompeting"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interested in competing? *</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                    className="flex items-center space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="compete-yes" />
                      <label htmlFor="compete-yes">Yes, I want to compete!</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="compete-no" />
                      <label htmlFor="compete-no">No, just for fun</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {interestedInCompeting && (
            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <p className="text-sm text-gray-600 mb-4">Select up to 2 sports you'd like to compete in:</p>
              <FormField
                control={form.control}
                name="competitiveSports"
                render={() => (
                  <FormItem>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {competitiveSports.map((sport) => (
                        <FormField
                          key={sport.value}
                          control={form.control}
                          name="competitiveSports"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(sport.value);
                            const isDisabled = !isChecked && selectedCompetitiveSports.length >= 2;
                            
                            return (
                              <FormItem
                                key={sport.value}
                                className={`flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-200 rounded-lg hover:bg-white bg-white ${isDisabled ? 'opacity-50' : ''}`}
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), sport.value])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== sport.value)
                                          );
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="flex items-center space-x-2">
                                    <span>{sport.icon}</span>
                                    <span>{sport.label}</span>
                                  </FormLabel>
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Health and Exercise Information */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Heart className="text-primary mr-2" />
            Health & Exercise Information
          </h3>
          
          <div className="grid md:grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="lastExercise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When did you last exercise? *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {exerciseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalConditions"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base">Do you have any of the following medical conditions? (Select all that apply) *</FormLabel>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    {medicalConditions.map((condition) => (
                      <FormField
                        key={condition.value}
                        control={form.control}
                        name="medicalConditions"
                        render={({ field }) => (
                          <FormItem
                            key={condition.value}
                            className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(condition.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), condition.value])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== condition.value)
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                {condition.label}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currentMedications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current medications (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={3}
                        placeholder="List any medications you are currently taking..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previousInjuries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous injuries or surgeries (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={3}
                        placeholder="Describe any previous injuries or surgeries that might affect your participation..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="physicalLimitations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Physical limitations or restrictions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={3}
                      placeholder="Describe any physical limitations, disabilities, or restrictions we should be aware of..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="healthConcerns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional health concerns or allergies (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={3}
                      placeholder="Please mention any other health conditions, allergies, or dietary restrictions we should be aware of..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Physical Activity Readiness Questionnaire */}
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Physical Activity Readiness Questionnaire</h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasMedicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">1. Do you suffer from any medical conditions the Camp Operator & ADSS should be aware of? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="medical-yes" />
                            <label htmlFor="medical-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="medical-no" />
                            <label htmlFor="medical-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasHeartCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">2. Has your doctor ever said that you have a heart condition and that you should only do physical activity/exercise recommended by a doctor? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="heart-yes" />
                            <label htmlFor="heart-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="heart-no" />
                            <label htmlFor="heart-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasChestPain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">3. Do you feel pain in your chest at any point in time? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="chest-yes" />
                            <label htmlFor="chest-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="chest-no" />
                            <label htmlFor="chest-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasBalanceIssues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">4. Do you lose your balance because of dizziness or do you ever lose consciousness? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="balance-yes" />
                            <label htmlFor="balance-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="balance-no" />
                            <label htmlFor="balance-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Medical Details */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Details</h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasOtherHealthInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">1. Do you have any other important health-related information? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="other-health-yes" />
                            <label htmlFor="other-health-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="other-health-no" />
                            <label htmlFor="other-health-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isTakingMedications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">2. Are you currently taking any medications? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="medications-yes" />
                            <label htmlFor="medications-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="medications-no" />
                            <label htmlFor="medications-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasImmediateHealthConcerns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">3. Do you have any immediate health concerns? *</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value ? "true" : "false"}
                          className="flex items-center space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="immediate-yes" />
                            <label htmlFor="immediate-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="immediate-no" />
                            <label htmlFor="immediate-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Declaration and Data Subject Consent */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Data Subject Consent</h4>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-4">
                  I declare that I have read, understood, and answered honestly all the questions above. 
                  I have fully disclosed all medical conditions & information as a player at the Event. 
                  I am agreeing to participate in the exercise sessions (which may include aerobic, resistance, 
                  power and stretching exercises) and understand that there may be risks associated with physical activity. 
                  I also understand that ADSS & Atomics Academy will not be liable to any untoward incident that may arise due to exercise.
                </p>
              </div>
              
              <div className="space-y-4">


                <FormField
                  control={form.control}
                  name="guardianSignature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Digital Signature (Type your name to confirm) *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Type your full name to confirm agreement" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>



        {/* Submit Button */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center space-y-6">

            
            <Button 
              type="submit" 
              disabled={registrationMutation.isPending}
              className="bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[200px]"
            >
              {registrationMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Processing Registration...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Complete Registration
                </>
              )}
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              <p>✅ All data is securely saved • 📧 Confirmation email sent</p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
