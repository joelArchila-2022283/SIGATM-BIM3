import readline from 'readline';

export const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

/**
 * @param question Pregunta que se mostrara al usuario
 * @returns Promesa que resuelve con la respuesta 
 */
export const askQuestion = (question: string): Promise<string> => {
  const rl = createReadlineInterface();

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

export const clearTerminal = () => {
  console.clear(); 
};
