import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  return "An unexpected error occurred. Please try again.";
};

export const getErrorTitle = (error: any): string => {
  const message = getErrorMessage(error).toLowerCase();
  
  if (message.includes("already registered")) {
    return "Already Registered";
  }
  
  if (message.includes("validation") || message.includes("check your registration details")) {
    return "Invalid Information";
  }
  
  if (message.includes("technical difficulties") || message.includes("server error")) {
    return "Server Error";
  }
  
  if (message.includes("network") || message.includes("connection")) {
    return "Connection Error";
  }
  
  return "Error";
};
