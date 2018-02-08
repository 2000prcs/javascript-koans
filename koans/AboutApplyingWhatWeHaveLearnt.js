var _; // globals

describe("About Applying What We Have Learnt", function () {
  var products;

  beforeEach(function () {
    products = [
      { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
      { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
      { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
      { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
      { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i, j, hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i += 1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j += 1) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = [];
    /* solve using filter() & all() / any() */
    function noNutsNoMushrooms(input) {
      var nutsFree = input.filter(function (pizza) {
        return pizza.containsNuts === false;
      });
      nutsFree.forEach(function (pizza) {
        if (!_(pizza.ingredients).any(hasMushrooms)) { productsICanEat.push(pizza); }
      })
    }

    function hasMushrooms(array) {
      return array.includes('mushrooms') ? true : false;
    }

    noNutsNoMushrooms(products);

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for (var i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */

    sum = _(_.range(1, 1000)).reduce(function (total, number) {
      if (number % 3 === 0 || number % 5 === 0) {
        total += number;
      }
      return total;
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i += 1) {
      for (j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    function countIngredients(array) {
      ingredientCount = _(array).chain()
        .map(function (pizza) { return pizza.ingredients })
        .flatten()
        .reduce(function (obj, ingredient) {
          obj[ingredient] = (obj[ingredient] || 0) + 1;
          return obj;
        }, { "{ingredient name}": 0 })
        .value()
    }

    countIngredients(products);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    function findLargestPrime(composite) {
      return _(_.range(1, composite)).chain()
        .filter(function (number) { return composite % number === 0 && isPrime(number) })
        .max()
        .value()
    }

    function isPrime(num) {
      if (num < 2) { return false; }
      for (var i = 2; i < num; i++) {
        if (num % i === 0) { return false; }
      }
      return true;
    }

    expect(findLargestPrime(956)).toBe(239);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function findLargestPalindrome(numbers) {
      var product = numbers[0] * numbers[1];
      return _(_.range(1, product)).chain()
        .filter(function (number) {
          return isPalindrome(number.toString());
        })
        .max()
        .value()
    }

    function isPalindrome(string) {
      if (string.split('').reverse().join('') === string.split('').join('')) { return true; }
      return false;
    }

    expect(findLargestPalindrome([356, 444])).toBe(157751);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function findSmallestLcm(array) {
      return array.reduce(function (a, b) {
        return lcm(a, b);
      });
    }

    function lcm(a, b) {
      //least common multiple between two numbers
      return (a * b / gcd(a, b));
    }


    function gcd(a, b) {
      //gcd: greatest common divisor
      //use euclidean algorithm
      var temp = 0;
      while (a !== 0) {
        temp = a;
        a = b % a;
        b = temp;
      }
      return b;
    }

    expect(findSmallestLcm(_.range(1, 21))).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function findDifference(array) {
      var sumOfSquares = array.reduce(function (sum, number) {
        return sum + Math.pow(number, 2);
      }, 0);

      var squareOfSums = array.reduce(function (sum, number) {
        sum += number;
        return Math.pow(sum, 2);
      }, 0);

      return sumOfSquares - squareOfSums;
    }

    expect(findDifference([1, 2, 3])).toBe(-130);

  });

  it("should find the 10001st prime", function () {
    function find10001stPrime() {
      var primes = [];
      var i = 1;
      while (primes.length <= 10001) {
        if (isPrime(i)) {
          primes.push(i);
        }
        i++;
      }
      return primes[10000];
    }

    function isPrime(num) {
      if (num < 2) { return false; }
      for (var i = 2; i < num; i++) {
        if (num % i === 0) { return false; }
      }
      return true;
    }

    expect(find10001stPrime()).toBe(104743);
  });

});
