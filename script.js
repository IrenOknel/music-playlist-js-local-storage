//  Step 1: Create an empty array to store songs.
// Each song will be an object with { title, artist, mood, link }
//  Declare a variable named "playlist" and set it to an empty array
// 🧪 Console log to confirm the playlist is initialized as an empty array

let playlist = []; // empty array and I reassign the whole array, not just modify it so const would throw an error
console.log("Initialized playlist:", playlist); // Debug, print playlist contents

//  Step 2: Get references to all the DOM elements (HTML elements we interact with)
//  Use document.getElementById() to store references to:
// - title input        → id="title"
// - artist input       → id="artist"
// - link input         → id="link"
// - mood dropdown      → id="mood"
// - form               → id="songForm"
// - playlist container → id="playlist"
// - filter dropdown    → id="filterMood"
// - shuffle button     → id="shuffleBtn"
// - dark mode button   → id="toggleModeBtn"
//  Console log to confirm all DOM elements were successfully selected

const titleInput = document.getElementById("title"); // - title input → id="title"
const artistInput = document.getElementById("artist"); // - artist input → id="artist"
const linkInput = document.getElementById("link"); // - link input → id="link"
const moodSelect = document.getElementById("mood"); // - mood dropdown → id="mood"
const songForm = document.getElementById("songForm"); // - form → id="songForm"
const playlistContainer = document.getElementById("playlist"); // - playlist container → id="playlist"
const filterMoodSelect = document.getElementById("filterMood"); // - filter dropdown → id="filterMood"
const shuffleBtn = document.getElementById("shuffleBtn"); // - shuffle button → id="shuffleBtn"
const toggleModeBtn = document.getElementById("toggleModeBtn"); // - dark mode button → id="toggleModeBtn"
console.log("DOM elements selected"); // Debug

// Step 3: Function to load the playlist from localStorage
//  Define a function called loadPlaylist()
// Inside the function:
// - Use localStorage.getItem("customPlaylist") to get the saved data
// - If there is data, parse it using JSON.parse()
// - Then update the playlist array with the parsed data
//  Console log to show the playlist loaded from localStorage
//  Console log to show that no playlist data was found (if none exists)

function loadPlaylist() {
  // Getting saved playlist (JSON string) from localStorage
  const data = localStorage.getItem("customPlaylist");
  if (data) {
    // Parsing and assigning to global playlist variable
    playlist = JSON.parse(data);
    console.log("Loaded playlist from localStorage:", playlist);
  } else {
    console.log("No playlist found in localStorage");
  }
}

//  Step 4: Function to save the playlist into localStorage
//  Define a function called savePlaylist()
// Inside the function:
// - Use JSON.stringify() to convert the playlist array to a string
// - Use localStorage.setItem() to save it with the key "customPlaylist"
//  Console log to confirm playlist was saved to localStorage

function savePlaylist() {
  // Converting playlist array to JSON and saving to localStorage
  localStorage.setItem("customPlaylist", JSON.stringify(playlist));
  console.log("Saved playlist to localStorage"); //debug for better life
}

//  Step 5: Function to render the songs onto the screen
//  Define a function called renderPlaylist(songsToRender)
// Inside the function:
// - First, clear the playlist container using innerHTML = ""
// - Use forEach to loop through each song and do the following:

function renderPlaylist(songsToRender) {
  // Clearing current playlist
  playlistContainer.innerHTML = ""; // Looping through songs and render each as a card
  songsToRender.forEach((song, index) => {
    //  1. Create a new div using document.createElement("div")
    const songCard = document.createElement("div");
    //  2. Give it a class of "song-card" using classList.add()
    songCard.classList.add("song-card");
    //  3. Set its innerHTML using a template literal:
    songCard.innerHTML = `
  <strong>${song.title}</strong><br>
  <em>Artist:</em> ${song.artist}<br>
  <em>Mood:</em> ${song.mood}<br>
  <a href="${song.link}" target="_blank"> Listen 🎧 </a><br>
  <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
`;

    // 🔹 4. Append the new div to the playlist container
    playlistContainer.appendChild(songCard);
  });
  // 🧪 Console log to show which songs are being rendered
  console.log("Rendered songs:", songsToRender);

  // 🧹 Then, after the forEach loop:
  // - Use document.querySelectorAll(".delete-btn") to get all delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  // - Loop through them and add a click event listener to each:
  deleteButtons.forEach((btn) => {
    // Attaching delete event to each delete button
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index")); // → Get the song index from data-index
      playlist.splice(index, 1); // → Remove the song from the playlist array using splice()
      savePlaylist(); // → Save and re-render the playlist again
      renderPlaylist(playlist);
      // 🧪 Console log to confirm a song was deleted and show its index
      console.log(`Deleted song at index ${index}`); // debug
    });
  });
}
// ➕ Step 6: Function to handle adding a new song
// 👉 Define a function called addSong(e)
// Inside the function:
// - Use e.preventDefault() to stop the form from refreshing
// - Create a new object with title, artist, mood, and link
// - Push it into the playlist array
// - Save the playlist
// - Call renderPlaylist(playlist)
// - Use songForm.reset() to clear the form
// 🧪 Console log to confirm a new song was added

