interface Values {
    periodLength: number;
    trainingDays: number;
    target: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    average: number;
}

interface parseValues {
    hours: number[];
    target: number;
}

const parseArguments = (args: string[]): parseValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    console.log('input result',args[2]);
    const target = Number(args[2]);
    const hours = args.slice(3).map(hour => {
        const parsedHour = Number(hour)
        if (isNaN(parsedHour)) {
            throw new Error('Provided values were not numbers')
        }

        return parsedHour;
    });
    console.log('a bunch of numbers here',args[3]);
    if (isNaN(target)) {
        throw new Error ('Provided target hour in a number please!')
    }

    return {
        target,
        hours
    }
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

try {
    const {target, hours} = parseArguments(process.argv)
    const result = exerciseCalculator(hours, target)
    console.log(result);
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
}
export default exerciseCalculator