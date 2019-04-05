# bananaKeeper
keeps track of banana sales


server - exports.buy in bananas.js
moment(buyDate).isValid() doesn't really work

some of logic implemented in Sell.js could be a lot easier if api controllers are modified such that get request to api/bananas has params/query to modify returned result.  Since all bananas are returned, calculating data in the front end could result in lower performance.


input form in buy and sell are somewhat redundant.  The form could be extracted as a component and used in both places.
however, this coding challenge only requires two of them, and making it a common component would add complexity that is out of scope.

For the sake of this challenge, only banana is used.  However, prices and expiring times are stored in /config.js to easily adjust prices for futureproof for price/expireDay changes.
To improve it, codes could be refactored so that any chosen item in /config.js could be reflected across all application with just one line of code change, i.e. all 'banana' codes could be substitued with a config variable.


passing props is unnecessary.  they are all having their own states, and it is completely fine in this challenge because none of them rely on each other's state.  