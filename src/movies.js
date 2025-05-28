//import movies from './data.js';


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let cleanedArr = []
  //Review for duplicates
  for(const movie of moviesArray){
    if (!(cleanedArr.includes(movie.director))){
      cleanedArr.push(movie.director)
    }
  }
  return cleanedArr
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  let filteredArr = moviesArray.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  );
  if(filteredArr.length==0){
    return 0
  }
  else{
    return filteredArr.length
  }
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if(moviesArray.length==0){
    return 0
  }
  else{
    let totalScore = moviesArray.reduce((acc, movie) => acc + Number(movie.score), 0);
    let average = totalScore / moviesArray.length;

    return average.toFixed(2);
  }
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let filteredArr = moviesArray.filter((movie)=>movie.genre.includes('Drama'))
  if(filteredArr.length==0){
    return 0
  }
  else{
    let average = scoresAverage(filteredArr);
    return average;
  }
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesCopy = JSON.parse(JSON.stringify(moviesArray));
  return moviesCopy.sort((a, b) => a.year - b.year);
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map((movie) => movie.title) //extract titles in an array
    .sort((a, b) => a.localeCompare(b)) // sort that array alphabetically, using a new method i discovered
    .slice(0, 20); // slice it to get just the 20 titles
}



// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {
    let duration = movie.duration.replace(/[a-zA-Z]/g, '');
    let durationArr = duration.split(' ');
    let hourInMinutes = durationArr[0] * 60;
    let totalMinutes = hourInMinutes + Number(durationArr[1]);
    return {
      ...movie,
      duration: totalMinutes
    };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }
  const grouped = {};
  for (const movie of moviesArray) {
    const { year, score } = movie;
    if (typeof score !== 'number') continue;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(score);
  }
  let bestYear = null;
  let highestAvg = 0;
  for (const year in grouped) {
    const avg = grouped[year].reduce((acc, val) => acc + val, 0) / grouped[year].length;
    if (
      avg > highestAvg ||
      (avg === highestAvg && (bestYear === null || Number(year) < Number(bestYear)))
    ) {
      highestAvg = avg;
      bestYear = year;
    }
  }
  return `The best year was ${bestYear} with an average score of ${highestAvg.toFixed(1)}`;
}




// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
