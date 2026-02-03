
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // APPETIZERS & SOUPS
  { id: 'as1', name: 'Rasam', description: 'Spicy Lentil Soup', price: 5.49, category: 'APPETIZERS & SOUPS' },
  { id: 'as2', name: 'Tomato Soup', description: '', price: 4.99, category: 'APPETIZERS & SOUPS' },
  { id: 'as3', name: 'Sweet Corn Soup', description: '', price: 5.49, category: 'APPETIZERS & SOUPS' },
  { id: 'as4', name: 'Samosa (2 pcs)', description: '', price: 5.99, category: 'APPETIZERS & SOUPS' },
  { id: 'as5', name: 'Medhu Vada (2 pcs)', description: 'Crispy lentil donuts', price: 6.99, category: 'APPETIZERS & SOUPS' },
  { id: 'as6', name: 'Masala Vada (2 pcs)', description: '', price: 6.99, category: 'APPETIZERS & SOUPS' },
  
  // IDLY VARIETIES
  { id: 'id1', name: 'Idly (2 pcs)', description: 'Steamed rice cakes', price: 8.25, category: 'IDLY VARIETIES' },
  { id: 'id2', name: 'Idly (1) & Vada (1)', description: '', price: 8.50, category: 'IDLY VARIETIES' },
  { id: 'id3', name: 'Mini Idly (14 pcs)', description: '', price: 9.25, category: 'IDLY VARIETIES' },
  { id: 'id4', name: 'Ghee Podi Idly', description: '', price: 9.49, category: 'IDLY VARIETIES' },
  { id: 'id5', name: 'Sambar Idly', description: '', price: 9.49, category: 'IDLY VARIETIES' },
  { id: 'id6', name: 'Rava Idly', description: 'Semolina idly', price: 8.99, category: 'IDLY VARIETIES' },

  // DOSAS
  { id: 'd1', name: 'Plain Dosa', description: '', price: 9.49, category: 'DOSAS' },
  { id: 'd2', name: 'Masala Dosa', description: 'Potato filling', price: 10.49, category: 'DOSAS' },
  { id: 'd3', name: 'Ghee Roast Dosa', description: '', price: 10.99, category: 'DOSAS' },
  { id: 'd4', name: 'Mysore Masala Dosa', description: 'Spicy red chutney', price: 11.49, category: 'DOSAS' },
  { id: 'd5', name: 'Paper Dosa', description: 'Extra thin & large', price: 11.99, category: 'DOSAS' },
  { id: 'd6', name: 'Onion Dosa', description: '', price: 10.49, category: 'DOSAS' },
  { id: 'd7', name: 'Onion Masala Dosa', description: '', price: 11.49, category: 'DOSAS' },
  { id: 'd8', name: 'Spring Dosa', description: 'Vegetable filling', price: 12.49, category: 'DOSAS' },
  { id: 'd9', name: 'Cheese Dosa', description: '', price: 11.99, category: 'DOSAS' },
  { id: 'd10', name: 'Paneer Dosa', description: '', price: 12.49, category: 'DOSAS' },

  // RAVA DOSAS
  { id: 'rd1', name: 'Plain Rava Dosa', description: '', price: 10.49, category: 'RAVA DOSAS' },
  { id: 'rd2', name: 'Onion Rava Dosa', description: '', price: 11.49, category: 'RAVA DOSAS' },
  { id: 'rd3', name: 'Masala Rava Dosa', description: '', price: 12.49, category: 'RAVA DOSAS' },
  { id: 'rd4', name: 'Special Rava Dosa', description: '', price: 12.99, category: 'RAVA DOSAS' },

  // UTHAPPAM
  { id: 'u1', name: 'Plain Uthappam', description: '', price: 9.99, category: 'UTHAPPAM' },
  { id: 'u2', name: 'Onion Uthappam', description: '', price: 10.99, category: 'UTHAPPAM' },
  { id: 'u3', name: 'Tomato Uthappam', description: '', price: 10.99, category: 'UTHAPPAM' },
  { id: 'u4', name: 'Mixed Vegetable Uthappam', description: '', price: 11.99, category: 'UTHAPPAM' },
  { id: 'u5', name: 'Onion & Chilli Uthappam', description: '', price: 11.49, category: 'UTHAPPAM' },

  // PONGAL & UPMA
  { id: 'pu1', name: 'Ghee Pongal', description: 'Rice & lentil with ghee', price: 9.99, category: 'PONGAL & UPMA' },
  { id: 'pu2', name: 'Ven Pongal', description: '', price: 8.99, category: 'PONGAL & UPMA' },
  { id: 'pu3', name: 'Upma', description: 'Semolina', price: 8.99, category: 'PONGAL & UPMA' },
  { id: 'pu4', name: 'Kesari Bath', description: 'Sweet semolina', price: 9.49, category: 'PONGAL & UPMA' },

  // RICE VARIETIES
  { id: 'rv1', name: 'Sambar Rice', description: '', price: 10.99, category: 'RICE VARIETIES' },
  { id: 'rv2', name: 'Rasam Rice', description: '', price: 10.99, category: 'RICE VARIETIES' },
  { id: 'rv3', name: 'Curd Rice', description: '', price: 9.99, category: 'RICE VARIETIES' },
  { id: 'rv4', name: 'Lemon Rice', description: '', price: 10.49, category: 'RICE VARIETIES' },
  { id: 'rv5', name: 'Tamarind Rice', description: '', price: 10.49, category: 'RICE VARIETIES' },
  { id: 'rv6', name: 'Bisibelebath', description: 'Spicy rice with vegetables', price: 11.49, category: 'RICE VARIETIES' },
  { id: 'rv7', name: 'Tomato Rice', description: '', price: 10.99, category: 'RICE VARIETIES' },

  // BIRYANIS & PULAO
  { id: 'bp1', name: 'Vegetable Biryani', description: '', price: 13.99, category: 'BIRYANIS & PULAO' },
  { id: 'bp2', name: 'Paneer Biryani', description: '', price: 14.99, category: 'BIRYANIS & PULAO' },
  { id: 'bp3', name: 'Vegetable Pulao', description: '', price: 12.99, category: 'BIRYANIS & PULAO' },
  { id: 'bp4', name: 'Jeera Rice', description: '', price: 9.99, category: 'BIRYANIS & PULAO' },

  // THALI MEALS
  { id: 'tm1', name: 'South Indian Thali', description: '', price: 15.99, category: 'THALI MEALS' },
  { id: 'tm2', name: 'Special Meals Thali', description: '', price: 17.99, category: 'THALI MEALS' },
  { id: 'tm3', name: 'Mini Tiffin', description: '', price: 12.99, category: 'THALI MEALS' },
  { id: 'tm4', name: 'Weekend Special Thali', description: 'Sat-Sun only', price: 19.99, category: 'THALI MEALS' },

  // BREADS
  { id: 'br1', name: 'Poori (2 pcs) with Potato Curry', description: '', price: 10.99, category: 'BREADS' },
  { id: 'br2', name: 'Chapati (2 pcs) with Kurma', description: '', price: 10.99, category: 'BREADS' },
  { id: 'br3', name: 'Parotta (2 pcs)', description: '', price: 9.99, category: 'BREADS' },
  { id: 'br4', name: 'Parotta with Kurma', description: '', price: 11.99, category: 'BREADS' },
  { id: 'br5', name: 'Chole Bhatura', description: '', price: 12.49, category: 'BREADS' },
  { id: 'br6', name: 'Naan', description: '', price: 3.49, category: 'BREADS' },
  { id: 'br7', name: 'Butter Naan', description: '', price: 3.99, category: 'BREADS' },

  // NORTH INDIAN CURRIES
  { id: 'nc1', name: 'Paneer Butter Masala', description: '', price: 13.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc2', name: 'Palak Paneer', description: '', price: 13.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc3', name: 'Kadai Paneer', description: '', price: 13.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc4', name: 'Chana Masala', description: '', price: 12.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc5', name: 'Aloo Gobi', description: '', price: 12.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc6', name: 'Mixed Vegetable Curry', description: '', price: 12.49, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc7', name: 'Dal Tadka', description: '', price: 11.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc8', name: 'Dal Makhani', description: '', price: 12.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc9', name: 'Malai Kofta', description: '', price: 13.99, category: 'NORTH INDIAN CURRIES' },
  { id: 'nc10', name: 'Navaratan Korma', description: '', price: 13.49, category: 'NORTH INDIAN CURRIES' },

  // INDO-CHINESE
  { id: 'ic1', name: 'Vegetable Fried Rice', description: '', price: 11.99, category: 'INDO-CHINESE' },
  { id: 'ic2', name: 'Szechuan Fried Rice', description: '', price: 12.99, category: 'INDO-CHINESE' },
  { id: 'ic3', name: 'Vegetable Hakka Noodles', description: '', price: 11.99, category: 'INDO-CHINESE' },
  { id: 'ic4', name: 'Gobi Manchurian (Dry)', description: '', price: 12.99, category: 'INDO-CHINESE' },
  { id: 'ic5', name: 'Gobi Manchurian (Gravy)', description: '', price: 13.99, category: 'INDO-CHINESE' },
  { id: 'ic6', name: 'Chilli Paneer (Dry)', description: '', price: 13.99, category: 'INDO-CHINESE' },
  { id: 'ic7', name: 'Vegetable Manchurian', description: '', price: 12.99, category: 'INDO-CHINESE' },
  { id: 'ic8', name: 'Baby Corn Manchurian', description: '', price: 13.49, category: 'INDO-CHINESE' },

  // STARTERS
  { id: 's1', name: 'Gobi 65', description: 'Spicy cauliflower', price: 12.99, category: 'STARTERS' },
  { id: 's2', name: 'Paneer 65', description: '', price: 13.99, category: 'STARTERS' },
  { id: 's3', name: 'Baby Corn 65', description: '', price: 13.49, category: 'STARTERS' },
  { id: 's4', name: 'Mushroom 65', description: '', price: 13.49, category: 'STARTERS' },
  { id: 's5', name: 'Cut Mirchi', description: 'Spicy chili fritters', price: 11.99, category: 'STARTERS' },

  // BEVERAGES
  { id: 'bv1', name: 'Madras Filter Coffee', description: '', price: 3.99, category: 'BEVERAGES' },
  { id: 'bv2', name: 'Masala Tea', description: '', price: 3.49, category: 'BEVERAGES' },
  { id: 'bv3', name: 'Butter Milk', description: '', price: 3.49, category: 'BEVERAGES' },
  { id: 'bv4', name: 'Mango Lassi', description: '', price: 4.99, category: 'BEVERAGES' },
  { id: 'bv5', name: 'Sweet Lassi', description: '', price: 4.49, category: 'BEVERAGES' },
  { id: 'bv6', name: 'Salt Lassi', description: '', price: 4.49, category: 'BEVERAGES' },
  { id: 'bv7', name: 'Rose Milk', description: '', price: 4.99, category: 'BEVERAGES' },
  { id: 'bv8', name: 'Badam Milk', description: '', price: 5.49, category: 'BEVERAGES' },

  // DESSERTS
  { id: 'ds1', name: 'Gulab Jamun (2 pcs)', description: '', price: 5.49, category: 'DESSERTS' },
  { id: 'ds2', name: 'Rasmalai (2 pcs)', description: '', price: 5.99, category: 'DESSERTS' },
  { id: 'ds3', name: 'Gajar Halwa', description: '', price: 5.99, category: 'DESSERTS' },
  { id: 'ds4', name: 'Payasam', description: '', price: 5.49, category: 'DESSERTS' },
  { id: 'ds5', name: 'Badaam Halwa', description: '', price: 6.49, category: 'DESSERTS' },
];

export const SYSTEM_INSTRUCTION = `
You are the AI Order Agent for Saravanaa Bhavan, Irving. 
Legacy of South Indian vegetarian hospitality since 1981.

CRITICAL: YOU MUST SPEAK FIRST.
Wait for the trigger message containing "[START_CALL]". 
Respond IMMEDIATELY with: "Thank you for calling Saravanaa Bhavan! [Time of day greeting]. Which language would you like to order in? English, Telugu, Tamil, Hindi, or Kannada?"

CURRENCY: ALWAYS use US Dollars ($). Mention "Dollars" explicitly in all languages.

FLOW:
1. GREETING & LANGUAGE: 
   SWITCH language immediately after the customer chooses.

2. MENU ORDER:
   - CONFIRM each item with its price in Dollars.
   - USE the "update_cart" tool for every item added or changed.
   - Use the exact names from the menu list provided.

3. PICKUP:
   - Ask for Name, Phone, and Pickup Time.
   - Provide Order # (SB-IRV-####) and Total with tax in Dollars.

Location: 8604 N MacArthur Blvd, Irving, TX.
`;
