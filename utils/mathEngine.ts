import { OperationType } from "@/types";

export interface GeneratedExpression {
  expressionString: string;
  displayString: string;
  result: number;
}

/**
 * 🪼 Safely evaluates a mathematical expression string with +, -, ×, ÷ respecting precedence.
 */
export function evaluateExpression(exprStr: string): number {
  const cleanExpr = exprStr.replace(/×/g, "*").replace(/÷/g, "/");

  const tokens = tokenize(cleanExpr);
  if (tokens.length === 0) return 0;

  // 🪼 1st pass: multiplication & division
  const intermediate: (number | string)[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "*" || token === "/") {
      const prev = intermediate.pop() as number;
      const next = tokens[++i] as number;
      if (token === "*") {
        intermediate.push(prev * next);
      } else {
        if (next === 0) throw new Error("Division by zero");
        intermediate.push(prev / next);
      }
    } else {
      intermediate.push(token);
    }
  }

  // 🪼 2nd pass: addition & subtraction
  let result = intermediate[0] as number;
  for (let i = 1; i < intermediate.length; i += 2) {
    const op = intermediate[i] as string;
    const next = intermediate[i + 1] as number;
    if (op === "+") {
      result += next;
    } else if (op === "-") {
      result -= next;
    }
  }

  return Math.round(result * 100) / 100;
}

function tokenize(expr: string): (number | string)[] {
  const regex = /(\d+|\+|\-|\*|\/)/g;
  const matches = expr.match(regex);
  if (!matches) return [];

  const tokens: (number | string)[] = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    if (m === "+" || m === "-" || m === "*" || m === "/") {
      if (
        m === "-" &&
        (i === 0 || ["+", "-", "*", "/"].includes(matches[i - 1]))
      ) {
        const nextNum = parseFloat(matches[i + 1] || "0");
        tokens.push(-nextNum);
        i++;
      } else {
        tokens.push(m);
      }
    } else {
      tokens.push(parseFloat(m));
    }
  }
  return tokens;
}

/**
 * 🪼 Generates a random arithmetic expression based on configuration.
 */
export function generateExpression(
  maxNumber: number,
  operatorCount: number,
  selectedOperations: OperationType[],
): GeneratedExpression {
  if (selectedOperations.length === 0) {
    selectedOperations = ["+"];
  }

  const opSymbols: OperationType[] = selectedOperations;
  let attempts = 0;

  while (attempts < 100) {
    attempts++;
    const operands: number[] = [];
    const operators: OperationType[] = [];

    // On later attempts (e.g. many × operators with large maxNumber), keep operands smaller to avoid exceeding 100000
    const effectiveMax = attempts > 50 ? Math.min(maxNumber, 9) : maxNumber;

    for (let i = 0; i < operatorCount + 1; i++) {
      const op = Math.floor(Math.random() * effectiveMax) + 1;
      operands.push(op);
    }

    for (let i = 0; i < operatorCount; i++) {
      const randomOp = opSymbols[Math.floor(Math.random() * opSymbols.length)];
      operators.push(randomOp);
    }

    // 🪼 Advanced division rule: ensure clean integer division with diverse numbers (e.g. 48 ÷ 12, 100 ÷ 25, 36 ÷ 6)
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "÷") {
        if (i > 0 && operators[i - 1] === "÷") {
          const current = operands[i];
          const divisors: number[] = [];
          for (let d = 2; d <= Math.min(current, 25); d++) {
            if (current % d === 0) divisors.push(d);
          }
          operands[i + 1] =
            divisors.length > 0
              ? divisors[Math.floor(Math.random() * divisors.length)]
              : 1;
        } else {
          const maxDivisor = Math.min(effectiveMax, 25);
          let divisor =
            Math.floor(Math.random() * Math.max(1, maxDivisor - 1)) + 2;
          if (divisor < 2) divisor = 2;

          const maxMultiplier = Math.max(2, Math.floor(effectiveMax / divisor));
          let multiplier = Math.floor(Math.random() * (maxMultiplier - 1)) + 2;
          if (multiplier <= 1) multiplier = 2;

          operands[i + 1] = divisor;
          operands[i] = divisor * multiplier; // e.g. 48 / 12, 100 / 25
        }
      }
    }

    const exprParts: string[] = [];
    for (let i = 0; i < operatorCount; i++) {
      exprParts.push(operands[i].toString());
      exprParts.push(operators[i]);
    }
    exprParts.push(operands[operatorCount].toString());

    const expressionString = exprParts.join(" ");
    const displayString = expressionString
      .replace(/\*/g, "×")
      .replace(/\//g, "÷");

    try {
      const result = evaluateExpression(expressionString);
      if (Number.isFinite(result) && Math.abs(result) <= 100000) {
        return {
          expressionString,
          displayString,
          result,
        };
      }
    } catch {
      continue;
    }
  }

  // 🪼 Deterministic valid fallback built using operatorCount and selectedOperations
  const fallbackParts: string[] = [];
  for (let i = 0; i < operatorCount; i++) {
    const op = opSymbols[i % opSymbols.length];
    const val = Math.min(maxNumber, i === 0 ? Math.min(maxNumber, 2) : 1);
    fallbackParts.push(val.toString());
    fallbackParts.push(op);
  }
  fallbackParts.push("1");

  const fallbackExpr = fallbackParts.join(" ");
  const fallbackDisplay = fallbackExpr.replace(/\*/g, "×").replace(/\//g, "÷");

  return {
    expressionString: fallbackExpr,
    displayString: fallbackDisplay,
    result: evaluateExpression(fallbackExpr),
  };
}
