interface Values {
    periodLength: number;
    trainingDays: number;
    target: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    average: number;
}



const exerciseCalculator = (hours: number[], target: number): Values => {
    const periodLength = hours.length
    const trainingDays = hours.filter(n => n > 0).length
    const totalHours = hours.reduce((sum, h) => sum + h, 0)
    const average = totalHours / periodLength;
    const success = average >= target

    let rating: number;
    let ratingDescription: string;

    if ( average >= target ) {
        rating = 3;
        ratingDescription = "Exccllent"
    } else if (average < target *0.75) {
        rating = 2;
        ratingDescription= "Not good, not terrible"
    } else {
        rating = 1;
        ratingDescription = "practise makes perfect, try again"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};


const dailyHours = [3, 4, 2, 4.5, 2, 3, 1];
const targetHours = 2;
const result = exerciseCalculator(dailyHours, targetHours)
console.log(result);

export default exerciseCalculator