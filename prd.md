# NutriDense: Track Calories + Nutrients Better

## Product Requirements Document (PRD)

### 1. Product Overview

**Product Name:** NutriDense: Track Calories + Nutrients Better

**Platform:** iOS (iPhone only for MVP)

**Owner:** Mehmet Battal

**Version:** 1.0 (MVP)

### 2. Product Vision

NutriDense is a streamlined, user-friendly nutrition tracking application focused on providing comprehensive macro and micronutrient insights without overwhelming users. Unlike complex competitors, NutriDense emphasizes simplicity while delivering powerful nutrition tracking capabilities, deficiency detection, and personalized recommendations to optimize dietary habits.

### 3. Business Objectives

- Create an intuitive, clean alternative to complex nutrition tracking apps
- Deliver actionable insights on nutritional deficiencies
- Build a core user base of health-conscious individuals
- Establish foundation for future expansion to Android and web platforms
- Develop a differentiated value proposition in the crowded nutrition app market

### 4. Target Audience

- **Primary:** Health-conscious individuals aged 25-45 who want deeper nutrition insights
- **Secondary:** Fitness enthusiasts tracking specific nutrition goals
- **Tertiary:** Individuals with medical dietary needs requiring nutrient monitoring
- **User Personas:**
    - Alex (34): Fitness enthusiast who wants detailed nutrient tracking beyond just macros
    - Maya (28): Health-conscious professional who finds existing apps too complex
    - Sam (45): Managing medical condition requiring specific nutrient monitoring

### 5. User Pain Points Addressed

- Existing nutrition apps are overwhelming with too many features
- Difficulty understanding micronutrient intake and its importance
- Challenge identifying specific nutrient deficiencies over time
- Lack of actionable recommendations to improve nutrition
- Complex food logging processes discourage consistent use

### 6. Key Features (MVP)

### 🥗 Daily Food Logging

- **Food Database Search:**
    - Text-based search interface for foods
    - Nutritional data pulled from USDA FoodData Central API
    - Results ordered by relevance and frequency of use
- **Food Entry Categories:**
    - Breakfast, Lunch, Dinner, Snacks, Supplements
    - Default categorization based on time of entry with manual override
    - Visual indicators for each meal category
- **Food Entry Methods:**
    - Manual search and selection
    - Barcode scanning integration
    - Favorites selection
    - Custom recipe selection
- **Favorites System:**
    - One-tap addition to favorites
    - Favorites tab showing most used items
    - Ability to organize favorites by meal type
- **Custom Recipe Builder:**
    - Multi-ingredient combination tool
    - Ability to specify serving size
    - Automatic nutrient calculation
    - Save and edit functionality

### 📊 Nutrient Breakdown

- **Macronutrient Tracking:**
    - Protein, Carbohydrates (with fiber/sugar breakdown), Fats (with saturated/unsaturated breakdown)
    - Daily tracking against personalized goals
    - Visual representation via pie chart
- **Micronutrient Tracking:**
    - Essential vitamins: A, C, D, E, K, B-complex (B1, B2, B3, B5, B6, B9, B12)
    - Essential minerals: Calcium, Iron, Magnesium, Zinc, Potassium, Selenium, Sodium
    - Progress bars showing percentage of daily requirements
- **Visualization Tools:**
    - Macro distribution pie chart
    - Micronutrient bar charts showing percentage of daily needs
    - Color-coded indicators (red: <50%, yellow: 50-80%, green: >80% of daily value)

### ⚠️ Deficiency Detection

- **Trend Analysis:**
    - Rolling 7-day tracking of nutrient intake
    - Identification of consistent shortfalls (below 80% of RDA for 3+ days)
    - Severity classification (mild, moderate, significant deficiency)
- **Deficiency Alerts:**
    - In-app notification for emerging deficiencies
    - Weekly summary report highlighting areas of concern
    - Educational content explaining nutrient importance

### 💡 Smart Recommendations

- **Food Suggestions:**
    - Top 5 foods rich in deficient nutrients
    - Consideration of user's dietary preferences
    - Serving size recommendations to meet requirements
- **Supplement Information:**
    - Basic supplement information for severe deficiencies
    - Educational content about supplement types
    - Dosage guidance based on deficiency level

### 👤 Profile & Goal Setting

- **User Profile Data:**
    - Age, gender, weight, height
    - Activity level (sedentary, light, moderate, very active)
    - Dietary preferences/restrictions (omnivore, vegetarian, vegan, etc.)
- **Automated Calculations:**
    - BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
    - TDEE (Total Daily Energy Expenditure)
    - Personalized macro recommendations
    - Adjusted micronutrient targets based on profile
- **Goal Setting:**
    - Weight maintenance/loss/gain
    - Custom macro distribution goals
    - Micronutrient focus areas

### 7. User Interface & Experience

### Navigation Structure

- **Bottom Navigation Tabs:**
    - Track (primary food logging interface)
    - Summary (nutrient overview and insights)
    - Profile (user settings and information)

### Track Tab

- **Daily View:**
    - Date selector (swipe to change days)
    - Meal category sections (collapsible)
    - Running calorie and macronutrient totals
    - Clear visual hierarchy prioritizing food entries
- **Add Food Flow:**
    - Floating "+" button in bottom right
    - Modal sheet with options:
        - Search foods
        - Scan barcode
        - Select from favorites
        - Create/select custom recipe
- **Food Detail View:**
    - Serving size selection with common measurements
    - Complete nutritional breakdown
    - Option to add to favorites
    - Meal category assignment

### Summary Tab

- **Daily Summary:**
    - Total calories consumed vs. goal
    - Macronutrient distribution chart
    - Micronutrient progress bars
    - Calorie and nutrient breakdowns by meal
- **Deficiency Insights:**
    - Weekly nutrient trend charts
    - Highlighted deficiency alerts
    - Recommended foods to address deficiencies
    - Educational content on nutrient importance

### Profile Tab

- **User Information:**
    - Personal details (editable)
    - Dietary preferences
    - Activity level
- **Settings:**
    - Measurement units (metric/imperial)
    - Notification preferences
    - Privacy controls
    - App appearance settings

### 8. Technical Requirements

### Data Storage

- **Local Storage (Primary):**
    - User profile
    - Food logs
    - Favorites and custom recipes
    - Trending data
- **Cloud Sync (Optional for MVP):**
    - User account data
    - Historical logs and trends
    - User preferences

### Third-Party Integrations

- **Food Databases:**
    - USDA FoodData Central API (primary)
    - OpenFoodFacts API (supplementary, for barcode functionality)
- **Future Integrations:**
    - Apple Health (post-MVP)
    - Image recognition API for visual food logging (post-MVP)

### Performance Requirements

- App launch time under 2 seconds
- Food search results returned within 1 second
- Smooth animations (60fps) for all interactive elements
- Full functionality in offline mode with sync upon reconnection

### 9. Non-Functional Requirements

### Security & Privacy

- User data stored securely on device
- Optional account creation for data backup
- No sharing of personal data with third parties
- Compliance with applicable privacy regulations

### Accessibility

- Support for VoiceOver and dynamic type
- Minimum tap target size of 44×44 points
- Color palette considering color blindness
- High contrast mode support

### Localization

- English language for MVP
- Support for imperial and metric measurement systems
- Framework prepared for future language additions

###