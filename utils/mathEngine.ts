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
      intermediate.push(token)
    }
  }

  // 🪼 2nd pass: addition & subtraction
  let result = intermediate[0] as number;
  for (let i =1; i < intermediate.length; i += 2) {
    const op = intermediate[i] as string;
    const next = intermediate[i+1] as number;
    if (op === '+') {
      result += next;
    } else if (op === '-') {
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
