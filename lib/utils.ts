import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const priceFormat = new Intl.NumberFormat("vi-VN", {
  currency: 'VND',
  style: 'currency'
})