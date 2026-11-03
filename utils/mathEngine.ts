import { OperationType } from "@/types";

export interface GeneratedExpression {
  expressionString: string;
  displayString: string;
  result: number;
}

// 🪼 Evaluate
export function evaluateExpression(exprStr: string): number {
  const cleanExpr = exprStr.replace(/x/g, "*").replace(/÷/g, "/");

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

// 🪼 Generate a random arrithmetic expression based on configuration
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

  while (attempts < 10) {
    attempts++;
    const operands: number[] = [];
    const operators: OperationType[] = [];

    for (let i = 0; i < operatorCount + 1; i++) {
      const op = Math.floor(Math.random() * maxNumber) + 1;
      operands.push(op);
    }

    for (let i = 0; i < operatorCount; i++) {
      const randomOp = opSymbols[Math.floor(Math.random() * opSymbols.length)];
      operators.push(randomOp);
    }

    // 🪼 Advanced division rule: ensure clean integer division with  diverse numbers (e.g. 48 ÷ 12, 100 ÷ 25, 36 ÷ 6)
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "÷") {
        const maxDivisor = Math.min(maxNumber, 25);
        let divisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2;
        if (divisor < 2) divisor = 2;

        const maxMultipler = Math.max(2, Math.floor(maxNumber / divisor));
        let multiplier = Math.floor(Math.random() * (maxMultipler - 1)) + 2;
        if (multiplier <= 1) multiplier = 2;

        operands[i + 1] = divisor;
        operands[i] = divisor * multiplier;
      }
    }
  }

  return {
    expressionString: "48 / 12",
    displayString: "48 ÷ 12",
    result: 4,
  };
}
