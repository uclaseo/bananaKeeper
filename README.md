# bananaKeeper
keeps track of banana sales


server - exports.buy in bananas.js
moment(buyDate).isValid() doesn't really work

some of logic implemented in Sell.js could be a lot easier if api controllers are modified such that get request to api/bananas has params/query to modify returned result.  Since all bananas are returned, calculating data in the front end could result in lower performance.


input form in buy and sell are somewhat redundant.  The form could be extracted as a component and used in both places.
however, this coding challenge only requires two of them, and making it a common component would add complexity that is out of scope.

For the sake of this challenge, only banana is used.  However, prices and expiring times are stored in /config.js to easily adjust prices for futureproof.

