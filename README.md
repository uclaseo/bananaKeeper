# bananaKeeper
keeps track of banana sales

# Initialization
```
npm install
npm start
```

## Architecture
 - Views are categorized into two parts: components(stateless) and containers(stateful)
 - Components are re-usable and could be plugged into many places to avoid redundancy of code
   - Forms used in Buy.js and Sell.js could be refactored into a component, and could be re-used in both views.  However, this application has only two containers that utilize such form, so refactoring it into re-usable component could be over-engineering.
   - NavigationBar
 - Containers have states and datas
   - Home should be a component since it only has a text now.  However, it could be further developed to present something dynamic such as dashboard showing status of banana inventories, etc. So it is categorized as container for future.
   - Buy
   - Sell
   - Analytics

## Concerns
 - All calculations are done on front-end
   - This will cause a severe performance degradation as the app grows.
   - API calls to server are very limited
   - Creating more API routes for more specific data in the server side, instead of fetching all bananas and calculate everything on front-end, will improve performance
 - Only banana
   - Created /config.js so that just by changing one line of code, a different item could be applied across the application.  However, many functions are already only specific to banana.  This could be refactored for more compatibility with other items
 - No Props
   - Buy, Sell, and Analytics are all independent of each other.  There are no communication or data flow among them, so passing props from parents to children are not necessary.  For that reason, obvioulsy adding a Redux would be over-engineering.

## Server Bug
  - exports.buy and exports.sell in bananas.js
  ```
  moment(buyDate).isValid() // line 36 and 73
  ```
  - It does not always return false for wrong date format.  Instead, it should be
  ```
  moment(buyDate, 'YYYY-MM-DD', true).isValid()
  ```
