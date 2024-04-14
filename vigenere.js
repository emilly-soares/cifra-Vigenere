const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function vigenereCipher(input, key, decrypt = false) {
  input = input.toUpperCase();
  key = key.toUpperCase();

  let output = '';
  let keyIndex = 0;

  for (let i = 0; i < input.length; i++) {
    const inputChar = input[i];

    if (/[A-Z]/.test(inputChar)) {
      //Convertendo o caractere da chave para um deslocamento numérico
      const keyChar = key[keyIndex % key.length];
      const keyOffset = keyChar.charCodeAt(0) - 65; // ASCII de 'A' é 65

      //Calculando o deslocamento
      const offset = decrypt ? (26 - keyOffset) % 26 : keyOffset;

      //Aplicando o deslocamento
      const charCode = ((inputChar.charCodeAt(0) - 65 + offset) % 26) + 65;

      //Convertendo o código ASCII de volta
      const encryptedChar = String.fromCharCode(charCode);

      output += encryptedChar;

      //Incrementando o índice da chave
      keyIndex++;
    } else {
      output += inputChar;
    }
  }

  return output;
}

rl.question('Digite o texto: ', (input) => {
  rl.question('Digite a chave: ', (key) => {
    const ciphertext = vigenereCipher(input, key);
    console.log('Texto criptografado:', ciphertext);

    const decryptedText = vigenereCipher(ciphertext, key, true);
    console.log('Texto descriptografado:', decryptedText);

    rl.close();
  });
});
