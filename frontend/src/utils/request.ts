// ?? = operador de coalescência nula
// com esse operador a constante BASE_URL irá ter o valor da variável de ambiente VITE_BACKEND_URL, caso essa variável exista
// caso ela não exista, a constante terá um valor padrão, que nesse caso é "http://localhost:8080"
export const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";