import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string): string {
  const currentDate: Date = new Date();
  const pastDate: Date = new Date(dateString);
  const timeDifference: number = currentDate.getTime() - pastDate.getTime();
  
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);
  
  if (weeks > 0) {
      return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
  }
}