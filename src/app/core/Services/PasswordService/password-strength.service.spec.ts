import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  calculateStrength(password: string): { score: number; feedback: string } {
    let score = 0;
    let feedback = '';

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (hasLower && hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Common patterns to avoid
    const commonPatterns = ['password', '123', 'qwerty', 'steg'];
    if (!commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      score++;
    }

    // Generate feedback
    if (score < 3) {
      feedback = 'Weak - Try adding more characters or variety';
    } else if (score < 5) {
      feedback = 'Medium - Could be stronger with special characters';
    } else {
      feedback = 'Strong - Good job!';
    }

    return { score, feedback };
  }
}