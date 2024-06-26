

const bmiCalculate = (mass: number, height: number): string => {
    const bmi = mass / (height * height);  
    
    if (bmi < 16.0) return 'Underweight (Severe thinness)';
    if (bmi >= 16.0 && bmi <= 16.9) return 'Underweight (Moderate thinness)';
    if (bmi >= 17.0 && bmi <= 18.4) return 'Underweight (Mild thinness)';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal range';
    if (bmi >= 25.0 && bmi <= 29.9) return 'Overweight (Pre-obese)';
    if (bmi >= 30.0 && bmi <= 34.9) return 'Obese (Class I)';
    if (bmi >= 35.0 && bmi <= 39.9) return 'Obese (Class II)';
    return 'Obese (Class III)';  
}

const mass = 100;  
const height = 1.86;  
console.log(bmiCalculate(mass, height));