function addSong(e) {
  e.preventDefault(); // stopped reloading page
  const newSong = {
    title: titleInput.value,
    artist: artistInput.value,
    mood: moodSelect.value,
    link: linkInput.value,
  };
  playlist.push(newSong); //added song to playlist aray 
  savePlaylist();
  renderPlaylist(playlist);
  songForm.reset(); //cleared form input
  console.log("Added new song:", newSong); //debugging 
}

// 🎯 Step 7: Filter playlist by mood
// 👉 Define a function called filterPlaylist()
// Inside the function:
// - Get the selected value from filterMoodSelect
// - If it’s "all", call renderPlaylist(playlist)
// - Otherwise, use .filter() to get only songs that match the mood
// - Then call renderPlaylist(filtered)
// 🧪 Console log to show which mood was selected for filtering
// 🧪 Console log to show filtered results

function filterPlaylist() {
  const selectedMood = filterMoodSelect.value;
  console.log("Filter selected mood:", selectedMood);
  if (selectedMood === "All") {
    renderPlaylist(playlist);
  } else {
    const filtered = playlist.filter((song) => song.mood === selectedMood);
    renderPlaylist(filtered);
    console.log("Filtered songs:", filtered); //debug
  }
}

// 🔀 Step 8: Shuffle the playlist using Fisher-Yates algorithm
// 👉 Define a function called shufflePlaylist()
// Inside the function:
// - Loop from the end of the array to the beginning (i = length - 1; i > 0; i--)
// - Create a random index j: Math.floor(Math.random() * (i + 1))
// - Swap playlist[i] and playlist[j] using destructuring
// - After the loop, save and render the playlist again
// 🧪 Console log to confirm the playlist was shuffled

function shufflePlaylist() {
  playlist.sort(() => Math.random() - 0.5); // Randomly reorder array with arrow function
  savePlaylist(); // Save to localStorage
  renderPlaylist(playlist); // Re-render the shuffled list
  console.log("Shuffled playlist"); //debug
}

//Fisher-Yates algorithm with array destructuring as intermidiate solution
// function shufflePlaylist() {
//   for (let i = playlist.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
//   }
//   savePlaylist();
//   renderPlaylist(playlist);
//   console.log("Shuffled playlist");
// }

// 🌙 Step 9: Toggle between Dark Mode and Light Mode
// 👉 Define a function called toggleDarkMode()
// Inside the function:
// - Use classList.toggle("dark") on the body
// - Use contains("dark") to check if dark mode is active
// - Update toggle button text accordingly ("Light Mode" or "Dark Mode")
// - Save the theme preference in localStorage (key = "theme")
// 🧪 Console log to confirm dark mode toggle state

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleModeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
  console.log("Dark mode:", isDark); //debug
}

// 💡 Step 10: Load the saved theme from localStorage
// 👉 Define a function called loadTheme()
// Inside the function:
// - Use getItem("theme") from localStorage
// - If it’s "dark", add the "dark" class to body and update toggle button text
// 🧪 Console log to confirm dark theme was loaded
// 🧪 Console log to confirm light/default theme

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    toggleModeBtn.textContent = "Light Mode";
    console.log("Loaded dark theme");
  } else {
    console.log("Using light/default theme"); //debug
  }
}

// 🎯 Step 11: Add event listeners to buttons and form
// 👉 Add the following event listeners:
// - songForm "submit" → addSong
// - filterMoodSelect "change" → filterPlaylist
// - shuffleBtn "click" → shufflePlaylist
// - toggleModeBtn "click" → toggleDarkMode
// 🧪 Console log to confirm all event listeners were attached

songForm.addEventListener("submit", addSong); // - songForm "submit" → addSong
filterMoodSelect.addEventListener("change", filterPlaylist); // - filterMoodSelect "change" → filterPlaylist
shuffleBtn.addEventListener("click", shufflePlaylist); // - shuffleBtn "click" → shufflePlaylist
toggleModeBtn.addEventListener("click", toggleDarkMode); // - toggleModeBtn "click" → toggleDarkMode
console.log("Event listeners attached"); //debug

// 🚀 Step 12: Initialize the app
// 👉 Call the following functions:
// - loadPlaylist()
// - renderPlaylist(playlist)
// - loadTheme()
// 🧪 Console log to confirm the app has been initialized

loadPlaylist();
renderPlaylist(playlist);
loadTheme();
console.log("App initialized"); //debug
