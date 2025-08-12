"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Check,
  ChevronDown,
  Mail,
  Phone,
  Search,
  X,
  Globe,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  BarChart3,
  Bot,
  Wrench,
  Settings,
  Building2,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";

// Stripe Elements
let stripe = null;
let elements = null;
let cardElement = null;

const STEP_ORDER = [
  "welcome",
  "businessType",
  "businessName",
  "businessPhone",
  "businessEmail",
  "businessAddress",
  "services",
  "features",
  "template",
  "brandColors",
  "subscription",
  "payment",
];

export default function Setup({
  initialStepIndex = 0,
  onboarding,
  onUpdated,
  userData,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialStepIndex);
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const hasLoadedRef = useRef(false);
  const [initializing, setInitializing] = useState(true);

  // Refs
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Step 1 (details) state
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [isPublicBusinessAddress, setIsPublicBusinessAddress] = useState(true);
  const [defaultServices, setDefaultServices] = useState([]);
  const [selectedDefaultServiceIds, setSelectedDefaultServiceIds] = useState(
    []
  );
  const [allDefaultServices, setAllDefaultServices] = useState([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(-1);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [businessTypePredictions, setBusinessTypePredictions] = useState([]);
  const [showBusinessTypeDropdown, setShowBusinessTypeDropdown] =
    useState(false);
  const [selectedBusinessTypeIndex, setSelectedBusinessTypeIndex] =
    useState(-1);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const servicesDropdownRef = useRef(null);
  const [showHelperCard, setShowHelperCard] = useState(false);
  const [helperCardExiting, setHelperCardExiting] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([
    "pro-website",
    "client-crm",
    "scheduling",
    "marketing",
    "payments",
    "team-management",
    "analytics",
    "ai-agent",
  ]);

  // Template selection state
  const [selectedTemplate, setSelectedTemplate] = useState("urban");
  const [openTemplate, setOpenTemplate] = useState("urban");

  // Brand colors state
  const [primaryColor, setPrimaryColor] = useState("#001061");
  const [secondaryColor, setSecondaryColor] = useState("#848D6F");
  const [accentColor, setAccentColor] = useState("#0055ff");
  const [neutralColor, setNeutralColor] = useState("#F8FAFC");

  // Color picker popup state
  const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
  const [showAccentColorPicker, setShowAccentColorPicker] = useState(false);

  // Debounced color validation state to prevent flickering
  const [colorValidationError, setColorValidationError] = useState(false);

  // Track when user is actively using color picker
  const [isUsingColorPicker, setIsUsingColorPicker] = useState(false);

  // Subscription selection state
  const [selectedSubscription, setSelectedSubscription] =
    useState("essentials");
  const [openSubscription, setOpenSubscription] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Stripe payment state
  const [stripeLoading, setStripeLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardValid, setCardValid] = useState(false);

  // Pricing state
  const [pricingInfo, setPricingInfo] = useState(null);

  // Handle billing cycle change and save to draft
  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
    // Save billing cycle preference immediately
    fetch("/api/setup/draft", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ billingCycle: cycle }),
    }).catch(() => {});
  };

  // Load current step and draft on mount
  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const [stepRes, draftRes] = await Promise.all([
          fetch("/api/setup/step", {
            headers: { "Content-Type": "application/json" },
          }),
          fetch("/api/setup/draft", {
            headers: { "Content-Type": "application/json" },
          }),
        ]);
        if (isActive) {
          if (stepRes.ok) {
            const stepData = await stepRes.json();
            const apiStep = Number(stepData?.setup?.currentStep) || 1;
            const idx = Math.max(
              0,
              Math.min(STEP_ORDER.length - 1, apiStep - 1)
            );
            setCurrentIndex(idx);
          }
          if (draftRes.ok) {
            const draftData = await draftRes.json();
            const d = draftData?.draft || {};
            if (typeof d.businessName === "string")
              setBusinessName(d.businessName);
            if (typeof d.businessAddress === "string")
              setBusinessAddress(d.businessAddress);
            if (typeof d.businessPhone === "string")
              setBusinessPhone(d.businessPhone);
            if (typeof d.businessEmail === "string")
              setBusinessEmail(d.businessEmail);
            if (typeof d.businessType === "string")
              setBusinessType(d.businessType);
            if (typeof d.businessUnit === "string")
              setBusinessUnit(d.businessUnit);
            if (typeof d.isPublicBusinessAddress === "boolean")
              setIsPublicBusinessAddress(d.isPublicBusinessAddress);
            if (Array.isArray(d.selectedDefaultServiceIds))
              setSelectedDefaultServiceIds(d.selectedDefaultServiceIds);
            if (Array.isArray(d.features)) setSelectedFeatures(d.features);
            if (typeof d.template === "string") setSelectedTemplate(d.template);
            if (typeof d.primaryColor === "string")
              setPrimaryColor(d.primaryColor);
            if (typeof d.secondaryColor === "string")
              setSecondaryColor(d.secondaryColor);
            if (typeof d.accentColor === "string")
              setAccentColor(d.accentColor);
            if (typeof d.neutralColor === "string")
              setNeutralColor(d.neutralColor);
            if (typeof d.subscription === "string")
              setSelectedSubscription(d.subscription);
            if (typeof d.billingCycle === "string")
              setBillingCycle(d.billingCycle);
          }
        }
      } catch (_) {
        // ignore
      } finally {
        hasLoadedRef.current = true;
        setInitializing(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, []);

  // Persist current step when it changes (after initial load)
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    const controller = new AbortController();
    (async () => {
      try {
        await fetch("/api/setup/step", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentStep: currentIndex + 1 }),
          signal: controller.signal,
        });
      } catch (_) {
        // ignore
      }
    })();
    return () => controller.abort();
  }, [currentIndex]);

  // Draft autosave (debounced)
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    const timer = setTimeout(() => {
      const draft = {
        businessName,
        businessAddress,
        businessPhone,
        businessEmail,
        businessType,
        businessUnit,
        isPublicBusinessAddress,
        selectedDefaultServiceIds,
        features: selectedFeatures,
        template: selectedTemplate,
        primaryColor,
        secondaryColor,
        accentColor,
        neutralColor,
        subscription: selectedSubscription,
        billingCycle,
      };
      fetch("/api/setup/draft", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
      }).catch(() => {});
    }, 500);
    return () => clearTimeout(timer);
  }, [
    businessName,
    businessAddress,
    businessPhone,
    businessEmail,
    businessType,
    businessUnit,
    isPublicBusinessAddress,
    selectedDefaultServiceIds,
    selectedFeatures,
    selectedTemplate,
    primaryColor,
    secondaryColor,
    accentColor,
    neutralColor,
    selectedSubscription,
    billingCycle,
  ]);

  // Form validation state
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form based on current step
  useEffect(() => {
    let valid = false;
    const currentStepKey = STEP_ORDER[currentIndex];

    switch (currentStepKey) {
      case "welcome":
        valid = true; // Welcome step is always valid
        break;
      case "businessType":
        valid = businessType.trim() !== "";
        break;
      case "businessName":
        valid = businessName.trim() !== "";
        break;
      case "businessPhone":
        const cleanPhone = businessPhone.replace(/[\s\-\(\)\.]/g, "");
        const isValidPhoneNumber = /^\d{10}$/.test(cleanPhone);
        valid = businessPhone.trim() !== "" && isValidPhoneNumber;
        break;
      case "businessEmail":
        valid =
          businessEmail.trim() !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail);
        break;
      case "businessAddress":
        valid = businessAddress.trim() !== "";
        break;
      case "businessUnit":
        valid = true; // Optional field
        break;
      case "services":
        // Add validation for services step
        valid = true; // Placeholder
        break;
      case "features":
        // Add validation for features step
        valid = true; // Placeholder
        break;
      case "template":
        // Add validation for template step
        valid = true; // Placeholder
        break;
      case "brandColors":
        // Brand colors are always valid (they have default values)
        valid = true;
        break;

      case "subscription":
        // Add validation for subscription step
        valid = true; // Placeholder
        break;
      case "payment":
        // Payment step is always valid (they can proceed without card)
        valid = true;
        break;
      default:
        valid = false;
    }

    setIsFormValid(valid);
  }, [
    currentIndex,
    businessName,
    businessAddress,
    businessPhone,
    businessEmail,
    businessType,
    businessUnit,
    primaryColor,
    secondaryColor,
    accentColor,
    neutralColor,
    selectedSubscription,
  ]);

  // Handle business type input change
  const handleBusinessTypeChange = (e) => {
    const value = e.target.value;
    setBusinessType(value);

    if (value.trim() === "") {
      setBusinessTypePredictions([]);
      setShowBusinessTypeDropdown(false);
      return;
    }

    const filtered = businessTypes.filter((type) =>
      type.name.toLowerCase().includes(value.toLowerCase())
    );

    setBusinessTypePredictions(filtered);
    setShowBusinessTypeDropdown(true);
    setSelectedBusinessTypeIndex(-1);
  };

  // Handle business type keyboard navigation
  const handleBusinessTypeKeyDown = (e) => {
    if (!showBusinessTypeDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedBusinessTypeIndex((prev) =>
          prev < businessTypePredictions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedBusinessTypeIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (
          selectedBusinessTypeIndex >= 0 &&
          businessTypePredictions[selectedBusinessTypeIndex]
        ) {
          selectBusinessType(
            businessTypePredictions[selectedBusinessTypeIndex]
          );
        }
        break;
      case "Escape":
        setShowBusinessTypeDropdown(false);
        setSelectedBusinessTypeIndex(-1);
        break;
    }
  };

  // Select business type from dropdown
  const selectBusinessType = (businessTypeOption) => {
    setBusinessType(businessTypeOption.name);
    setShowBusinessTypeDropdown(false);
    setSelectedBusinessTypeIndex(-1);
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setBusinessAddress(value);

    if (value.trim() === "") {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    // Use Google Places Autocomplete if available
    if (autocompleteService) {
      autocompleteService.getPlacePredictions(
        {
          input: value,
          types: ["address"],
          componentRestrictions: { country: "us" },
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPredictions(predictions);
            setShowDropdown(true);
            setSelectedPredictionIndex(-1);
          }
        }
      );
    }
  };

  // Handle address keyboard navigation
  const handleAddressKeyDown = (e) => {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedPredictionIndex((prev) =>
          prev < predictions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedPredictionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (
          selectedPredictionIndex >= 0 &&
          predictions[selectedPredictionIndex]
        ) {
          selectAddress(predictions[selectedPredictionIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setSelectedPredictionIndex(-1);
        break;
    }
  };

  // Select address from dropdown
  const selectAddress = (prediction) => {
    setBusinessAddress(prediction.description);
    setShowDropdown(false);
    setSelectedPredictionIndex(-1);
  };

  const currentKey = STEP_ORDER[currentIndex];

  // Progress bar state (must be declared before any early returns)
  const totalSteps = STEP_ORDER.length;
  const [progressPercent, setProgressPercent] = useState(
    totalSteps > 1 ? Math.round((currentIndex / (totalSteps - 1)) * 100) : 0
  );
  useEffect(() => {
    const next =
      totalSteps > 1 ? Math.round((currentIndex / (totalSteps - 1)) * 100) : 0;
    // allow transition by updating after a frame
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => setProgressPercent(next));
    } else {
      setTimeout(() => setProgressPercent(next), 0);
    }
  }, [currentIndex, totalSteps]);

  // Fetch business types from API when on step 2
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const res = await fetch("/api/business-types", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) setBusinessTypes(data);
      } catch (_err) {
        // ignore
      }
    };
    if (currentKey === "businessType" && businessTypes.length === 0) {
      fetchBusinessTypes();
    }
  }, [currentKey, businessTypes.length]);

  // Get user's first name
  const getFirstName = () => {
    if (!userData?.full_name) return "there";
    const firstName = userData.full_name.split(" ")[0];
    return firstName;
  };

  const titles = {
    welcome: {
      title: `Welcome, ${getFirstName()}!`,
      desc: "Let's get your service business online — step-by-step and ready in no time.",
    },
    businessType: {
      title: "What kind of business do you operate?",
      desc: "Start typing to find the business type that best fits your trade or service.",
    },
    businessName: {
      title: "What's your business name?",
      desc: "Use the name your customers know. You can always update your business name later.",
    },
    businessPhone: {
      title: "Does your business have a phone number?",
      desc: "Don't have a business line yet? Use your personal number for now — it's easy to change later.",
    },
    businessEmail: {
      title: "Have a business email address?",
      desc: "No dedicated business email? That's okay! Use your personal email for now.",
    },
    businessAddress: {
      title: "What is your business address?",
      desc: "Start typing to select your address from the options that appear below.",
    },
    businessUnit: {
      title: "Suite, unit, or office number (optional)",
      desc: "Add it if you have one, or leave blank to update later.",
    },
    services: {
      title: "Select services that your business offers",
      desc: "Add services to kickstart your business with popular offerings. You can always add, edit and remove services later.",
    },
    features: {
      title: "How do you plan on using Toolpage?",
      desc: "Select the tools that you plan on using to power your business. You can always add, edit and remove tools later.",
    },
    template: {
      title: "Pick a template that matches your brand",
      desc: "Select a template that will bring your service business to life. You can always change the template later.",
    },
    brandColors: {
      title: "Choose your brand colors",
      desc: "Select colors that represent your brand identity and will be used throughout your website",
    },

    subscription: {
      title: "Select a plan that works for you",
      desc: "Start your 7-day free trial with any plan — you won't be charged until your trial ends.",
    },
    payment: {
      title: "Complete your setup",
      desc: "Review your information and add a payment method to start your free trial.",
    },
  };

  // Helper card content per step
  const helperContent = {
    welcome: {
      title: "Welcome to Toolpage!",
      message:
        "We'll guide you through a few simple steps to set up your service business online. Don't worry — you can skip any step and come back to it later.",
    },
    businessType: {
      title: "Choose your business type",
      message:
        "Make sure to select the category that best fits your trade or service. This helps us tailor your site content and features to suit your business perfectly.",
    },
    businessName: {
      title: "Your business name",
      message:
        "Enter the name your customers recognize. Don't have a name yet? That's okay! You can always update it anytime — no pressure to get it perfect right now.",
    },
    businessPhone: {
      title: "Your business phone number",
      message:
        "If you don't have a dedicated business line yet, it's totally fine to use your personal phone number. You can change this anytime.",
    },
    businessEmail: {
      title: "Business email address",
      message:
        "No business email? No problem. Use your personal email to start, and upgrade to a professional email whenever you're ready.",
    },
    businessAddress: {
      title: "Your business address",
      message:
        "Provide your official business address. If you don't have a public storefront, then provide your personal address and make sure to uncheck the checkbox that designates your address as a storefront. Please note that we do not currently support businesses that are outside of the United States.",
    },
    businessUnit: {
      title: "Suite, apartment, or unit (optional)",
      message:
        "Add your suite or unit number if applicable. Otherwise, you can leave it blank and fill it in later if needed.",
    },
    services: {
      title: "Your service offerings",
      message:
        "Select services that your business offers to business your toolpage. Don't worry if you don't see the exact services that you offer, as you can always add, edit and remove custom service offerings later.",
    },
    features: {
      title: "Business features",
      message:
        "Select the tools that you plan on using Toolpage for. You can always add, edit and remove tools later according to your businesses needs.",
    },
    template: {
      title: "Select your website style",
      message:
        "Browse our designs and pick the one that fits your brand. You can always switch templates later without losing your content.",
    },
    brandColors: {
      title: "Choose your brand colors",
      message:
        "Select colors that represent your brand identity. These will be used throughout your website for buttons, backgrounds, and text elements.",
    },
    subscription: {
      title: "Choose a plan that fits",
      message:
        "Start your 7-day free trial with any plan. You won't be charged until your trial ends, and you can upgrade, downgrade, or cancel anytime — no strings attached.",
    },
    payment: {
      title: "Complete your setup",
      message:
        "Review your business information and add a payment method. Your card won't be charged until after your 7-day free trial ends.",
    },
  };

  // Utility validation
  const isValidPhone = (phone) => {
    const clean = phone.replace(/[\s\-\(\)\.]/g, "");
    return /^\d{10,11}$/.test(clean);
  };

  // Check if a color is too light for white text
  const isColorTooLight = (hexColor) => {
    // Convert hex to RGB
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if color is too light (luminance > 0.7)
    return luminance > 0.7;
  };

  // Load Google Maps Places and attach Autocomplete for address field
  useEffect(() => {
    if (currentKey !== "businessAddress") return;

    const apiKey = process.env.NEXT_PUBLIC_MAPS_PLATFORM_API_KEY;
    if (!apiKey || typeof window === "undefined") return;

    const initAutocomplete = () => {
      if (!window.google?.maps?.places) return;
      // Initialize the AutocompleteService for custom dropdown
      setAutocompleteService(
        new window.google.maps.places.AutocompleteService()
      );
    };

    // If script already present
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    const existing = document.getElementById("google-maps-script");
    if (existing) {
      existing.addEventListener("load", initAutocomplete);
      return () => existing.removeEventListener("load", initAutocomplete);
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [currentKey]);

  // Initialize Stripe when on payment step
  useEffect(() => {
    if (currentKey !== "payment" || typeof window === "undefined") return;

    const initStripe = async () => {
      try {
        // Load Stripe.js
        if (!window.Stripe) {
          const script = document.createElement("script");
          script.src = "https://js.stripe.com/v3/";
          script.async = true;
          script.onload = initStripeElements;
          document.body.appendChild(script);
        } else {
          initStripeElements();
        }
      } catch (error) {
        console.error("Failed to initialize Stripe:", error);
        setPaymentError("Failed to load payment system");
      }
    };

    const initStripeElements = () => {
      try {
        // Initialize Stripe with your publishable key
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        if (!publishableKey) {
          setPaymentError("Payment system not configured");
          return;
        }

        stripe = window.Stripe(publishableKey);

        // Create elements instance
        elements = stripe.elements();

        // Create card element
        cardElement = elements.create("card", {
          disableLink: true,
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        });

        // Add event listeners for card validity
        cardElement.on("change", (event) => {
          setCardValid(event.complete && !event.error);
        });

        // Mount card element
        const cardElementContainer = document.getElementById("card-element");
        if (cardElementContainer) {
          cardElement.mount(cardElementContainer);
        }
      } catch (error) {
        console.error("Failed to create Stripe elements:", error);
        setPaymentError("Failed to initialize payment form");
      }
    };

    initStripe();

    return () => {
      // Cleanup Stripe elements
      if (cardElement) {
        cardElement.destroy();
        cardElement = null;
      }
    };
  }, [currentKey]);

  // Fetch pricing information when on payment step
  useEffect(() => {
    if (currentKey !== "payment") return;

    const fetchPricing = async () => {
      try {
        // Get the price ID based on selected plan and billing cycle
        const priceIds = {
          essentials: {
            monthly: "price_1Ruo0P2ErHxxvf9KYydD3N9B",
            yearly: "price_1Ruo0P2ErHxxvf9KUdzM0Hj4",
          },
          pro: {
            monthly: "price_1Ruo1L2ErHxxvf9KbxLXj8vn",
            yearly: "price_1Ruo202ErHxxvf9KI777birl",
          },
          business: {
            monthly: "price_1Ruo2u2ErHxxvf9KbMkqMwgN",
            yearly: "price_1Ruo3F2ErHxxvf9KqxmohAwK",
          },
        };

        const priceId = priceIds[selectedSubscription]?.[billingCycle];
        console.log("Selected subscription:", selectedSubscription);
        console.log("Billing cycle:", billingCycle);
        console.log("Price ID:", priceId);
        if (!priceId) {
          console.error(
            "No price ID found for:",
            selectedSubscription,
            billingCycle
          );
          return;
        }

        const response = await fetch("/api/user-payments/get-pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Pricing data received:", data);
          setPricingInfo(data.price);
        } else {
          console.error("Failed to fetch pricing, status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
      }
    };

    fetchPricing();
  }, [currentKey, selectedSubscription, billingCycle]);

  // Fetch default services for selected business type when on services step
  useEffect(() => {
    let abort = false;
    const fetchDefaultServices = async () => {
      if (currentKey !== "services") return;
      if (!businessType || !businessType.trim()) return;
      try {
        const res = await fetch(
          `/api/business-types/default-services?name=${encodeURIComponent(
            businessType.trim()
          )}`,
          { headers: { "Content-Type": "application/json" } }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (abort) return;
        const services = Array.isArray(data?.services) ? data.services : [];
        setDefaultServices(services);
        // Preselect all if nothing selected yet
        if (
          !selectedDefaultServiceIds ||
          selectedDefaultServiceIds.length === 0
        ) {
          const allIds = services
            .map((s) => s?.id)
            .filter((id) => typeof id === "string");
          setSelectedDefaultServiceIds(allIds);
        }
      } catch (_) {
        // ignore
      }
    };
    fetchDefaultServices();
    return () => {
      abort = true;
    };
  }, [currentKey, businessType]);

  // Fetch all default services (across all business types) once when entering services step
  useEffect(() => {
    let abort = false;
    const fetchAllDefaults = async () => {
      if (currentKey !== "services") return;
      try {
        const res = await fetch("/api/business-types/default-services/all", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (abort) return;
        const list = Array.isArray(data?.services) ? data.services : [];
        setAllDefaultServices(list);
      } catch (_) {
        // ignore
      }
    };
    fetchAllDefaults();
    return () => {
      abort = true;
    };
  }, [currentKey]);

  // Handle clicks outside services dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showServicesDropdown &&
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setShowServicesDropdown(false);
      }

      // Close color pickers when clicking outside
      // Only close if we're not clicking on the color picker itself or its container
      if (
        !event.target.closest(".color-picker-container") &&
        !event.target.closest(".react-colorful")
      ) {
        // Add a small delay to prevent flickering
        setTimeout(() => {
          setShowPrimaryColorPicker(false);
          setShowAccentColorPicker(false);
        }, 50);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showServicesDropdown]);

  // Debounced color validation to prevent flickering
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasLightColors =
        isColorTooLight(primaryColor) || isColorTooLight(accentColor);
      setColorValidationError(hasLightColors);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [primaryColor, accentColor]);

  // Handle clicks outside mobile helper card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHelperCard && !event.target.closest(".helper-card-container")) {
        closeHelperCard();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHelperCard]);

  const closeHelperCard = () => {
    setHelperCardExiting(true);
    setTimeout(() => {
      setShowHelperCard(false);
      setHelperCardExiting(false);
    }, 250); // Match the animation duration from CSS
  };

  const toggleServiceSelected = (serviceId) => {
    setSelectedDefaultServiceIds((prev) => {
      if (!Array.isArray(prev)) return [serviceId];
      return prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
    });
  };

  const completeStep = async () => {
    try {
      setSaving(true);
      setError("");

      const updated = { ...onboarding };
      updated.setup = { ...updated.setup, [currentKey]: true };

      // For payment step, mark setup as completed
      if (currentKey === "payment") {
        updated.status = {
          ...updated.status,
          lastCompletedStep: currentIndex + 1,
          currentStep: currentIndex + 1,
          completed: true,
        };
      } else {
        // Move status forward
        const nextIndex = Math.min(currentIndex + 1, STEP_ORDER.length - 1);
        updated.status = {
          ...updated.status,
          lastCompletedStep: currentIndex + 1,
          currentStep: nextIndex + 1,
          completed: STEP_ORDER.every((k) =>
            k === currentKey ? true : updated.setup[k]
          )
            ? true
            : false,
        };
      }

      const res = await fetch("/api/dashboard/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboarding: updated }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update onboarding");
      }

      // For payment step, complete setup and update parent
      if (currentKey === "payment") {
        onUpdated?.(updated);
        // Don't refresh the page, just update the parent state
        // The parent component will handle showing the dashboard
      } else if (updated.status.completed) {
        onUpdated?.(updated);
      } else {
        setCurrentIndex(nextIndex);
        onUpdated?.(updated);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const goBack = () => {
    setTransitionPhase("out");
    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
      setTransitionPhase("in");
      setTimeout(() => setTransitionPhase("idle"), 200);
    }, 200);
  };

  // Validate step-specific fields
  const validateDetails = () => {
    const errors = {};
    if (!businessName.trim()) errors.businessName = "Business name is required";
    if (!businessAddress.trim()) errors.businessAddress = "Address is required";
    if (!businessPhone.trim() || !isValidPhone(businessPhone))
      errors.businessPhone = "Valid phone is required";
    if (!businessType.trim()) errors.businessType = "Select a business type";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderStep = () => {
    switch (STEP_ORDER[currentIndex]) {
      case "welcome":
        return null;
      case "businessType":
        return (
          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="businessType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Type
              </label>
              <input
                id="businessType"
                type="text"
                value={businessType}
                onChange={handleBusinessTypeChange}
                onKeyDown={handleBusinessTypeKeyDown}
                onBlur={() =>
                  setTimeout(() => setShowBusinessTypeDropdown(false), 150)
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="Select a business type"
              />
              {showBusinessTypeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto p-2">
                  {businessTypePredictions.map((type, index) => (
                    <div
                      key={type.id}
                      onClick={() => selectBusinessType(type)}
                      className={`px-3 py-2 text-sm text-[#191C27] hover:bg-gray-100 cursor-pointer rounded-md ${
                        index === selectedBusinessTypeIndex ? "bg-gray-100" : ""
                      }`}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "businessName":
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="Enter your business name"
              />
            </div>
          </div>
        );

      case "businessPhone":
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="businessPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Phone
              </label>
              <input
                id="businessPhone"
                type="tel"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        );

      case "businessEmail":
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="businessEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Email
              </label>
              <input
                id="businessEmail"
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="info@yourbusiness.com"
              />
            </div>
          </div>
        );

      case "businessAddress":
        return (
          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="businessAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Address
              </label>
              <input
                id="businessAddress"
                ref={addressInputRef}
                type="text"
                value={businessAddress}
                onChange={handleAddressChange}
                onKeyDown={handleAddressKeyDown}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="Start typing your address"
              />
              {showDropdown && predictions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto p-2">
                  {predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 text-sm text-[#191C27] hover:bg-gray-100 cursor-pointer rounded-md ${
                        index === selectedPredictionIndex ? "bg-gray-100" : ""
                      }`}
                      onClick={() => selectAddress(prediction)}
                    >
                      {prediction.description}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="businessUnit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Unit / Suite (optional)
              </label>
              <input
                id="businessUnit"
                type="text"
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="Unit, suite, or office number (optional)"
              />
            </div>
            <div
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() => setIsPublicBusinessAddress((v) => !v)}
            >
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="isPublicBusinessAddress"
                  className="text-sm text-[#191C27] leading-6 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsPublicBusinessAddress((v) => !v);
                  }}
                >
                  This is a public business address that I serve clients from.
                  Such as a storefront, office, or warehouse.
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Public business address
                  </span>
                  <button
                    type="button"
                    id="isPublicBusinessAddress"
                    role="switch"
                    aria-checked={isPublicBusinessAddress}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPublicBusinessAddress((v) => !v);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPublicBusinessAddress ? "bg-[#FF5E00]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPublicBusinessAddress
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      // removed standalone businessUnit step; handled within businessAddress

      case "services":
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  setServiceSearch(value);

                  if (value.trim() === "") {
                    setShowServicesDropdown(false);
                    return;
                  }

                  setShowServicesDropdown(true);
                }}
                onFocus={() => {
                  if (serviceSearch.trim()) {
                    setShowServicesDropdown(true);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                placeholder="Search services (e.g., AC install, water heater, deep clean)"
              />
              {showServicesDropdown && (
                <div
                  ref={servicesDropdownRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto p-2"
                >
                  {(() => {
                    const filtered = allDefaultServices.filter((svc) => {
                      const q = serviceSearch.toLowerCase();
                      const name = (svc?.name || "").toLowerCase();
                      const desc = (
                        svc?.description?.short || ""
                      ).toLowerCase();
                      return name.includes(q) || desc.includes(q);
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No services found
                        </div>
                      );
                    }

                    return filtered.map((svc) => {
                      const isSelected = selectedDefaultServiceIds.includes(
                        svc.id
                      );
                      return (
                        <div
                          key={svc.id}
                          className="px-3 py-2 text-sm text-[#191C27] hover:bg-gray-100 cursor-pointer rounded-md flex items-center justify-between"
                          onClick={() => toggleServiceSelected(svc.id)}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {svc.name}
                            </div>
                            {svc.description?.short && (
                              <div className="text-gray-500 text-xs truncate">
                                {svc.description.short}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              isSelected ? "bg-[#848D6F]" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isSelected ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>

            {/* Show selected services summary */}
            <div className="bg-gray-50 rounded-lg p-5 sp-anim-card-enter">
              <div className="text-base font-semibold text-[#191C27] mb-4">
                Selected services
              </div>
              {selectedDefaultServiceIds.length === 0 ? (
                <div className="text-sm text-[#6B7280]">
                  No services selected yet.
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {selectedDefaultServiceIds
                    .map(
                      (id) =>
                        defaultServices.find((s) => s.id === id) ||
                        allDefaultServices.find((s) => s.id === id)
                    )
                    .filter(Boolean)
                    .map((svc) => (
                      <span
                        key={svc.id}
                        className="inline-flex items-center gap-1 px-2 py-2 text-xs rounded-md bg-[#848D6F] text-white sp-anim-card-enter"
                      >
                        <span className="truncate max-w-[16rem]">
                          {svc.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleServiceSelected(svc.id)}
                          className="ml-1 text-white/90 hover:text-white"
                          aria-label={`Remove ${svc.name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-4 w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Pro Website */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("pro-website")
                      ? prev.filter((f) => f !== "pro-website")
                      : [...prev, "pro-website"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Pro Website
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("pro-website")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("pro-website")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("pro-website")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Client CRM */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("client-crm")
                      ? prev.filter((f) => f !== "client-crm")
                      : [...prev, "client-crm"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Client CRM
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("client-crm")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("client-crm")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("client-crm")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Scheduling */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("scheduling")
                      ? prev.filter((f) => f !== "scheduling")
                      : [...prev, "scheduling"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Scheduling
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("scheduling")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("scheduling")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("scheduling")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Marketing */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("marketing")
                      ? prev.filter((f) => f !== "marketing")
                      : [...prev, "marketing"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Marketing
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("marketing")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("marketing")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("marketing")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Payments */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("payments")
                      ? prev.filter((f) => f !== "payments")
                      : [...prev, "payments"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Payments
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("payments")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("payments")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("payments")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Team Management */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("team-management")
                      ? prev.filter((f) => f !== "team-management")
                      : [...prev, "team-management"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Team Management
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("team-management")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("team-management")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("team-management")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Analytics */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("analytics")
                      ? prev.filter((f) => f !== "analytics")
                      : [...prev, "analytics"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      Analytics
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("analytics")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("analytics")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("analytics")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* AI Agent */}
              <div
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedFeatures((prev) =>
                    prev.includes("ai-agent")
                      ? prev.filter((f) => f !== "ai-agent")
                      : [...prev, "ai-agent"]
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-[#848D6F]" />
                    <span className="font-medium text-sm text-[#191C27]">
                      AI Agent
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={selectedFeatures.includes("ai-agent")}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      selectedFeatures.includes("ai-agent")
                        ? "bg-[#848D6F]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        selectedFeatures.includes("ai-agent")
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "template":
        return (
          <div className="space-y-3">
            {/* Urban Template */}
            <div
              className="bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedTemplate("urban");
                setOpenTemplate(openTemplate === "urban" ? null : "urban");
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#191C27] font-['Inter']">
                      Urban
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-pressed={selectedTemplate === "urban"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate("urban");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        selectedTemplate === "urban"
                          ? "bg-[#848D6F]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          selectedTemplate === "urban"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openTemplate === "urban" ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {openTemplate === "urban" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 sp-anim-template-expand">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                      <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
                        <div className="flex flex-row items-end space-x-4">
                          <div className="text-4xl font-bold text-gray-900 font-['Inter']">
                            Aa
                          </div>
                          <div className="text-3xl font-medium text-gray-700 font-['Inter']">
                            Aa
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-4">
                          Clean, modern typography with excellent readability
                          and visual hierarchy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Industrial Template */}
            <div
              className="bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedTemplate("industrial");
                setOpenTemplate(
                  openTemplate === "industrial" ? null : "industrial"
                );
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#191C27] font-['Lexend_Deca']">
                      Industrial
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-pressed={selectedTemplate === "industrial"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate("industrial");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        selectedTemplate === "industrial"
                          ? "bg-[#848D6F]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          selectedTemplate === "industrial"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openTemplate === "industrial" ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {openTemplate === "industrial" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 sp-anim-template-expand">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="w-full h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg"></div>
                      <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
                        <div className="flex flex-row items-end space-x-4">
                          <div className="text-4xl font-bold text-gray-900 font-['Lexend_Deca']">
                            Aa
                          </div>
                          <div className="text-3xl font-medium text-gray-700 font-['Lexend_Deca']">
                            Aa
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-4">
                          Strong visual elements with clear information
                          hierarchy and structured layout.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Luxury Template */}
            <div
              className="bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedTemplate("luxury");
                setOpenTemplate(openTemplate === "luxury" ? null : "luxury");
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#191C27] font-['Playfair_Display']">
                      Luxury
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-pressed={selectedTemplate === "luxury"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate("luxury");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        selectedTemplate === "luxury"
                          ? "bg-[#848D6F]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          selectedTemplate === "luxury"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openTemplate === "luxury" ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {openTemplate === "luxury" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 sp-anim-template-expand">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="w-full h-32 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg"></div>
                      <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
                        <div className="flex flex-row items-end space-x-4">
                          <div className="text-4xl font-bold text-gray-900 font-['Playfair_Display']">
                            Aa
                          </div>
                          <div className="text-3xl font-medium text-gray-700 font-['Playfair_Display']">
                            Aa
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-4">
                          Elegant typography with refined spacing and
                          sophisticated visual appeal.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "brandColors":
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              {/* Primary Color Card */}
              <div
                className="bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                style={{ borderColor: primaryColor }}
                onClick={() => setShowPrimaryColorPicker(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        Primary
                      </h3>
                    </div>
                  </div>
                  <div className="relative color-picker-container">
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-24 px-2 py-1 text-sm font-mono text-gray-600 border border-gray-200 rounded focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPrimaryColorPicker(true);
                      }}
                    />

                    {/* Color Picker Popup */}
                    {showPrimaryColorPicker && (
                      <div className="absolute top-full right-0 mt-2 z-50">
                        <HexColorPicker
                          color={primaryColor}
                          onChange={setPrimaryColor}
                          className="shadow-lg border border-gray-200 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Accent Color Card */}
              <div
                className="bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                style={{ borderColor: accentColor }}
                onClick={() => setShowAccentColorPicker(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: accentColor }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        Accent
                      </h3>
                    </div>
                  </div>
                  <div className="relative color-picker-container">
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-24 px-2 py-1 text-sm font-mono text-gray-600 border border-gray-200 rounded focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAccentColorPicker(true);
                      }}
                    />

                    {/* Color Picker Popup */}
                    {showAccentColorPicker && (
                      <div className="absolute top-full right-0 mt-2 z-50">
                        <HexColorPicker
                          color={accentColor}
                          onChange={setAccentColor}
                          className="shadow-lg border border-gray-200 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Neutral Color Card */}
              <div
                className="bg-white rounded-lg p-4 border-2"
                style={{ borderColor: neutralColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: neutralColor }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        Neutral
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          neutralColor === "#F5F5F4"
                            ? "border-gray-400 scale-110"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        style={{ backgroundColor: "#F5F5F4" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNeutralColor("#F5F5F4");
                        }}
                        title="Light Warm Gray"
                      />
                      <button
                        type="button"
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          neutralColor === "#F8FAFC"
                            ? "border-gray-400 scale-110"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        style={{ backgroundColor: "#F8FAFC" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNeutralColor("#F8FAFC");
                        }}
                        title="Light Cool Gray"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "subscription":
        return (
          <div className="space-y-3 w-full">
            {/* Billing Cycle Toggle */}
            <div className="mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex w-full">
                <button
                  type="button"
                  onClick={() => handleBillingCycleChange("monthly")}
                  className={`flex-1 px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => handleBillingCycleChange("yearly")}
                  className={`flex-1 px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    billingCycle === "yearly"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Yearly
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#848D6F] text-white">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Essentials Plan */}
            <div
              className="bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedSubscription("essentials");
                setOpenSubscription(
                  openSubscription === "essentials" ? null : "essentials"
                );
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#848D6F] rounded-lg flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-medium text-[#191C27] font-['Inter'] leading-tight">
                          Essentials
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {billingCycle === "monthly"
                            ? "$19/month"
                            : "$182/year"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-pressed={selectedSubscription === "essentials"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubscription("essentials");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        selectedSubscription === "essentials"
                          ? "bg-[#848D6F]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          selectedSubscription === "essentials"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openSubscription === "essentials" ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {openSubscription === "essentials" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 sp-anim-template-expand">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Everything you need to launch fast and look pro.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Drag-and-drop Website Builder
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Mobile-friendly, SEO-ready design
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Integrated Client CRM
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Appointment Scheduling Tools
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Basic Payments setup
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Analytics dashboard
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Email support
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pro Tools Plan */}
            <div
              className="bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedSubscription("pro");
                setOpenSubscription(openSubscription === "pro" ? null : "pro");
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#848D6F] rounded-lg flex items-center justify-center">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-medium text-[#191C27] font-['Inter'] leading-tight">
                          Pro Tools
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {billingCycle === "monthly"
                            ? "$49/month"
                            : "$470/year"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-pressed={selectedSubscription === "pro"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubscription("pro");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        selectedSubscription === "pro"
                          ? "bg-[#848D6F]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          selectedSubscription === "pro"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openSubscription === "pro" ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {openSubscription === "pro" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 sp-anim-template-expand">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        For growing pros who want more power, polish, and
                        performance.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          All Essentials features
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Advanced Marketing tools
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Full-featured CRM & Scheduling
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Enhanced Payments & invoicing
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Team management tools (2 users)
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Priority chat support
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Advanced reporting & analytics
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Hub Plan */}
            <div
              className="bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedSubscription("business");
                setOpenSubscription(
                  openSubscription === "business" ? null : "business"
                );
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#848D6F] rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-medium text-[#191C27] font-['Inter'] leading-tight">
                          Business Hub
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {billingCycle === "monthly"
                            ? "$199/month"
                            : "$1910/year"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-pressed={selectedSubscription === "business"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubscription("business");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        selectedSubscription === "business"
                          ? "bg-[#848D6F]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          selectedSubscription === "business"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openSubscription === "business" ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {openSubscription === "business" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 sp-anim-template-expand">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        The complete system for high-volume service businesses.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Everything in Pro Tools
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Multi-site website builder
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Full Team Management (unlimited)
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Intelligent AI Agent
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Advanced Analytics & reporting
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          Custom domain & integrations
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-xs text-gray-700 whitespace-nowrap">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          White-glove support
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6 w-full max-w-6xl">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column - Pricing Card */}
              <div className="h-full">
                <div className="bg-gray-50 rounded-lg p-6 h-full">
                  <div className="flex items-end gap-2 mb-6 pb-6 border-b border-gray-200">
                    <div className="inline-flex items-center rounded-lg text-3xl font-bold text-[#848D6F] leading-none">
                      $0.00
                    </div>
                    <span className="text-sm font-medium text-[#848D6F]">
                      Due today
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Plan:
                      </span>
                      <span className="text-sm text-gray-900 font-medium">
                        {selectedSubscription === "pro"
                          ? "Pro Tools"
                          : selectedSubscription === "business"
                          ? "Business Hub"
                          : selectedSubscription === "essentials"
                          ? "Essentials"
                          : selectedSubscription}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Billing:
                      </span>
                      <span className="text-sm text-gray-900 font-medium capitalize">
                        {billingCycle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Amount After Trial:
                      </span>
                      <span className="text-sm text-gray-900 font-medium">
                        {pricingInfo && pricingInfo.unitAmount
                          ? `$${(pricingInfo.unitAmount / 100).toFixed(2)}`
                          : (() => {
                              // Fallback prices if API fails
                              const fallbackPrices = {
                                essentials: { monthly: 19, yearly: 182 },
                                pro: { monthly: 49, yearly: 470 },
                                business: { monthly: 199, yearly: 1910 },
                              };
                              const fallback =
                                fallbackPrices[selectedSubscription]?.[
                                  billingCycle
                                ];
                              return fallback
                                ? `$${fallback}`
                                : "Price not available";
                            })()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Trial Ends:
                      </span>
                      <span className="text-sm text-gray-900 font-medium">
                        {(() => {
                          const trialEnd = new Date();
                          trialEnd.setDate(trialEnd.getDate() + 7);
                          return trialEnd.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Payment Method */}
              <div className="h-full">
                <div className="bg-gray-50 rounded-lg p-6 h-full">
                  <h3 className="text-lg font-semibold text-[#191C27] mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#848D6F]" />
                    Payment Method
                  </h3>
                  <div className="space-y-4">
                    {/* Stripe Elements will be rendered here */}
                    <div
                      id="card-element"
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg min-h-[40px]"
                    >
                      {/* Card element placeholder */}
                    </div>

                    <div className="text-xs text-gray-500">
                      Your payment information is secure and encrypted. We use
                      Stripe for secure payment processing.
                    </div>

                    {/* Payment Error */}
                    {paymentError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                        {paymentError}
                      </div>
                    )}

                    {/* Payment Success */}
                    {paymentSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Payment method added successfully! Setting up your
                        account...
                      </div>
                    )}

                    {/* Payment Button */}
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={stripeLoading || paymentSuccess || !cardValid}
                      className="w-full inline-flex items-center justify-center bg-[#FF5E00] hover:bg-[#FF4A00] disabled:opacity-50 text-white px-6 py-3 rounded-md text-base font-medium transition-colors disabled:cursor-not-allowed"
                    >
                      {stripeLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Processing...
                        </div>
                      ) : paymentSuccess ? (
                        "Payment successful! Setting up..."
                      ) : (
                        "Start Free Trial"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* What happens next card - full width below both columns */}
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#191C27] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#191C27] mb-2">
                    What happens next?
                  </h4>
                  <p className="text-xs text-[#191C27] leading-relaxed">
                    Your toolpage website and business tools will be generated
                    using your selections and inputs. You'll get access to all
                    selected features immediately, and your 7-day free trial
                    starts today. You can cancel anytime before the trial ends
                    and you won't be charged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleContinue = () => {
    if (!isFormValid) return;

    // Save current step data before moving to next step
    if (currentKey === "features") {
      // Save features selection to draft
      fetch("/api/setup/draft", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: selectedFeatures,
          lastCompletedStep: currentIndex + 1,
        }),
      }).catch(() => {});
    }

    if (currentKey === "subscription") {
      // Save subscription and billing cycle to draft
      fetch("/api/setup/draft", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: selectedSubscription,
          billingCycle: billingCycle,
          lastCompletedStep: currentIndex + 1,
        }),
      }).catch(() => {});
    }

    // Move to next step
    if (currentIndex < STEP_ORDER.length - 1) {
      setTransitionPhase("out");
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, STEP_ORDER.length - 1));
        setTransitionPhase("in");
        if (typeof window !== "undefined" && window.requestAnimationFrame) {
          window.requestAnimationFrame(() =>
            window.requestAnimationFrame(() => setTransitionPhase("idle"))
          );
        } else {
          setTimeout(() => setTransitionPhase("idle"), 32);
        }
      }, 200);
      // Update lastCompletedStep optimistically
      fetch("/api/setup/step", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastCompletedStep: currentIndex + 1 }),
      }).catch(() => {});
    } else {
      // All steps completed
      console.log("Setup completed!");
      fetch("/api/setup/step", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: true,
          lastCompletedStep: currentIndex + 1,
          currentStep: currentIndex + 1,
        }),
      }).catch(() => {});
    }
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements || !cardElement) {
      setPaymentError("Payment system not ready");
      return;
    }

    setStripeLoading(true);
    setPaymentError("");

    try {
      // Get the price ID based on selected plan and billing cycle
      const priceIds = {
        essentials: {
          monthly: "price_1Ruo0P2ErHxxvf9KYydD3N9B",
          yearly: "price_1Ruo0P2ErHxxvf9KUdzM0Hj4",
        },
        pro: {
          monthly: "price_1Ruo1L2ErHxxvf9KbxLXj8vn",
          yearly: "price_1Ruo202ErHxxvf9KI777birl",
        },
        business: {
          monthly: "price_1Ruo2u2ErHxxvf9KbMkqMwgN",
          yearly: "price_1Ruo3F2ErHxxvf9KqxmohAwK",
        },
      };

      const priceId = priceIds[selectedSubscription]?.[billingCycle];
      if (!priceId) {
        throw new Error("Invalid subscription or billing cycle");
      }

      // Create payment method from the card element
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: userData?.full_name || "",
            email: userData?.email || "",
            phone: businessPhone || "",
            address: {
              line1: businessAddress || "",
              line2: businessUnit || "",
              city: "", // You might want to parse address for these
              state: "",
              postal_code: "",
              country: "US",
            },
          },
        });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Create subscription with the payment method
      const response = await fetch("/api/user-payments/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          billingCycle,
          paymentMethodId: paymentMethod.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create subscription");
      }

      const responseData = await response.json();

      // Log successful subscription creation
      console.log(
        "Trial subscription created - payment will be processed when trial ends"
      );

      // Complete setup and create business
      try {
        const setupResponse = await fetch("/api/setup/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName,
            businessType,
            businessPhone,
            businessEmail,
            businessAddress,
            businessUnit,
            isPublicBusinessAddress,
            selectedDefaultServiceIds,
            selectedFeatures,
            selectedTemplate,
            primaryColor,
            secondaryColor,
            accentColor,
            neutralColor,
            selectedSubscription,
            billingCycle,
          }),
        });

        if (!setupResponse.ok) {
          const setupError = await setupResponse.json();
          console.error("Setup completion failed:", setupError);
          throw new Error(setupError.error || "Failed to complete setup");
        }

        const setupData = await setupResponse.json();
        console.log("Setup completed:", setupData);

        // Generate website after successful setup
        try {
          const websiteResponse = await fetch("/api/setup/site-generator", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              businessName,
              businessType,
              selectedDefaultServiceIds,
              selectedTemplate,
              primaryColor,
              secondaryColor,
              accentColor,
              neutralColor,
            }),
          });

          if (!websiteResponse.ok) {
            const websiteError = await websiteResponse.json();
            console.error("Website generation failed:", websiteError);
            // Don't fail the entire setup if website generation fails
            console.warn(
              "Website generation failed, but setup completed successfully"
            );
          } else {
            const websiteData = await websiteResponse.json();
            console.log("Website generated successfully:", websiteData);
          }
        } catch (websiteError) {
          console.error("Website generation error:", websiteError);
          // Don't fail the entire setup if website generation fails
          console.warn(
            "Website generation failed, but setup completed successfully"
          );
        }

        // Payment and setup both successful
        setPaymentSuccess(true);

        // Show loading state briefly, then refresh page
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (setupError) {
        console.error("Setup completion error:", setupError);
        setPaymentError(
          `Payment successful but setup failed: ${setupError.message}. Please contact support.`
        );
        setPaymentSuccess(false); // Clear success message
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.message || "Payment failed");
    } finally {
      setStripeLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-[calc(100vh-6rem)] p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500"></div>
      </div>
    );
  }

  // Check if setup is completed based on status.completed
  const isSetupCompleted = onboarding?.status?.completed === true;

  // If setup is already completed, don't render anything
  if (isSetupCompleted) return null;

  return (
    <div className="relative">
      <div className="min-h-[calc(100vh-4rem)] p-4 flex flex-col items-center justify-center bg-gray-100">
        {/* Centered form card */}
        <div
          className={`w-full ${
            currentKey === "services" ||
            currentKey === "template" ||
            currentKey === "subscription" ||
            currentKey === "payment"
              ? currentKey === "subscription"
                ? "max-w-3xl"
                : currentKey === "template"
                ? "max-w-3xl"
                : "max-w-4xl"
              : currentKey === "features"
              ? "max-w-2xl"
              : "max-w-md"
          } bg-white p-4 lg:p-8 rounded-lg`}
        >
          <div
            key={currentKey}
            className={`w-full ${
              currentKey === "services" ||
              currentKey === "template" ||
              currentKey === "subscription" ||
              currentKey === "payment"
                ? currentKey === "subscription"
                  ? "max-w-3xl"
                  : currentKey === "template"
                  ? "max-w-3xl"
                  : "max-w-4xl"
                : currentKey === "features"
                ? "max-w-2xl"
                : "max-w-md"
            } sp-anim-card-enter`}
          >
            {/* Title and description */}
            <div className="mb-6">
              {currentKey === "welcome" && (
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-6" />
              )}

              <h2 className="text-2xl md:text-3xl font-semibold text-[#191C27] mb-3">
                {titles[currentKey].title}
              </h2>
              <p className="text-sm md:text-base text-[#848D6F]">
                {titles[currentKey].desc}
              </p>
            </div>

            {/* Step content */}
            {renderStep()}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Color validation error for brand colors step */}
            {currentKey === "brandColors" && colorValidationError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 mt-4 text-sm flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Your primary or accent color that you've selected is too
                  light, and may not look good with your selected template.
                </span>
              </div>
            )}

            {/* Continue button (full width) - hidden on payment step */}
            {currentKey !== "payment" && (
              <div className="mt-4">
                <button
                  onClick={handleContinue}
                  disabled={!isFormValid || saving}
                  className="w-full inline-flex items-center justify-center bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-6 py-3 rounded-md text-base font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Continue"}
                  {!saving && <ArrowRight className="w-4 h-4 ml-2" />}
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Back button below card, centered (hidden on first step) */}
        {currentIndex > 0 && (
          <div className="mt-4">
            <button
              onClick={goBack}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        )}

        {/* Helper card pinned bottom right */}
      </div>
      <div key={`helper-${currentKey}`} className="fixed right-8 bottom-8 z-30">
        {/* Always show icon */}
        <div className="helper-card-container">
          <button
            onClick={() => setShowHelperCard(!showHelperCard)}
            className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          >
            <HelpCircle className="h-5 w-5 text-[#191C27]" />
          </button>

          {/* Helper card popup with close button */}
          {showHelperCard && (
            <div
              className={`absolute bottom-16 right-0 w-80 bg-gray-50 rounded-lg p-4 shadow-lg border border-gray-200 ${
                helperCardExiting
                  ? "sp-anim-template-collapse"
                  : "sp-anim-template-expand"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5 text-[#191C27]">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#191C27]">
                      {helperContent[currentKey]?.title || "Helpful tip"}
                    </div>
                    <div className="mt-1 text-sm text-[#6B7280]">
                      {helperContent[currentKey]?.message ||
                        "Use the fields above to complete this step. You can adjust details later in settings."}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeHelperCard}
                  className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <svg
                    className="w-3 h-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Full-width progress bar at the bottom */}
      <div className="fixed left-0 right-0 bottom-0">
        <div className="h-2 w-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-[#848D6F] sp-anim-progress"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
