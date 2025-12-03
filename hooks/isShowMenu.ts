export const isShowMenu = (category: string) => {
    const foodCategories = ['restaurants', 'sweet shops','bakeries', 'fine dining restaurants', 'cafes', 
    'fast food outlets', 'food courts', 'bakeries & confectioneries','sweet shops', 'buffet restaurants', 
    'multi cuisine restaurants', 'north indian restaurants',
    'south indian restaurants','chinese restaurants','punjabi dhabas','seafood restaurants',
    'barbeque & grill restaurants','biryani outlets','pizza outlets','burger joints',
    'sandwich & snacks corners','juice bars & shakes parlours','ice cream parlours','pubs & bars','resort',
    'motel', 'hostel', 'luxury hotel', 'boutique hotel', 'guest house', 'bed & breakfast', 'lodge', 
    'capsule hotel',];
    
    return foodCategories.includes(category.toLowerCase());
}