// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the container for date ideas
    const dateIdeasContainer = document.getElementById('dateIdeasContainer');

    // Check local storage for opened notes or use an empty array
    const openedNotes = JSON.parse(localStorage.getItem('openedNotes')) || [];

    // Define an array of background colors for notes
    const noteBackgroundColors = ['#576d6f', '#8d9577', '#ba541c', '#beb6ab'];

    // Render date ideas
    dateIdeasContainer.querySelectorAll('.note').forEach((note, index) => {
        // Check if the note is opened and update its style
        if (openedNotes.includes(note.id)) {
            note.classList.add('opened');
            // Set the background color for opened notes
            note.style.backgroundColor = getRandomColor();
        }

        // Event listener for clicking on a note
        note.addEventListener('click', () => {
            // If the note is not opened, navigate to the idea's description page
            if (!note.classList.contains('opened')) {
                window.location.href = note.dataset.description;
            }

            // Toggle the 'opened' class
            note.classList.toggle('opened');

            // Update local storage with opened notes
            if (note.classList.contains('opened')) {
                openedNotes.push(note.id);
                // Set a different random background color
                note.style.backgroundColor = getDifferentRandomColor(note.style.backgroundColor);
            } else {
                openedNotes.splice(openedNotes.indexOf(note.id), 1);
            }
            localStorage.setItem('openedNotes', JSON.stringify(openedNotes));
        });
    });

    // Function to get a random color different from the given color
    function getDifferentRandomColor(previousColor) {
        let newColor;
        do {
            newColor = getRandomColor();
        } while (newColor === previousColor);
        return newColor;
    }

    // Function to get a random color from the array
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * noteBackgroundColors.length);
        return noteBackgroundColors[randomIndex];
    }
});
