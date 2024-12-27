const container = document.getElementById('container');

document.getElementById('meaningButton').addEventListener('click', async () => {
  const wordInput = document.querySelector('input[type="text"]');
  const word = wordInput.value.trim();
  const meaningBlock = document.getElementById('meaning-block');
  const container = document.getElementById('container');
  meaningBlock.innerHTML = '';

  if (!word) {
    alert('Please enter a word to search.');
    return;
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      alert('No meanings found. Please try a different word.');
      return;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      container.classList.add('active-container');
      meaningBlock.classList.add('active-meaning-block');
      meaningBlock.style.display = 'block';
      data.forEach((entry) => {
        const wordElement = document.createElement('h2');
        wordElement.innerText = `Word: ${entry.word}`;
        meaningBlock.appendChild(wordElement);

        entry.meanings.forEach((meaning) => {
          const partOfSpeech = document.createElement('h3');
          partOfSpeech.innerText = `Part of Speech: ${meaning.partOfSpeech}`;
          const lineBreak = document.createElement('br');
          meaningBlock.appendChild(lineBreak);
          meaningBlock.appendChild(partOfSpeech);

          meaning.definitions.forEach((definitionObj, index) => {
            const definition = document.createElement('p');
            definition.innerText = `${index + 1}. Definition: ${
              definitionObj.definition
            }`;
            meaningBlock.appendChild(definition);

            if (definitionObj.example) {
              const example = document.createElement('p');
              example.innerText = `Example: ${definitionObj.example}`;
              meaningBlock.appendChild(example);
              const lineBreak = document.createElement('br');
              meaningBlock.appendChild(lineBreak);
            }

            if (definitionObj.synonyms && definitionObj.synonyms.length > 0) {
              const synonyms = document.createElement('p');
              synonyms.innerText = `Synonyms: ${definitionObj.synonyms.join(
                ', '
              )}`;
              const lineBreak = document.createElement('br');
              meaningBlock.appendChild(lineBreak);
              meaningBlock.appendChild(synonyms);
            }

            if (definitionObj.antonyms && definitionObj.antonyms.length > 0) {
              const antonyms = document.createElement('p');
              antonyms.innerText = `Antonyms: ${definitionObj.antonyms.join(
                ', '
              )}`;
              const lineBreak = document.createElement('br');
              meaningBlock.appendChild(lineBreak);
              meaningBlock.appendChild(antonyms);
            }
          });
        });
      });
    } else {
      alert('No meanings found. Please try a different word.');
    }
  } catch (error) {
    console.error('Failed to load meaning', error);
    alert('Error: fetching meanings. Please try again later.');
  }
});
