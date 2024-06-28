interface MultiplyValues {
    value1: number;
    value2: number;
}


const parseArguments = (args: string[]): MultiplyValues => {
    console.log('Value 1:', args[2]);
    console.log('Value 2:', args[3]);
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          value1: Number(args[2]),
          value2: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }

}


const bmiCalculate = (mass: number, height: number): string => {
    const heightInMeters = height / 100; 
    const bmi = mass / (heightInMeters * heightInMeters)  
    
    if (bmi < 16.0) return 'Underweight (Severe thinness)';
    if (bmi >= 16.0 && bmi <= 16.9) return 'Underweight (Moderate thinness)';
    if (bmi >= 17.0 && bmi <= 18.4) return 'Underweight (Mild thinness)';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal range';
    if (bmi >= 25.0 && bmi <= 29.9) return 'Overweight (Pre-obese)';
    if (bmi >= 30.0 && bmi <= 34.9) return 'Obese (Class I)';
    if (bmi >= 35.0 && bmi <= 39.9) return 'Obese (Class II)';
    return 'Obese (Class III)';  
}

try {
    const  {value1, value2} = parseArguments(process.argv);
    const result = bmiCalculate(value1, value2);
    console.log('BMI Category:', result);

} catch (error: unknown) {
    let errorMessage = "soemthing bad happaned."
    if (error instanceof Error ) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default bmiCalculate