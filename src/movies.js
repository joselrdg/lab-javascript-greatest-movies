// Iteration 1: All directors? - Get the array of all directors.

function getAllDirectors(arr) {
    return arr.map(element => element.director)
}
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

function cleanDirectors(arr) {
    const directors = getAllDirectors(arr);
    return directors.filter(function (n, i) {
        if (directors.indexOf(n) < i) {
            return false
        } else {
            return true
        }
    })
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(arr) {
    let esta = 0;
    const drama = arr.filter(function (n, i) {
        if (n.director === "Steven Spielberg" && n.genre.indexOf("Drama") > -1) {
            return true
        }
    }
    )
    esta = drama.length;
    return esta
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(arr) {
    if (arr.length === 0) {
        return 0
    }
    let rateAverage = (arr.reduce(function (acc, value) {
        if (value.rate <= 10 || value.rate >= 0) {
            return acc + value.rate
        } else {
            return acc;
        }
    }, 0
    ) / arr.length);
    if (ratesAverage <= 0) {
        return 0
    } else {
        return Math.round(rateAverage * 100) / 100;
    }
}

//console.log(ratesAverage(movies))

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(arr) {
    let esta = 0;
    let rateAverage = arr.reduce(function (acc, value) {
        if (value.genre.indexOf("Drama") > -1) {
            esta++;
            return acc + value.rate
        } else {
            return acc;
        }
    }, 0
    );
    if (rateAverage <= 0) {
        return 0
    } else {
        return Math.round((rateAverage / esta) * 100) / 100;
    }
}
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(arr) {
    return arr.sort(function (a, b) {
        if (a.year > b.year) {
            return 1;
        }
        else if (a.year < b.year) {
            return -1;
        } else {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        }
    }
    ).slice();
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(arr) {
    let newArr = arr.slice();
    newArr = newArr.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        return 0
    }).slice(0, 20);
    return newArr.map(element => element.title);
}
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(arr) {  
    let newArr = [...arr];  
    for (let key in newArr) {      
      newArr[key] = JSON.parse( JSON.stringify( arr[key] ) );
      let h, is, m = 0;
      let min = newArr[key].duration.split(" ")
      if (min[0].includes('h'))
      { h = parseFloat(min[0].split("h").join(""))*60;}
      if (min[0].includes('min')){
      m = parseFloat(min[0].split("min").join(""));
        h = 0
      } else if (min[1] !== undefined ){    
      m = parseFloat(min[1].split("min").join(""));}
        newArr[key].duration = h + m;
}return newArr
}


// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg(arr) {
    let result = {};
    let acc = 0;
    if (arr[0] === undefined) {
      return null
    }
    let arr2 = orderByYear(arr);
    let year1 = arr2[0].year;
    let totalYears = arr2[arr2.length - 1].year - year1;
    for (let i = 0; i <= totalYears; i++) {
      const filteredYear = arr2.filter(function (n, i) {
        if (n.year === year1) {
          return true
        }
      });
      let rateAv = ratesAverage(filteredYear)
      if (rateAv > acc) {
        result.year = year1;
        result.rateAverage = rateAv;
        console.log(result)
        acc = rateAv;
      }
      year1++;
    } return `The best year was ${result.year} with an average rate of ${result.rateAverage}`
  }

console.log(bestYearAvg(movies));