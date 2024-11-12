// Query DOM elements
const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');

// Fetch dictionary data based on input word
async function dictionaryApp(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const result = await response.json();
  return result; // Return the result to use in fetchdata
}

// Function to fetch data on button click
async function fetchdata() {
  const word = input.value; // Get the word from the input field
  if (word) {
    const data = await dictionaryApp(word); // Use the dictionaryApp function to get data
    console.log(data);

    // Handle Part of Speech Array
    let partofspeechArray = [];
    for (let i = 0; i < data[0]?.meanings.length; i++) {
      partofspeechArray.push(data[0]?.meanings[i].partOfSpeech);
    }

    // Dynamically update the HTML content using template literals for multi-line HTML
    dictionary.innerHTML = `
      <div class="card">
        <div class="properties">
          <span>Word:</span>
          <span>${data[0]?.word || 'The name of the word will go here'}</span>
        </div>
        <div class="properties">
          <span>Phonetics:</span>
          <span>${data[0]?.phonetics[0]?.text || 'Phonetics will go here'}</span>
        </div>
        <div class="properties">
          <span>Audio:</span>
          <audio controls>
            <source src="${data[0]?.phonetics[0]?.audio || ''}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="properties">
          <span>Definition:</span>
          <span>${data[0]?.meanings[0]?.definitions[0]?.definition || 'Definition will go here'}</span>
        </div>
        <div class="properties">
          <span>Example:</span>
          <span>${data[0]?.meanings[0]?.definitions[0]?.example || 'Example will go here'}</span>
        </div>
        <div class="properties">
          <span>Part of Speech:</span>
          <span>${partofspeechArray.join(', ') || 'Part of speech will go here'}</span>
        </div>
      </div>
    `;
  }
}

// Add event listener to the button
btn.addEventListener('click', fetchdata);
