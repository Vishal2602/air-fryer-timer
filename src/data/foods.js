/**
 * Air Fryer Food Database
 * Contains cooking times, temperatures, and step-by-step instructions
 * for various foods commonly cooked in air fryers.
 *
 * Data integrity notes:
 * - All times are in minutes
 * - All temperatures are in Fahrenheit
 * - Actions are triggered at elapsed minutes (from start)
 */

export const CATEGORIES = {
  protein: { label: "Proteins", icon: "🥩" },
  vegetable: { label: "Vegetables", icon: "🥦" },
  frozen: { label: "Frozen Foods", icon: "❄️" },
  snack: { label: "Snacks", icon: "🍟" }
};

export const foods = [
  // ==================== PROTEINS ====================
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    category: "protein",
    cookTime: 24,
    temperature: 400,
    image: "🍗",
    actions: [
      {
        atMinute: 12,
        type: "flip",
        message: "Flip the wings for even cooking"
      },
      {
        atMinute: 20,
        type: "check",
        message: "Check for desired crispiness"
      }
    ],
    instructions: [
      { step: 1, text: "Pat wings completely dry with paper towels", timing: "before" },
      { step: 2, text: "Season wings with salt, pepper, and desired spices", timing: "before" },
      { step: 3, text: "Arrange in single layer - don't overcrowd the basket", timing: "before" },
      { step: 4, text: "Cook at 400°F for 24 minutes total", timing: "during" },
      { step: 5, text: "Flip wings halfway through cooking", timing: "during" },
      { step: 6, text: "Check internal temp reaches 165°F", timing: "after" }
    ],
    tips: "For extra crispy skin, lightly coat with baking powder before cooking"
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    category: "protein",
    cookTime: 18,
    temperature: 375,
    image: "🍗",
    actions: [
      {
        atMinute: 9,
        type: "flip",
        message: "Flip the chicken breast"
      },
      {
        atMinute: 15,
        type: "check",
        message: "Check internal temperature - should reach 165°F"
      }
    ],
    instructions: [
      { step: 1, text: "Pound chicken to even thickness if needed", timing: "before" },
      { step: 2, text: "Season both sides with preferred spices", timing: "before" },
      { step: 3, text: "Lightly brush with oil or spray", timing: "before" },
      { step: 4, text: "Place in basket, don't overlap pieces", timing: "before" },
      { step: 5, text: "Flip halfway through cooking", timing: "during" },
      { step: 6, text: "Let rest 5 minutes before slicing", timing: "after" }
    ],
    tips: "Brining for 30 minutes beforehand keeps the chicken juicy"
  },
  {
    id: "salmon",
    name: "Salmon Fillet",
    category: "protein",
    cookTime: 10,
    temperature: 390,
    image: "🐟",
    actions: [
      {
        atMinute: 7,
        type: "check",
        message: "Check salmon - it should flake easily when done"
      }
    ],
    instructions: [
      { step: 1, text: "Pat salmon dry with paper towels", timing: "before" },
      { step: 2, text: "Season with salt, pepper, and lemon", timing: "before" },
      { step: 3, text: "Place skin-side down in basket", timing: "before" },
      { step: 4, text: "No flipping needed for most fillets", timing: "during" },
      { step: 5, text: "Check that it flakes easily with a fork", timing: "after" }
    ],
    tips: "Salmon continues cooking after removal - pull it slightly early for perfect doneness"
  },
  {
    id: "shrimp",
    name: "Shrimp",
    category: "protein",
    cookTime: 8,
    temperature: 400,
    image: "🦐",
    actions: [
      {
        atMinute: 4,
        type: "shake",
        message: "Shake the basket to redistribute shrimp"
      }
    ],
    instructions: [
      { step: 1, text: "Peel and devein shrimp if needed", timing: "before" },
      { step: 2, text: "Pat completely dry", timing: "before" },
      { step: 3, text: "Toss with oil and seasonings", timing: "before" },
      { step: 4, text: "Spread in single layer in basket", timing: "before" },
      { step: 5, text: "Shake basket halfway through", timing: "during" },
      { step: 6, text: "Shrimp should be pink and opaque when done", timing: "after" }
    ],
    tips: "Don't overcook - shrimp turn rubbery when overdone"
  },
  {
    id: "steak",
    name: "Steak (1-inch)",
    category: "protein",
    cookTime: 12,
    temperature: 400,
    image: "🥩",
    actions: [
      {
        atMinute: 6,
        type: "flip",
        message: "Flip the steak"
      },
      {
        atMinute: 10,
        type: "check",
        message: "Check temperature: 130°F for medium-rare, 140°F for medium"
      }
    ],
    instructions: [
      { step: 1, text: "Let steak come to room temperature (30 min)", timing: "before" },
      { step: 2, text: "Pat dry and season generously with salt and pepper", timing: "before" },
      { step: 3, text: "Lightly oil the steak, not the basket", timing: "before" },
      { step: 4, text: "Flip once halfway through cooking", timing: "during" },
      { step: 5, text: "Rest for 5 minutes before cutting", timing: "after" }
    ],
    tips: "For a thicker steak (1.5 inch+), add 3-4 minutes total time"
  },
  {
    id: "pork-chops",
    name: "Pork Chops",
    category: "protein",
    cookTime: 14,
    temperature: 375,
    image: "🥩",
    actions: [
      {
        atMinute: 7,
        type: "flip",
        message: "Flip the pork chops"
      },
      {
        atMinute: 12,
        type: "check",
        message: "Check internal temp - should reach 145°F"
      }
    ],
    instructions: [
      { step: 1, text: "Pat chops dry with paper towels", timing: "before" },
      { step: 2, text: "Season both sides generously", timing: "before" },
      { step: 3, text: "Brush lightly with oil", timing: "before" },
      { step: 4, text: "Flip halfway through cooking", timing: "during" },
      { step: 5, text: "Let rest 3-5 minutes before serving", timing: "after" }
    ],
    tips: "Bone-in chops stay juicier than boneless"
  },
  {
    id: "bacon",
    name: "Bacon",
    category: "protein",
    cookTime: 10,
    temperature: 375,
    image: "🥓",
    actions: [
      {
        atMinute: 5,
        type: "check",
        message: "Check bacon crispiness - adjust time as needed"
      },
      {
        atMinute: 7,
        type: "flip",
        message: "Flip bacon strips if they're thick-cut"
      }
    ],
    instructions: [
      { step: 1, text: "Lay bacon strips in single layer", timing: "before" },
      { step: 2, text: "No overlapping - cook in batches if needed", timing: "before" },
      { step: 3, text: "No need to preheat for bacon", timing: "before" },
      { step: 4, text: "Check at 5 minutes for desired crispiness", timing: "during" },
      { step: 5, text: "Transfer to paper towels immediately", timing: "after" }
    ],
    tips: "Thick-cut bacon needs 2-3 extra minutes"
  },
  {
    id: "chicken-thighs",
    name: "Chicken Thighs",
    category: "protein",
    cookTime: 22,
    temperature: 380,
    image: "🍗",
    actions: [
      {
        atMinute: 11,
        type: "flip",
        message: "Flip the chicken thighs"
      },
      {
        atMinute: 18,
        type: "check",
        message: "Check internal temp - should reach 165°F"
      }
    ],
    instructions: [
      { step: 1, text: "Pat thighs dry for crispy skin", timing: "before" },
      { step: 2, text: "Season under and over the skin", timing: "before" },
      { step: 3, text: "Place skin-side down first", timing: "before" },
      { step: 4, text: "Flip to skin-side up at halfway point", timing: "during" },
      { step: 5, text: "Let rest 5 minutes before serving", timing: "after" }
    ],
    tips: "For extra crispy skin, increase temp to 400°F for last 3 minutes"
  },

  // ==================== VEGETABLES ====================
  {
    id: "french-fries",
    name: "Fresh French Fries",
    category: "vegetable",
    cookTime: 20,
    temperature: 380,
    image: "🍟",
    actions: [
      {
        atMinute: 7,
        type: "shake",
        message: "Shake the basket to toss the fries"
      },
      {
        atMinute: 14,
        type: "shake",
        message: "Shake again for even browning"
      }
    ],
    instructions: [
      { step: 1, text: "Cut potatoes into even-sized strips", timing: "before" },
      { step: 2, text: "Soak in cold water 30 min, then pat dry", timing: "before" },
      { step: 3, text: "Toss with 1-2 tbsp oil and salt", timing: "before" },
      { step: 4, text: "Don't overcrowd - cook in batches", timing: "before" },
      { step: 5, text: "Shake basket every 7 minutes", timing: "during" },
      { step: 6, text: "Season with additional salt immediately", timing: "after" }
    ],
    tips: "Soaking removes starch for crispier fries"
  },
  {
    id: "sweet-potato-fries",
    name: "Sweet Potato Fries",
    category: "vegetable",
    cookTime: 18,
    temperature: 375,
    image: "🍠",
    actions: [
      {
        atMinute: 6,
        type: "shake",
        message: "Shake the basket"
      },
      {
        atMinute: 12,
        type: "shake",
        message: "Shake again for even cooking"
      }
    ],
    instructions: [
      { step: 1, text: "Cut into thin, even strips", timing: "before" },
      { step: 2, text: "Toss with cornstarch and oil", timing: "before" },
      { step: 3, text: "Spread in single layer", timing: "before" },
      { step: 4, text: "Shake every 6 minutes", timing: "during" },
      { step: 5, text: "Season while hot", timing: "after" }
    ],
    tips: "Add a pinch of cornstarch for extra crispiness"
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetable",
    cookTime: 8,
    temperature: 375,
    image: "🥦",
    actions: [
      {
        atMinute: 4,
        type: "shake",
        message: "Shake the basket to redistribute broccoli"
      }
    ],
    instructions: [
      { step: 1, text: "Cut into even-sized florets", timing: "before" },
      { step: 2, text: "Toss with oil, salt, and garlic", timing: "before" },
      { step: 3, text: "Spread in single layer", timing: "before" },
      { step: 4, text: "Shake halfway through", timing: "during" },
      { step: 5, text: "Add parmesan or lemon if desired", timing: "after" }
    ],
    tips: "Crispy edges with tender centers is the goal"
  },
  {
    id: "brussels-sprouts",
    name: "Brussels Sprouts",
    category: "vegetable",
    cookTime: 15,
    temperature: 375,
    image: "🥬",
    actions: [
      {
        atMinute: 7,
        type: "shake",
        message: "Shake the basket"
      },
      {
        atMinute: 12,
        type: "check",
        message: "Check for desired crispiness"
      }
    ],
    instructions: [
      { step: 1, text: "Trim ends and halve sprouts", timing: "before" },
      { step: 2, text: "Toss with oil, salt, and pepper", timing: "before" },
      { step: 3, text: "Place cut-side down for better browning", timing: "before" },
      { step: 4, text: "Shake basket halfway through", timing: "during" },
      { step: 5, text: "Drizzle with balsamic if desired", timing: "after" }
    ],
    tips: "Outer leaves will get extra crispy - that's a good thing!"
  },
  {
    id: "asparagus",
    name: "Asparagus",
    category: "vegetable",
    cookTime: 8,
    temperature: 400,
    image: "🌿",
    actions: [
      {
        atMinute: 4,
        type: "shake",
        message: "Roll the asparagus for even cooking"
      }
    ],
    instructions: [
      { step: 1, text: "Snap off woody ends", timing: "before" },
      { step: 2, text: "Toss with oil, salt, and pepper", timing: "before" },
      { step: 3, text: "Arrange in single layer", timing: "before" },
      { step: 4, text: "Roll/shake halfway through", timing: "during" },
      { step: 5, text: "Squeeze lemon over before serving", timing: "after" }
    ],
    tips: "Thin spears cook faster - watch them closely"
  },
  {
    id: "zucchini",
    name: "Zucchini",
    category: "vegetable",
    cookTime: 12,
    temperature: 400,
    image: "🥒",
    actions: [
      {
        atMinute: 6,
        type: "flip",
        message: "Flip the zucchini pieces"
      }
    ],
    instructions: [
      { step: 1, text: "Cut into 1/2-inch rounds or spears", timing: "before" },
      { step: 2, text: "Toss with oil and Italian seasoning", timing: "before" },
      { step: 3, text: "Spread in single layer", timing: "before" },
      { step: 4, text: "Flip halfway through", timing: "during" },
      { step: 5, text: "Top with parmesan if desired", timing: "after" }
    ],
    tips: "Don't cut too thin or they'll get soggy"
  },
  {
    id: "cauliflower",
    name: "Cauliflower",
    category: "vegetable",
    cookTime: 15,
    temperature: 400,
    image: "🥬",
    actions: [
      {
        atMinute: 7,
        type: "shake",
        message: "Shake the basket"
      },
      {
        atMinute: 12,
        type: "check",
        message: "Check for golden brown color"
      }
    ],
    instructions: [
      { step: 1, text: "Cut into even-sized florets", timing: "before" },
      { step: 2, text: "Toss with oil and spices", timing: "before" },
      { step: 3, text: "Don't overcrowd the basket", timing: "before" },
      { step: 4, text: "Shake halfway through", timing: "during" },
      { step: 5, text: "Great for buffalo or curry flavors", timing: "after" }
    ],
    tips: "For buffalo cauliflower, toss with sauce after cooking"
  },

  // ==================== FROZEN FOODS ====================
  {
    id: "frozen-fries",
    name: "Frozen Fries",
    category: "frozen",
    cookTime: 15,
    temperature: 400,
    image: "🍟",
    actions: [
      {
        atMinute: 7,
        type: "shake",
        message: "Shake the basket"
      },
      {
        atMinute: 12,
        type: "check",
        message: "Check crispiness"
      }
    ],
    instructions: [
      { step: 1, text: "No need to thaw - cook from frozen", timing: "before" },
      { step: 2, text: "Light spray of oil is optional", timing: "before" },
      { step: 3, text: "Don't overcrowd - max 1 layer", timing: "before" },
      { step: 4, text: "Shake basket halfway through", timing: "during" },
      { step: 5, text: "Season immediately after cooking", timing: "after" }
    ],
    tips: "Thin fries cook faster than thick steak fries"
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    category: "frozen",
    cookTime: 10,
    temperature: 400,
    image: "🍗",
    actions: [
      {
        atMinute: 5,
        type: "shake",
        message: "Shake or flip the nuggets"
      }
    ],
    instructions: [
      { step: 1, text: "Place frozen nuggets in single layer", timing: "before" },
      { step: 2, text: "No oil needed", timing: "before" },
      { step: 3, text: "Shake or flip halfway through", timing: "during" },
      { step: 4, text: "Check that they're heated through", timing: "after" }
    ],
    tips: "Add 1-2 minutes for extra crispy coating"
  },
  {
    id: "fish-sticks",
    name: "Fish Sticks",
    category: "frozen",
    cookTime: 10,
    temperature: 400,
    image: "🐟",
    actions: [
      {
        atMinute: 5,
        type: "flip",
        message: "Flip the fish sticks"
      }
    ],
    instructions: [
      { step: 1, text: "Arrange frozen sticks in single layer", timing: "before" },
      { step: 2, text: "Light oil spray optional for crispiness", timing: "before" },
      { step: 3, text: "Flip halfway through", timing: "during" },
      { step: 4, text: "Serve with tartar sauce or lemon", timing: "after" }
    ],
    tips: "Don't stack them - they won't cook evenly"
  },
  {
    id: "pizza-rolls",
    name: "Pizza Rolls",
    category: "frozen",
    cookTime: 8,
    temperature: 380,
    image: "🍕",
    actions: [
      {
        atMinute: 4,
        type: "shake",
        message: "Shake the basket"
      }
    ],
    instructions: [
      { step: 1, text: "Spread frozen rolls in single layer", timing: "before" },
      { step: 2, text: "Leave space between each one", timing: "before" },
      { step: 3, text: "Shake basket halfway through", timing: "during" },
      { step: 4, text: "Let cool 1 minute - filling is HOT!", timing: "after" }
    ],
    tips: "They will burst if overcooked - watch them!"
  },
  {
    id: "mozzarella-sticks",
    name: "Mozzarella Sticks",
    category: "frozen",
    cookTime: 6,
    temperature: 375,
    image: "🧀",
    actions: [
      {
        atMinute: 3,
        type: "flip",
        message: "Flip the mozzarella sticks"
      }
    ],
    instructions: [
      { step: 1, text: "Place frozen sticks in single layer", timing: "before" },
      { step: 2, text: "Don't let them touch each other", timing: "before" },
      { step: 3, text: "Flip carefully halfway through", timing: "during" },
      { step: 4, text: "Serve immediately with marinara", timing: "after" }
    ],
    tips: "Cook from frozen - thawed ones will leak cheese everywhere"
  },
  {
    id: "frozen-wings",
    name: "Frozen Wings",
    category: "frozen",
    cookTime: 28,
    temperature: 400,
    image: "🍗",
    actions: [
      {
        atMinute: 14,
        type: "flip",
        message: "Flip the wings"
      },
      {
        atMinute: 22,
        type: "check",
        message: "Check internal temp - should reach 165°F"
      }
    ],
    instructions: [
      { step: 1, text: "Place frozen wings in single layer", timing: "before" },
      { step: 2, text: "No oil needed - they have enough fat", timing: "before" },
      { step: 3, text: "Flip at the halfway point", timing: "during" },
      { step: 4, text: "Toss with sauce after cooking", timing: "after" }
    ],
    tips: "Frozen wings take longer than fresh - don't rush!"
  },

  // ==================== SNACKS ====================
  {
    id: "tater-tots",
    name: "Tater Tots",
    category: "snack",
    cookTime: 15,
    temperature: 400,
    image: "🥔",
    actions: [
      {
        atMinute: 5,
        type: "shake",
        message: "Shake the basket"
      },
      {
        atMinute: 10,
        type: "shake",
        message: "Shake again for even browning"
      }
    ],
    instructions: [
      { step: 1, text: "Spread tots in even layer", timing: "before" },
      { step: 2, text: "Don't stack too high", timing: "before" },
      { step: 3, text: "Shake every 5 minutes", timing: "during" },
      { step: 4, text: "Season with salt while hot", timing: "after" }
    ],
    tips: "For extra crispy tots, shake more frequently"
  },
  {
    id: "egg-rolls",
    name: "Egg Rolls",
    category: "snack",
    cookTime: 10,
    temperature: 375,
    image: "🥟",
    actions: [
      {
        atMinute: 5,
        type: "flip",
        message: "Flip the egg rolls"
      }
    ],
    instructions: [
      { step: 1, text: "Brush or spray with light oil", timing: "before" },
      { step: 2, text: "Place in single layer, not touching", timing: "before" },
      { step: 3, text: "Flip halfway through", timing: "during" },
      { step: 4, text: "Let cool slightly before eating", timing: "after" }
    ],
    tips: "Works for both frozen and fresh egg rolls"
  },
  {
    id: "spring-rolls",
    name: "Spring Rolls",
    category: "snack",
    cookTime: 8,
    temperature: 375,
    image: "🥟",
    actions: [
      {
        atMinute: 4,
        type: "flip",
        message: "Flip the spring rolls"
      }
    ],
    instructions: [
      { step: 1, text: "Spray lightly with oil for crispy skin", timing: "before" },
      { step: 2, text: "Arrange in single layer", timing: "before" },
      { step: 3, text: "Flip at halfway point", timing: "during" },
      { step: 4, text: "Serve with sweet chili sauce", timing: "after" }
    ],
    tips: "Frozen spring rolls may need 2 extra minutes"
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    category: "snack",
    cookTime: 10,
    temperature: 375,
    image: "🧅",
    actions: [
      {
        atMinute: 5,
        type: "flip",
        message: "Flip the onion rings"
      }
    ],
    instructions: [
      { step: 1, text: "Arrange in single layer", timing: "before" },
      { step: 2, text: "Spray lightly with oil if frozen", timing: "before" },
      { step: 3, text: "Flip halfway through", timing: "during" },
      { step: 4, text: "Season with salt immediately", timing: "after" }
    ],
    tips: "Homemade onion rings may need a few extra minutes"
  },
  {
    id: "jalapeno-poppers",
    name: "Jalapeño Poppers",
    category: "snack",
    cookTime: 8,
    temperature: 375,
    image: "🌶️",
    actions: [
      {
        atMinute: 4,
        type: "check",
        message: "Check poppers - they cook fast!"
      },
      {
        atMinute: 6,
        type: "flip",
        message: "Flip for even browning"
      }
    ],
    instructions: [
      { step: 1, text: "Place frozen poppers in single layer", timing: "before" },
      { step: 2, text: "Leave space between each one", timing: "before" },
      { step: 3, text: "Check early - they can burn quickly", timing: "during" },
      { step: 4, text: "Let cool 2 minutes - filling is very hot!", timing: "after" }
    ],
    tips: "These can go from perfect to burnt quickly - watch them!"
  },
  {
    id: "corn-dogs",
    name: "Corn Dogs",
    category: "snack",
    cookTime: 10,
    temperature: 375,
    image: "🌭",
    actions: [
      {
        atMinute: 5,
        type: "flip",
        message: "Flip the corn dogs"
      }
    ],
    instructions: [
      { step: 1, text: "Place frozen corn dogs in basket", timing: "before" },
      { step: 2, text: "Leave space for air circulation", timing: "before" },
      { step: 3, text: "Flip halfway through", timing: "during" },
      { step: 4, text: "Serve with mustard and ketchup", timing: "after" }
    ],
    tips: "Mini corn dogs only need 6-7 minutes"
  },
  {
    id: "hashbrowns",
    name: "Hash Browns",
    category: "snack",
    cookTime: 12,
    temperature: 400,
    image: "🥔",
    actions: [
      {
        atMinute: 6,
        type: "flip",
        message: "Flip the hash browns"
      }
    ],
    instructions: [
      { step: 1, text: "Place frozen patties in single layer", timing: "before" },
      { step: 2, text: "Light spray of oil for extra crispiness", timing: "before" },
      { step: 3, text: "Flip carefully at halfway point", timing: "during" },
      { step: 4, text: "Season with salt and pepper", timing: "after" }
    ],
    tips: "Shredded hash browns may need a few extra minutes"
  },
  {
    id: "samosas",
    name: "Samosas",
    category: "snack",
    cookTime: 12,
    temperature: 375,
    image: "🥟",
    actions: [
      {
        atMinute: 6,
        type: "flip",
        message: "Flip the samosas"
      }
    ],
    instructions: [
      { step: 1, text: "Brush with oil or ghee", timing: "before" },
      { step: 2, text: "Place in single layer with space between", timing: "before" },
      { step: 3, text: "Flip at halfway point", timing: "during" },
      { step: 4, text: "Serve with chutney", timing: "after" }
    ],
    tips: "Frozen samosas may need 2-3 extra minutes"
  }
];

/**
 * Get all foods in a specific category
 * @param {string} category - Category key (protein, vegetable, frozen, snack)
 * @returns {Array} Array of food items in that category
 */
export function getFoodsByCategory(category) {
  if (!category || category === 'all') {
    return foods;
  }
  return foods.filter(food => food.category === category);
}

/**
 * Search foods by name
 * @param {string} query - Search query
 * @returns {Array} Array of matching food items
 */
export function searchFoods(query) {
  if (!query || query.trim() === '') {
    return foods;
  }
  const normalizedQuery = query.toLowerCase().trim();
  return foods.filter(food =>
    food.name.toLowerCase().includes(normalizedQuery) ||
    food.category.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get a single food item by ID
 * @param {string} id - Food ID
 * @returns {Object|undefined} Food item or undefined if not found
 */
export function getFoodById(id) {
  return foods.find(food => food.id === id);
}
